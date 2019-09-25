import React, { Component, useState } from 'react'
import styled from 'styled-components'
import { connect, useDispatch } from 'react-redux'
import { removeAttachment, updatePosition } from 'store/attachments'
import Draggable from 'react-draggable'
import cx from 'classnames'
import AttachmentInteract from 'components/interact_item.svg'
import AttachmentDelete from 'components/delete.svg'
import './Attachment.scss'

const ContextActionsOuter = styled.div`
  position: absolute;
  top: 5px;
  left: calc(100% + 5px);
  opacity: ${({ show }) => show ? '1' : '0'};
  transition: opacity .3s ease;
  z-index: 300;
  background-color: rgba(0,0,0, .25);
  padding: 5px;
`

const ContextAction = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url(${({ icon }) => icon});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`

const ContextActions = ({ show, id }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const deleteItem = () => {
    removeAttachment(id)(dispatch)
  }

  return (
      <ContextActionsOuter className="context" show={show}>
        <ContextAction
            icon={AttachmentInteract}
            onClick={() => setOpen(!open)}
        />
        {
          open
              ? (
                  <>
                    <ContextAction icon={AttachmentDelete} onClick={deleteItem}/>
                  </>
              )
              : null
        }
      </ContextActionsOuter>
  )
}

class Attachment extends Component {

  state = { focused: false, show: false }

  timeout = null

  onMouseEnter = () => {
    this.timeout = setTimeout(() => this.setState({ focused: true, show: true }), 50)
  }

  onMouseLeave = () => {
    clearTimeout(this.timeout)
    if (this.state.focused) this.setState({ focused: false })
  }

  // eslint-disable-next-line
  handleStop = (e, { x, y }) => {
    this.props.updatePosition(this.props.uid, { x, y })
  }

  render() {
    const { layer, data: { coords: { x, y }, styles, type, content }, uid } = this.props
    const { focused, show } = this.state
    return (
        <div
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            className={cx('attachment', { _focused: focused })}
            style={{ zIndex: layer, ...styles }}
        >
          <Draggable
              handle=".interactor"
              onStop={this.handleStop}
              position={{ x, y }}
          >
            <div className="inner">
              <ContextActions show={show} id={uid}/>
              <div className="interactor"/>
              <div className="content">
                {type === 'image' && <img src={content} alt="Illustration"/>}
                {type === 'text' && <p>{content}</p>}
              </div>
            </div>
          </Draggable>
        </div>
    )
  }
}


export default connect(null, { updatePosition })(Attachment)
