import React from 'react'
import FormikDatePicker from './FormikDatePcker';
import FormikInput from './FormikInput'

const FormikControl = (props) => {
  const { control, ...rest } = props
  // console.log(`rest`, rest)
  switch (control) {
    case 'input': return <FormikInput {...rest} />;
    // case 'textarea': return '';
    // case 'select': return '';
    // case 'radio': return '';
    // case 'checkbox': return '';
    case 'datetime': return <FormikDatePicker {...rest} />;
    default: return null;
  }
}     
  

export default FormikControl