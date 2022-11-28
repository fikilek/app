import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import useOpenModal from '../../../../components/modals/useOpenModal'


const GrvTestAddAstBtn = () => {
  const { modalToOpen } = useOpenModal();
  const handleOpenGrvTestForm = e => {
    e.preventDefault()
    console.log(`GrvTestAddAstBtn clicked`, e.target.id)
    modalToOpen(e.target.id);
  }
  return (
    <div  className='grvTestAddAstBtn'>
      <button id='grvTestForm' className='grvAddBtn' onClick={handleOpenGrvTestForm}>+</button>
    </div>
  )
}

export default GrvTestAddAstBtn