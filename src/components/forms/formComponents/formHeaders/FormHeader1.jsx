import React from 'react'
import './FormHeader.css'
import { MdClose } from "react-icons/md";

const FormHeader1 = (props) => {
  const {formName, closeModal} = props
  return (
    <div className='form-header'>
      <p>{formName}</p>
      <button onClick={() => closeModal()} >
        <MdClose />
      </button>
    </div>
  )
}

export default FormHeader1