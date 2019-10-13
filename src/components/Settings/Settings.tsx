import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import storage from 'utils/storage'
import { setBG } from 'store/settings'
import { ChromePicker } from 'react-color'
import { useDispatch, useSelector } from 'react-redux'
import { useClickOutside } from 'hooks/click-outside'

import './Settings.scss'
import { AppState } from 'store/index'
import { Icon } from 'components/shared/Icon'

const Outer = styled.div`
  bottom: 0px;
  right: 0;
  z-index: 99999;
`

const Bar = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 30px;
  height: 0;
  box-sizing: border-box;
  width: 0;
  overflow: hidden;
  padding-left: 30px;
  ${({ show }) => show
  ? css`
      height: auto;
      width: auto;
    `
  : ''
}
`

const Settings = () => {

  const dispatch = useDispatch()
  const outer = useRef(null)
  const [show, setShow] = useState(false)
  const mainBG = useSelector(({ settings: { mainBG } }: AppState) => mainBG)

  useClickOutside(outer, () => setShow(false))

  useEffect(() => {
    storage.getValue('bg').then(bg => {
      dispatch(setBG(bg))
    })
  }, [])

  const setColor = ({ hex: newColor }: { hex: string }) => {
    dispatch(setBG(newColor))
    storage.setValue('bg', newColor)
  }

  return (
    <Outer className="fixed flex flex-col items-center justify-between h-screen" ref={outer}>
      <Icon type="add"/>
      <Icon type="interact" onClick={() => setShow(!show)}/>
      <Bar show={show}>
        <div className="p-2 bg-black">
          <div className="colorPicker">
            <ChromePicker
              color={mainBG}
              type="color"
              onChangeComplete={setColor}
            />
          </div>
        </div>
      </Bar>
    </Outer>
  )
}

export default Settings
