import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updatePosition} from 'store/attachments'
import Draggable from 'react-draggable'
import cx from 'classnames'
import './Attachment.scss'

class Attachment extends Component {
  state = { focused: false }
  timeout = null

  onMouseEnter = () => {
    this.timeout = setTimeout(() => this.setState({ focused: true }), 50)
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
    const { layer, data: { coords: { x, y }, styles, type, content } } = this.props
    const { focused } = this.state
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
            <div className="interactor" />
            <div className="content">
              {type === 'image' && <img src={content} alt="Illustration" />}
              {type === 'text' && <p>{content}</p>}
            </div>
          </div>
        </Draggable>
      </div>
    )
  }
}


export default connect(null, { updatePosition })(Attachment)
