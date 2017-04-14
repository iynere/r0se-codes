import React from 'react'
import StreetView from './StreetView'

export default props => (
  <StreetView
    apiKey={process.env.REACT_APP_GMAPS_API_KEY}
    streetViewPanoramaOptions={props.streetViewPanoramaOptions}
    onPositionChanged={props.onPositionChanged}
    onPovChanged={props.onPovChanged}
    handleMeClick={props.handleMeClick}
    handleSomethingClick={props.handleSomethingClick}
  />
)
