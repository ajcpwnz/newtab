import cuid from 'cuid'

const types = {
  ADD_ITEM: 'newtab/attachments/ADD_ITEM',
  UPDATE_POSITION: 'newtab/attachments/UPDATE_POSITION',
  REMOVE_ALL: 'newtab/attachments/REMOVE_ALL'
}

export const addItem = data => ({ type: types.ADD_ITEM, payload: { data } })
export const removeAll = () => ({ type: types.REMOVE_ALL })
export const updatePosition = (key, coords) => ({
  type: types.UPDATE_POSITION,
  payload: { key, coords }
})

const initialState = {
  attachments: {
    0b0: {
      type: 'image',
      coords: {
        x: 500,
        y: 133,
      },
      styles: {
        width: '700px'
      },
      content: '/i3.jpeg'
    }
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case '__SHARED_RESTORE_STORE__attachments':
      return {
        ...state,
        ...payload.data
      }
    case types.ADD_ITEM:
      return {
        ...state,
        attachments: {
          ...state.attachments,
          [cuid()]: payload.data
        }
      }
    case types.UPDATE_POSITION:
      return {
        ...state,
        attachments: {
          ...state.attachments,
          [payload.key]: {
            ...state.attachments[payload.key],
            coords: payload.coords
          }
        }
      }
    case types.REMOVE_ALL:
      return {
        ...state,
        attachments: {}
      }
    default:
      return state
  }
}
