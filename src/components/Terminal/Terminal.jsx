import React, { Component } from 'react'
import { connect } from 'react-redux'
import importedContent from 'utils/importedContent'
import { setBG } from 'store/settings'
import { addItem, removeAll } from 'store/attachments'
import styled from 'styled-components'
import kc from 'utils/keyCodes'

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  z-index: 100000;
`
const TERMINAL_HEIGHT = 500

const Inner = styled.div`
  position: absolute;
  top: -6px;
  left: 20px;
  width: calc(100% - 40px);
  max-width: 960px;
  background-color: #000000;
  color: #fff;
  border: 3px solid #dfdfdf;
  height: ${({ show }) => (show ? TERMINAL_HEIGHT : 0)}px;
  transition: height 0.3s ease;
  overflow: hidden;
`

const Form = styled.form``
const Field = styled.input`
  display: block;
  width: 100%;
  border: none;
  color: #333;
  background-color: #dfdfdf;
  font-size: 16px;
  line-height: 24px;
  padding: 5px 10px;
  &:focus {
    outline: none;
    background-color: #eee;
  }
`

const LogsOuter = styled.div`
  height: ${TERMINAL_HEIGHT - 34}px;
  padding: 10px;
  overflow-y: auto;
`

const Timestamp = styled.span`
  color: #dfdfdf;
  font-size: 14px;
  font-weight: 300;
`

const CommandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Command = styled.span``

const colors = {
  error: 'maroon',
  data: '#dfdfdf'
}

const Output = styled.div`
  padding: 0 10px;
  margin: 5px 0 15px;
  position: relative;
  word-break: break-word;
  &:before {
    content: '';
    position: absolute;
    height: 100%;
    border: 2px solid ${({ kind }) => colors[kind]};
    border-right: none;
    top: 0;
    left: 0;
    width: 3px;
    opacity: 0.8;
  }
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    border: 2px solid ${({ kind }) => colors[kind]};
    border-left: none;
    top: 0;
    right: 0;
    width: 3px;
    opacity: 0.8;
  }
`
const Caret = styled.span`
  color: ${({ kind }) => ({ data: '#00ff82', error: 'maroon' }[kind])};
  font-weight: 700;
`

const Log = ({ data }) => (
  <>
    <CommandRow>
      <Command>
        <Caret kind={data.kind}>❯ </Caret>
        {data.command}
      </Command>{' '}
      <Timestamp>{data.timestamp}</Timestamp>
    </CommandRow>
    <Output kind={data.kind}>{data.output}</Output>
  </>
)

const Logs = ({ data }) => (
  <LogsOuter>
    {data.map((i, idx) => (
      <Log data={i} key={idx} />
    ))}
  </LogsOuter>
)

const DELTA = 3000

// HANDLER SHOULD RETURN LOG OBJECT;
// TODO: CONSIDER TS FOR THIS KIND OF STUFF
// ALL HANDLERS ARE BOUND TO <Terminal> context
const _handlers = {
  seed: {
    description: 'Seed test attachments',
    command() {
      Object.values(importedContent).forEach(item => this.props.addItem(item))
    }
  },
  removeAll: {
    description: 'Remove all attachments',
    command() {
      this.props.removeAll()
    }
  }
}
const handlers = {
  run() {
    return (
      <>
        {Object.keys(_handlers).map(func => (
          <div key={func}>
            <span onClick={_handlers[func].command.bind(this)}>
              <u>{func}</u> → {_handlers[func].description}
            </span>
          </div>
        ))}
      </>
    )
  },
  addItem(text, type){
    this.props.addItem({
      type: type || 'text',
      coords: {
        x: 50,
        y: 160
      },
      content: text || '«newItem»'
    })
    return `Item <${ text|| '«newItem»'}> created`
  },
  setBG(color){
    this.props.setBG(color || '#fff')
    return `BG is now ${color}`
  },
  wow() {
    return '🎉🎉🎉🎉🎉🎉'
  },
  shrug() {
    return '¯\\_(ツ)_/¯'
  },
  window() {
    return 'You can`t'
  },
  UwU() {
    return 'OwO'
  },
  OwO() {
    return 'UwU'
  },

  ...Object.keys(_handlers).reduce(
    (obj, key) => ({ ...obj, [key]: _handlers[key].command }),
    {}
  )
}

class Terminal extends Component {
  state = { open: false, command: '', logs: [], key: { last: 0 } }

  componentDidMount() {
    document.addEventListener('keydown', this.catchTrigger)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.catchTrigger)
  }

  catchTrigger = e => {
    if (e.keyCode === kc.TILDE) {
      const {
        key: { last }
      } = this.state
      const pressTime = new Date()
      if (last > 0 && pressTime - last < DELTA) {
        this.setState({ key: { last: 0 } }, this.toggle)
      } else {
        this.setState({ key: { last: pressTime } })
      }
    }
  }

  __eval = e => {
    e.preventDefault()
    let { command } = this.state
    const timestamp = Number(new Date())
    let attr = ''
    if (command === 'clear') {
      this.setState({ logs: [], command: '' })
      return null
    }
  
    if(
      command.includes('(') 
      && command.includes(')') 
      && (command.indexOf('(') < command.indexOf(')'))
    ) {
      attr = command.split('(')[1].split(')')[0].split(',')
      command = command.split('(')[0]
    }

    const handler = handlers[command]
    let log
    try {
      if (handler) {
        const output = handler.apply(this, attr)
        log = { timestamp, command, output, kind: 'data' }
      } else {
        let output = eval(this.state.command)
        log = { timestamp, command, output, kind: 'data' }
      }
    } catch (e) {
      log = {
        timestamp,
        command,
        output: e.message,
        kind: 'error'
      }
    }

    if (typeof log.output === 'object' && log.output !== null) {
      log.output = JSON.stringify(log.output)
    }

    this.setState({
      logs: [log, ...this.state.logs],
      command: log.kind !== 'error' ? '' : this.state.command
    })
  }

  toggle = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <Outer>
        <Inner show={this.state.open}>
          <Form onSubmit={this.__eval}>
            <Field
              onChange={e => this.setState({ command: e.target.value })}
              value={this.state.command}
            />
            <Logs data={this.state.logs} />
          </Form>
        </Inner>
      </Outer>
    )
  }
}

export default connect(
  null,
  { setBG, addItem, removeAll }
)(Terminal)
