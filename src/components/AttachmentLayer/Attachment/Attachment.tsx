import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePosition } from 'store/attachments'
import Draggable from 'react-draggable'
import { ContextActions } from 'components/AttachmentLayer/Attachment/ContextAction'
import cx from 'classnames'
import styled from 'styled-components'

const AttachmentOuter = styled.div`
  color: #000;
  padding-top: 5px;
  pointer-events: none;
  
  .interactor {
    pointer-events: all;
    position: absolute;
    bottom: calc(100% - 5px);
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #000;
    cursor: grab;
  }

  &:hover .interactor {
    height: 30px;
    transition: height 0.3s ease;
  }
&:after {
    content: "";
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    opacity: 0;
    pointer-events: none;
    top: 0;
    left: 0;
    transition: opacity 0.3s ease;
  }
  &._focused {
    z-index: 9997 !important;
    .inner {
      z-index: 9999;
      position: relative;
      pointer-events: all;
    }
    &:after {
      opacity: 0.5;
      z-index: 9998;
    }
  }
`

interface AttachmentProps {
  uid: string
  layer: number
  data: {
    coords: {
      x: number
      y: number
    }
    styles: any
    type: string
    content: string
  }
}

const Attachment = ({ layer, data: { coords: { x, y }, styles, type, content }, uid }: AttachmentProps) => {
  let timeout = 0

  const dispatch = useDispatch()

  const [focused, setFocused] = useState(false)
  const [show, setShow] = useState(false)

  const onMouseEnter = () => {
    timeout = setTimeout(() => {
      setFocused(true)
      setShow(true)
    }, 50)
  }

  const onMouseLeave = () => {
    clearTimeout(timeout)
    if (focused) setTimeout(() => {
      setFocused(false)
      setShow(false)
    }, 100)
  }

  const handleStop = (e: any, { x, y }: { x: number, y: number }) => {
    dispatch(updatePosition(uid, { x, y }))
  }

  return (
    <AttachmentOuter
      className={cx('attachment absolute', { _focused: focused })}
      style={{ zIndex: layer, ...styles }}
    >
      <Draggable
        handle=".interactor"
        onStop={handleStop}
        position={{ x, y }}
      >
        <div className="inner"
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
        >
          <ContextActions show={show} id={uid}/>
          <div className="interactor"/>
          <div className="pointer-events-auto">
            {type === 'image' && <img src={content} alt="Illustration" className="max-w-full"/>}
            {type === 'text' && <p className="p-2 bg-white">{content}</p>}
          </div>
        </div>
      </Draggable>
    </AttachmentOuter>
  )
}


export default Attachment
