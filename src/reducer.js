// import localStore from 'store'

// CONSTANTS
const RECEIVE_POS = 'RECEIVE_POS',
  RECEIVE_POV = 'RECEIVE_POV'

const initialState = {
  lat: 42.33190186338266,
  lng: -77.32427707095837,
  heading: 107.36538560099282,
  pitch: -13.943844201508199,
  zoom: 0.38773015328310856
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POS:
      return Object.assign({}, state, {
        lat: action.pos.lat,
        lng: action.pos.lng
      })
    case RECEIVE_POV:
      return Object.assign({}, state, {
        heading: action.pov.heading,
        pitch: action.pov.pitch,
        zoom: action.pov.zoom
      })
    default:
      return state
  }
}

// ACTION TYPES
export const receivePos = pos => ({
  type: RECEIVE_POS,
  pos
})

export const receivePov = pov => ({
  type: RECEIVE_POV,
  pov
})

export default reducer