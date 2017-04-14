import React from 'react'
import Modal from 'react-modal'

export const Resume = props => (
  <div>
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      closeTimeoutMS={0}
      contentLabel='Modal'
      style={props.style}
    >
      <object data='./Rose Kaplan-Bomberg resume.pdf#zoom=140%' type='application/pdf' width='100%' height='100%'>
        <param name='zoom' value='140%' />
        <iframe src='./Rose Kaplan-Bomberg resume.pdf#zoom=140%' width='100%' height='100%' style={{border: 'none'}}>
          <param name='zoom' value='140%' />
          This browser does not support PDFs. Please download the PDF to view it: <a href={`${process.env.PUBLIC_URL}/Rose Kaplan-Bomberg resume.pdf`}>Download PDF</a>
        </iframe>
      </object>
    </Modal>
  </div>
)
