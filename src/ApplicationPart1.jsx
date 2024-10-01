import { useEffect } from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';
import { CheckboxInput, RadioInput, TextInput, TextAreaInput, NumberInput } from './Inputs.jsx';
import { yesNoOptions, pronounsOptions, educationOptions, employmentOptions, admissionOptions, intendOptions, startdateOptions } from '../config.js';
import { useFormikContext } from 'formik';

const formatData = (values) => {
  const { pronouns, pronounsOther, ...rest } = values;
  return {
    pronouns: pronouns.concat(pronounsOther).filter(p => p !== 'Other').join(', '),
    ...rest
  };
}

export default function ApplicationPart1({ setFormatData }) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    document.title = 'Fidgetech Application';
    setFormatData(() => formatData);
  }, []);

  useEffect(() => {
    if (!values.pronouns.includes('Other')) {
      setFieldValue('pronounsOther', '');
    }
  }, [values.pronouns, setFieldValue]);

  useEffect(() => {
    const postHeight = () => {
      window.parent.postMessage({ height: document.documentElement.scrollHeight }, '*');
    };
    postHeight();
    window.addEventListener('resize', postHeight);
    return () => window.removeEventListener('resize', postHeight);
  }, []);

  return (
    <>
      <Typography variant='h4' align='center' gutterBottom>
      Fidgetech Application
      </Typography>

      <Typography variant='body1' align='center' gutterBottom>
        Student Information
      </Typography>

      <Box marginY={4}>
        <TextInput name='firstname' label='First Name (legal)' required={true} sx={{ mb: 2 }} />
        <TextInput name='lastname' label='Last Name (legal)' required={true} sx={{ mb: 2 }} />
        <TextInput name='preferred' label='Preferred First Name' sx={{ mb: 2 }} />
        <TextInput name='email' label='Student Email' required={true}sx={{ mb: 2 }} />
        <NumberInput name='phone' label='Phone' required={true} format='###-###-####' placeholder='###-###-####' sx={{ mb: 2 }} />
        <TextInput name='address' label='Street Address' required={true} sx={{ mb: 2 }} />
        <TextInput name='city' label='City' required={true} sx={{ mb: 2 }} />
        <TextInput name='state' label='State' required={true} sx={{ mb: 2 }} />
        <TextInput name='zip' label='ZIP Code' required={true} sx={{ mb: 2 }} />
      </Box>

      <Box marginY={4}>
        <NumberInput name='birthday' label='Date of birth (MM/DD/YYYY)' required={true} format='##/##/####' placeholder='MM/DD/YYYY' />
      </Box>

      <Box marginY={4}>
        <CheckboxInput name='pronouns' label='Pronouns (select all that apply)' options={pronounsOptions} fastField={false} />
        {values.pronouns?.includes('Other') && <TextInput name='pronounsOther' label='Pronouns (other)' fastField={false} sx={{ mt: 2 }} />}
      </Box>

      <Box marginY={4}>
        <RadioInput name='stateid' label='Do you have a valid state-issued ID?' options={yesNoOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <RadioInput name='diagnosisAutism' label='Do you have an Autism diagnosis?' options={yesNoOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <Typography>Please list any other diagnoses you are willing to disclose, if any.</Typography>
        <TextInput name='diagnosisOther' />
      </Box>

      <Box marginY={4}>
        <RadioInput name='education' label="What is the highest level of education you've completed? " options={educationOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <Typography>List postsecondary institution(s) you attended, if any.</Typography>
        <TextInput name='educationDetails' />
      </Box>

      <Box marginY={4}>
        <RadioInput name='employment' label='Are you currently employed?' options={employmentOptions} required={true} />
      </Box>

      <Box marginy={4}>
        <Typography>Parent / Guardian Contact Info<br />(Include Full Name, Email, Phone)</Typography>
        <TextInput name='parent' />
      </Box>

      <Divider sx={{ my: 6}} />

      <Typography variant='body1' align='center' gutterBottom>
        Admission
      </Typography>

      <Box marginY={4}>
        <RadioInput name='admission' label='I am pursuing admission primarily for the following reason:' options={admissionOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <RadioInput name='intend' label='I intend to enroll in the following program:' options={intendOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <RadioInput name='startdate' label='Select your expected enrollment date:' options={startdateOptions} required={true} />
      </Box>
    </>
  )
}
