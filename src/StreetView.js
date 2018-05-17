import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import asyncLoading from 'react-async-loader'

class StreetView extends Component {

  constructor() {
    super()
    this.streetView = null
  }

  initialize(canvas) {
    if (this.props.googleMaps && this.streetView == null) {
      this.streetView = new this.props.googleMaps.StreetViewPanorama(
        canvas,
        this.props.streetViewPanoramaOptions
      )

        this.me = new this.props.googleMaps.Marker({
         position: {lat: 36.13410410224819, lng: -115.8731357052788},
         icon: `${process.env.PUBLIC_URL}/r0se.png`,
         optimized: false
        })

        this.something = new this.props.googleMaps.Marker({
         position: {lat: 36.13482767311607, lng: -115.87315036548631},
         icon: `${process.env.PUBLIC_URL}/window.png`,
         optimized: false,
         opacity: 0.6
        })

        this.me.setMap(this.streetView)
        this.something.setMap(this.streetView)

      this.me.addListener('click', event => {
        alert(`hi you found me`)
        // this.props.handleMeClick(event)
      })

      this.something.addListener('click', event => {
        alert(`this doesn't do anything yet\n\ntry moving out & up to your left tho\n\nor look behind you`)
        // this.props.handleSomethingClick(event)
      })

      this.streetView.addListener('position_changed', () => {
        if (this.props.onPositionChanged) {
          this.props.onPositionChanged(this.streetView.getPosition())
        }
      })

      this.streetView.addListener('pov_changed', () => {
        if (this.props.onPovChanged) {
          this.props.onPovChanged(this.streetView.getPov())
        }
      })
    }
  }

  componentDidMount () {
    this.initialize(ReactDOM.findDOMNode(this))
  }

  componentDidUpdate () {
    this.initialize(ReactDOM.findDOMNode(this))
  }

  componentWillUnmount () {
    if (this.streetView) {
      this.props.googleMaps.event.clearInstanceListeners(this.streetView)
    }
  }

  render () {
    return <div
      style={{height: '100%'}}
    ></div>
  }
}

StreetView.propTypes = {
  apiKey: PropTypes.string.isRequired,
  streetViewPanoramaOptions: PropTypes.object.isRequired,
  onPositionChanged: PropTypes.func,
  onPovChanged: PropTypes.func
}

StreetView.defaultProps = {
  streetViewPanoramaOptions : {
    position: {lat: 46.9171876, lng: 17.8951832},
    pov: {heading: 0, pitch: 0},
    zoom: 1
  }
}

function mapScriptsToProps (props) {
  const googleMapsApiKey = props.apiKey
  return {
    googleMaps: {
      globalPath: 'google.maps',
      url: 'https://maps.googleapis.com/maps/api/js?key=' + googleMapsApiKey,
      jsonp: true
    }
  }
}

export default asyncLoading(mapScriptsToProps)(StreetView)
