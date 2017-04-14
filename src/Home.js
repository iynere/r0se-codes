import React, {Component} from 'react'
import {Resume} from './Resume'
import store from 'store'
import StreetViewWrapper from './StreetViewWrapper'

export default class extends Component {
  
  constructor() {
    super()
    
    this.state = {
      modalOpen: false,
      lat: store.get('lat') || 42.33190186338266,
      lng: store.get('lng') || -77.32427707095837,
      heading: store.get('heading') || 107.36538560099282,
      pitch: store.get('pitch') || -13.943844201508199,
      zoom: store.get('zoom') || 0.38773015328310856
    }
  
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  
  handleOpen(event) {
    this.setState({
      modalOpen: true
    })
  }

  handleClose(event) {
    this.setState({
      modalOpen: false
    })
  }
  
  render() {
    
    let height = window.innerHeight / 100
    
    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    let streetViewPanoramaOptions = {
      disableDefaultUI: true,
      position: {
        lat: this.state.lat,
        lng: this.state.lng
      },
      pov: {
        heading: this.state.heading,
        pitch: this.state.pitch
      },
      zoom: this.state.zoom,
      addressControl: false,
      fullscreenControl: false,
      scrollwheel: false,
      showRoadLabels: false,
      zoomControl: false
    }

    return (
      <div>
      
        {/* HEADER */}
        <h2 style={{float: 'left', color: 'black', fontWeight: 500, fontStyle: 'italic', background: '#E8C1DB', marginLeft: 3*height, marginBottom: 0, marginTop: 4.5*height, clear: 'both'}}>
          r 0 s e . c o d e s
        </h2>
        
        {/* LINKS */}
        <div style={{float: 'right', fontStyle: 'italic', marginBottom: 0, marginRight: 3.5*height, marginTop: 4.5*height}}>
          <h4 style={{float: 'right', background: '#6495ED', fontWeight: 400, marginTop: 0, marginBottom: 0}}>
            <a style={{color: '#f0f0f0'}} href='mailto://rose.kaplan.bomberg@gmail.com'>email</a>
          </h4>
        
          <h4 style={{float: 'right', background: '#6495ED', fontWeight: 400, marginTop: 0, marginBottom: 0, marginRight: 1.5*height}}>
            <span className='resume' style={{color: '#f0f0f0'}} href='/' target='blank' onClick={event => {
              event.preventDefault()
              this.setState({
                modalOpen: true
              })
            }}>resume</span>
          </h4>
          
          <h4 style={{float: 'right', background: '#6495ED', fontWeight: 400, marginTop: 0, marginBottom: 0, marginRight: 1.5*height}}>
            <a style={{color: '#f0f0f0'}} href='https://angel.co/rose-kaplan-bomberg' target='blank'>angelist</a>
          </h4>
          
          <h4 style={{float: 'right', background: '#6495ED', fontWeight: 400, marginTop: 0, marginBottom: 0, marginRight: 1.5*height}}>
            <a style={{color: '#f0f0f0'}} href='https://linkedin.com/in/rose-kaplan-bomberg' target='blank'>linkedin</a>
          </h4>
          
          <h4 style={{float: 'right', background: '#6495ED', fontWeight: 400, marginTop: 0, marginBottom: 0, marginRight: 1.5*height}}>
            <a style={{color: '#f0f0f0'}} href='https://github.com/isar0se' target='blank'>github</a>
          </h4>
        </div>
        
        {/* ABOUT */}
        <h3 style={{position: 'absolute', bottom: 4*height, marginLeft: 3*height, marginBottom: 0, marginTop: 0, color: 'black', fontWeight: 400, background: '#7359E1'}}>
          nyc software engineer / fullstack developer
        </h3>
        
        <Resume 
          isOpen={this.state.modalOpen}
          onRequestClose={this.handleClose}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0)'
            },
            content: {
              position: 'absolute',
              top: 3*height,
              left: 3*height,
              right: 3*height,
              bottom: 3*height,
              border: '0',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '0',
              outline: 'none',
              padding: '0'
            }
          }}
        />
        
        {/* STREET VIEW */}
        <div style={{
          width: window.innerWidth,
          height: window.innerHeight + 10*height,
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: -5}}>
          <StreetViewWrapper
            streetViewPanoramaOptions={streetViewPanoramaOptions}
            onPositionChanged={event => {
              console.log('POS', {
                lat: event.lat(),
                lng: event.lng()
              })
            }}
            onPovChanged={event => {
              console.log('POV', {
                heading: event.heading,
                pitch: event.pitch,
                zoom: event.zoom
              })
            }}
            // handleMeClick={event => {}}
            // handleSomethingClick={event => {}}
          />
        </div>
      </div>
    )
  }
}
