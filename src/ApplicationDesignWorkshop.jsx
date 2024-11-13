import { useEffect } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { CheckboxInput, RadioInput, TextInput, NumberInput, SliderInput } from './Inputs.jsx';
import { yesNoOptions, pronounsOptions, educationOptions, scaleOptions } from '../config.js';
import { useFormikContext } from 'formik';

const formatData = (values) => {
  const { pronouns, pronounsOther, ...rest } = values;
  return {
    pronouns: pronouns.concat(pronounsOther).filter(p => p !== 'Other').join(', '),
    ...rest
  };
}

export default function ApplicationDesignWorkshop({ setFormatData }) {
  const { values, errors, setFieldValue, isSubmitting } = useFormikContext();

  useEffect(() => {
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
        Multimedia Workshop
      </Typography>

      <Box marginY={4}>
        <TextInput name='firstname' label='First Name (legal)' required={true} sx={{ mb: 2 }} />
        <TextInput name='lastname' label='Last Name (legal)' required={true} sx={{ mb: 2 }} />
        <TextInput name='preferred' label='Preferred First Name' sx={{ mb: 2 }} />
        <TextInput name='email' label='Email' required={true} sx={{ mb: 2 }} />
        <TextInput name='emailConfirm' label='Re-enter Email' required={true} sx={{ mb: 2 }} />
        <NumberInput name='phone' label='Phone' required={true} format='###-###-####' placeholder='###-###-####' sx={{ mb: 2 }} />
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
        <RadioInput name='education' label="What is the highest level of education you've completed? " options={educationOptions} required={true} />
      </Box>

      <Divider sx={{ my: 6}} />

      <Typography variant='h5' align='center' gutterBottom>
        Experience
      </Typography>

      <Typography variant='body1' align='center' gutterBottom>
        Please rate your experience on a scale of 1-5:<br />
        <em>1 = no knowledge<br />
        5 = very experienced</em>
      </Typography>

      <Box marginY={4}>
        <SliderInput name='photoshop' label="How experienced are you with Adobe Photoshop, or a similar program like Paint.Net, Corel Painter, or Procreate?" options={scaleOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <SliderInput name='illustrator' label="How experienced are you with Adobe Illustrator, or similar vector software like GIMP or Figma?" options={scaleOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <SliderInput name='aftereffects' label="How experienced are you with Adobe After Effects or Adobe Animate?" options={scaleOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <SliderInput name='canva' label="Have you used free online software like Canva before?" options={scaleOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <SliderInput name='artistic' label="How confident are you in your artistic or visual skills when drawing or designing things on paper, with crafts, or through sculpture?" options={scaleOptions} required={true} />
      </Box>
    </>
  )
}
