import React, { useState } from 'react'
import styled from 'styled-components'
import { removeAttachment } from 'store/attachments'
import { useDispatch } from 'react-redux'
import { Icon } from 'components/shared/Icon'

const ContextActionsOuter = styled.div<{ show: boolean }>`
  position: absolute;
  top: 5px;
  left: calc(100% + 5px);
  opacity: ${({ show }) => show ? '1' : '0'};
  transition: opacity .3s ease;
  z-index: 300;
  background-color: rgba(0,0,0, .25);
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 200%;
    height: 200%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`
const _ContextActions = ({ show, id }: { show: boolean, id: string }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const deleteItem = () => {
    removeAttachment(id)(dispatch)
  }

  return (
    <ContextActionsOuter className="context" show={show}>
      <Icon
        type="interact"
        className="relative cursor-pointer z-10"
        onClick={() => setOpen(!open)}
      />
      {
        open
          ? (
            <>
              <Icon className="relative cursor-pointer z-10" type="delete" onClick={deleteItem}/>
            </>
          )
          : null
      }
    </ContextActionsOuter>
  )
}
export const ContextActions = _ContextActions