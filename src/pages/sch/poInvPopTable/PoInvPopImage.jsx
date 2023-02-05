import React from 'react'
import './PoInvPopImage.css'

const PoInvPopImage = (params) => {
  // console.log(`value`, params)
  return (
    // pipi: po inv pop image
    <div className='pipi'>
      <img src={params.value} alt="invoice or Payment info" />
    </div>
  )
}

export default PoInvPopImage