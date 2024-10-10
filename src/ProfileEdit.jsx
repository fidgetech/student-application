import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { CheckboxInput, TextInput, NumberInput } from './Inputs.jsx';
import { pronounsOptions } from '../config.js';
import { useFormikContext } from 'formik';

const formatData = (values) => {
  const { pronouns, pronounsOther, ...rest } = values;
  return {
    pronouns: pronouns.concat(pronounsOther).filter(p => p !== 'Other').join(', '),
    ...rest
  };
}

export default function ProfileEdit({ setFormatData }) {
  const { values, errors, isSubmitting } = useFormikContext();

  useEffect(() => {
    document.title = 'Fidgetech - Profile Edit';
    setFormatData(() => formatData);
  }, []);

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length > 0) {
      const errorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${errorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth' });
        errorElement.focus();
      }
    }
  }, [isSubmitting, errors]);

  return (
    <>
      <Typography variant='h4' align='center' gutterBottom>
        Student Profile Change Form
      </Typography>

      <Typography variant='body1' align='center' gutterBottom>
        Update Student Information Below<br />
        <strong>Current email is required; all other fields optional</strong>
      </Typography>

      <Box marginY={4}>
        <TextInput name='emailCurrent' label='Current Email' required={true} sx={{ mb: 2 }} />
        <TextInput name='email' label='Updated Email' sx={{ mb: 2 }} />
        <TextInput name='emailConfirm' label='Re-enter Updated Email' sx={{ mb: 2 }} />
        <TextInput name='preferred' label='Preferred First Name' sx={{ mb: 2 }} />
        <NumberInput name='phone' label='Phone' format='###-###-####' placeholder='###-###-####' sx={{ mb: 2 }} />
      </Box>

      <Box marginY={4}>
        <CheckboxInput name='pronouns' label='Pronouns (select all that apply)' options={pronounsOptions} fastField={false} />
        {values.pronouns?.includes('Other') && <TextInput name='pronounsOther' label='Pronouns (other)' fastField={false} sx={{ mt: 2 }} />}
      </Box>
    </>
  )
}
