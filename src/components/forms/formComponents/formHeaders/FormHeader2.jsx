import React from 'react'
import './FormHeader.css'
import { MdClose } from "react-icons/md";

const FormHeader2 = (props) => {
  const {formName, closeModal, astState, astCartegory} = props
  return (
    <div className='form-header'>
      <p>{formName}</p>
      <p>{astState}</p>
      <p>{astCartegory}</p>
      <button onClick={() => closeModal()} >
        <MdClose />
      </button>
    </div>
  )
}

export default FormHeader2