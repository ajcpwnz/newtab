const types = {
  SET_BG: 'newtab/settings/SET_BG'
}

export const setBG = (color) => ({ type: types.SET_BG, payload: { color } })


const initialState = {
  mainBG: '#ffffff'
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_BG:
      return { ...state, mainBG: payload.color }

    default:
      return state
  }
}
