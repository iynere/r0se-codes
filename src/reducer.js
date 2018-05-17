// import localStore from 'store'

// CONSTANTS
const RECEIVE_POS = 'RECEIVE_POS',
  RECEIVE_POV = 'RECEIVE_POV'

const initialState = {
  lat: 36.13453080061456,
  lng: -115.87314364690837,
  heading: 2.1718819403514487,
  pitch: 3.316408921989364,
  zoom: 0.4611096022661806
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