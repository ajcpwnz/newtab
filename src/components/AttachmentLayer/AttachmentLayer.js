import React, { Component } from 'react'
import { connect } from 'react-redux'
import Attachment from 'components/AttachmentLayer/Attachment/Attachment'
import './AttachmentLayer.scss'


const zOffset = 50

class AttachmentLayer extends Component {
  render() {
    const { attachments } = this.props
    return (
      <div className="attachment-layer">
        {Object.keys(attachments).map((key, idx) =>
          <Attachment uid={key} layer={idx + zOffset} key={key} data={attachments[key]} />
        )}
      </div>
    )
  }
}

const _store = ({ attachments: { attachments } }) => ({ attachments })
export default connect(_store)(AttachmentLayer)
