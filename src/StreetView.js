import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import asyncLoading from 'react-async-loader'
// import store from 'store'
// import './StreetView.css'

class StreetView extends Component {

  constructor() {
    super()
    this.streetView = null
    // this.randomLocation = this.randomLocation.bind(this)
  }
  
  // randomLocation(lat, lng) {
  //  if (this.props.googleMaps) {
  //    // https://gist.github.com/geraldstanje/d2709726f7d0c3b749d8a7541d66093e
  //    const getRandomCoordinates = (radius, uniform) => {
  //      // Generate two random numbers
  //      let a = Math.random(),
  //          b = Math.random();

  //      // Flip for more uniformity.
  //      if (uniform) {
  //          if (b < a) {
  //              let c = b;
  //              b = a;
  //              a = c;
  //          }
  //      }

  //      // It's all triangles.
  //      let result = [
  //          b * radius * Math.cos(2 * Math.PI * a / b),
  //          b * radius * Math.sin(2 * Math.PI * a / b)
  //      ];
  //      return result
  //    }

  //    const getRandomLocation = (latitude, longitude, radiusInMeters) => {
  //      let randomCoordinates = getRandomCoordinates(radiusInMeters, true);

  //      // Earths radius in meters via WGS 84 model.
  //      let earth = 6378137;

  //      // Offsets in meters.
  //      let northOffset = randomCoordinates[0],
  //          eastOffset = randomCoordinates[1];

  //      // Offset coordinates in radians.
  //      let offsetLatitude = northOffset / earth,
  //          offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)));

  //      // Offset position in decimal degrees.
  //      let coords = {
  //        lat: latitude + (offsetLatitude * (180 / Math.PI)),
  //        lng: longitude + (offsetLongitude * (180 / Math.PI))
  //      }
  //      return coords
  //    }
      
  //    let randomCoords = getRandomLocation(lat, lng, 10000000),
  //      streetViewService = new this.props.googleMaps.StreetViewService(),
  //      STREETVIEW_MAX_DISTANCE = 100,
  //      streetViewCheck
      
  //    while (streetViewCheck !== 'OK') {
  //      streetViewService.getPanoramaByLocation(randomCoords, STREETVIEW_MAX_DISTANCE, (streetViewPanoramaData, status) => {
  //        console.log('RANDO', randomCoords)
  //          randomCoords = getRandomLocation(lat, lng, 10000000)
  //          streetViewCheck = status
  //        }
  //      )
  //    }
      
  //    return randomCoords
  //  }
  // }
  
  initialize(canvas) {
    if (this.props.googleMaps && this.streetView == null) {
      this.streetView = new this.props.googleMaps.StreetViewPanorama(
        canvas,
        this.props.streetViewPanoramaOptions
      )
        
        
        // this.markers = new this.props.googleMaps.OverlayView()
        // this.markers.draw = function() {this.getPanes().markerLayer.class='markerLayer'}
      
        this.me = new this.props.googleMaps.Marker({
         // map: this.streetView,
         position: {lat: 42.33210188081151, lng: -77.3247444475864},
         icon: `${process.env.PUBLIC_URL}/r0se.png`,
         optimized: false,
         url: '/'
        })
        
        this.something = new this.props.googleMaps.Marker({
         // map: this.streetView,
         position: {lat: 42.33169955193434, lng: -77.32380538313623},
         icon: `${process.env.PUBLIC_URL}/window.png`,
         optimized: false,
         opacity: 0.6,
         url: '/'
        })
        
        // this.description = new this.props.googleMaps.Marker({
        //  position: {lat: 42.33195201120535, lng: -77.32439421860704},
        //  icon: `${process.env.PUBLIC_URL}/description.png`
        // })
        
        
        this.me.setMap(this.streetView)
        this.something.setMap(this.streetView)
        // this.description.setMap(this.streetView)

      this.me.addListener('click', event => {
        alert(`hi u found me`)
        // this.props.handleMeClick(event)
        // window.location.href = this.me.url
      })
      
      this.something.addListener('click', event => {
        alert(`this doesn't do anything yet\n\ntry moving out & up to your left tho\n\nor look behind you`)
        // this.randomLocation(store.get('lat'), store.get('lng'))
        // window.location.href = this.something.url
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
      className='streetView'
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