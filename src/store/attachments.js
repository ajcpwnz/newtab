import cuid from 'cuid'

const types = {
  ADD_ITEM: 'newtab/attachments/ADD_ITEM',
  UPDATE_POSITION: 'newtab/attachments/UPDATE_POSITION',
}

export const addItem = (data) => ({ type: types.ADD_ITEM, payload: { data } })
export const updatePosition = (key, coords) => ({ type: types.UPDATE_POSITION, payload: { key, coords } })


const initialState = {
  attachments: {
    0b0: {
      type: 'image',
      coords: {
        x: 500,
        y: 70
      },
      styles: {
        width: '30%',
      },
      content: 'https://images.unsplash.com/photo-1549526872-0ceec67855e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
    },
    0b1: {
      type: 'text',
      coords: { // TODO: PIXELS VS PERCENTS
        x: 650,
        y: 820
      },
      content: 'Good day to fight'
    },
    0b11: {
      type: 'text',
      coords: {
        x: 50,
        y: 85
      },
      content: 'Add focus coloring effect/daylight × weather effect'
    },
    0b100: {
      type: 'text',
      coords: {
        x: 50,
        y: 160
      },
      content: 'd3feat app — achievements/collections'
    },
    0b101: {
      type: 'text',
      coords: {
        x: 50,
        y: 160
      },
      content: 'fix handles, allow create action'
    },
    // '110': {
    //   type: 'image',
    //   coords: {
    //     x: 1050,
    //     y: 30
    //   },
    //   styles: {
    //     width: '30%',
    //   },
    //   content: 'https://lifehacker.ru/special/cyberbullying/dist/static/img/article2-3-3.87e6060.jpg'
    // },
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
    default:
      return state
  }
}
