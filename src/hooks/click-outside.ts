import { RefObject, useEffect, useState } from 'react'

export const useClickOutside = (
  node: RefObject<any>,
  onChange?: () => void
) => {
  const [active, setActive] = useState(false)

  const handleClickOutside = (e: any) => {
    setActive(!node.current.contains(e.target))
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (active && onChange) onChange()
  }, [active])
}
