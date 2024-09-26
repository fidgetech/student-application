// TO DO:
// - add birthday input
// - add to formatData func any additional properties that need renaming / reformatting

import { useEffect } from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';
import { CheckboxInput, RadioInput, TextInput, TextAreaInput, DateInput, PhoneInput } from './Inputs.jsx';
import { genderOptions, raceOptions, yesNoOptions, pronounsOptions, employmentOptions, admissionOptions, intendOptions, educationOptions } from '../config.js';
import { encryptData, formatContact } from '../utils.js';
import { useFormikContext } from 'formik';

const formatData = (values) => {
  const { ssn, genders, races, emergencyName, emergencyPhone, emergencyAddress, emergencyCity, emergencyState, emergencyZip, ...rest } = values;
  return {
    encryptedSSN: ssn ? encryptData(import.meta.env.VITE_PUBLIC_KEY, ssn) : null,
    pronouns: values.pronouns.concat(values.pronounsOther).filter(p => p !== 'Other').join(', '),
    gender: genders.length ? genders.join(', ') : null,
    race: races.length ? races.join(', ') : null,
    emergencyContact: formatContact(emergencyName, emergencyPhone, emergencyAddress, emergencyCity, emergencyState, emergencyZip),
    ...rest
  };
}

export default function ApplicationCombined({ setFormatData }) {
  const { values, setFieldValue } = useFormikContext();

  // console.log('ApplicationCombined');
  useEffect(() => {
    document.title = 'Epicodus Transfers';
    setFormatData(() => formatData);
  }, []);

  useEffect(() => {
    if (!values.pronouns.includes('Other')) {
      setFieldValue('pronounsOther', '');
    }
  }, [values.pronouns, setFieldValue]);

  return (
    <>
      <Typography variant='h4' align='center' gutterBottom>
        For Existing Epicodus Students
      </Typography>

      <Typography variant='h6' align='center' color='error' gutterBottom>
        <strong>DEMO ONLY &mdash; DO NOT USE</strong>
      </Typography>

      <Box marginY={4}>
        <TextInput name='firstname' label='First Name (legal)' required={true} sx={{ mb: 2 }} />
        <TextInput name='lastname' label='Last Name (legal)' required={true} sx={{ mb: 2 }} />
        <TextInput name='preferred' label='Preferred First Name' sx={{ mb: 2 }} />
        <TextInput name='email' label='Student Email' required={true}sx={{ mb: 2 }} />
        <PhoneInput name='phone' label='Phone' required={true} sx={{ mb: 2 }} />
        <TextInput name='address' label='Street Address' required={true} sx={{ mb: 2 }} />
        <TextInput name='city' label='City' required={true} sx={{ mb: 2 }} />
        <TextInput name='state' label='State' required={true} sx={{ mb: 2 }} />
        <TextInput name='zip' label='ZIP Code' required={true} sx={{ mb: 2 }} />
      </Box>

      <Box marginY={4}>
        <DateInput name='birthday' label='Date of birth' required={true} />
      </Box>

      <Box marginy={4}>
        <Typography>Parent / Guardian Contact Info<br />(Include Full Name, Email, Phone)</Typography>
        <TextInput name='parent' />
      </Box>

      <Box marginY={4}>
        <CheckboxInput name='pronouns' label='Pronouns (select all that apply)' options={pronounsOptions} fastField={false} />
        {values.pronouns?.includes('Other') && <TextInput name='pronounsOther' label='Pronouns (other)' fastField={false} sx={{ mt: 2 }} />}
      </Box>

      <Box marginY={4}>
        <CheckboxInput name='genders' label='Gender (select all that apply)' options={genderOptions} />
      </Box>

      <Box marginY={4}>
        <CheckboxInput name='races' label='Race / Ethnicity (select all that apply)' options={raceOptions} />
      </Box>

      <Divider sx={{ my: 6}} />

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
        <Typography>List the name & location of postsecondary institution(s) you attended, if any.</Typography>
        <TextInput name='educationDetails' />
      </Box>

      <Box marginY={4}>
        <RadioInput name='employment' label='Are you currently employed?' options={employmentOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <RadioInput name='admission' label='I am enrolled primarily for the following reason:' options={admissionOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <RadioInput name='intend' label='I am enrolled in the following program:' options={intendOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <Typography>Approximate date you began the program:</Typography>
        <TextInput name='startdate' />
      </Box>

      <Box marginY={4}>
        <RadioInput name='citizen' label='Are you a U.S. citizen?' options={yesNoOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <RadioInput name='veteran' label='Have you served in the U.S. military/armed services?' options={yesNoOptions} required={true} />
      </Box>

      <Divider sx={{ my: 6}} />

      <Box marginY={4}>
        <Typography variant='body' gutterBottom sx={{ fontStyle: 'italic' }}>
          Note: We are required by law to ask students for their social security number. We report it to the Oregon state government, which uses it to measure program outcomes. You may choose not to provide your social security number with no penalty. We take utmost precaution with your social security number, including encrypting it before storing it.
        </Typography>
        <Box marginY={2}>
          <TextInput name='ssn' label='Social Security Number' placeholder='XXX-XX-XXXX' />
        </Box>
      </Box>

      <Divider sx={{ my: 6}} />

      <Box marginY={4}>
        <Typography variant='body' gutterBottom>
          Emergency Contact Information<Typography component="span" color='error'> *</Typography>
        </Typography>
        <Box marginTop={2} marginBottom={1}>
          <TextInput name='emergencyName' label='Name' required={true} />
        </Box>
        <Box marginY={1}>
          <PhoneInput name='emergencyPhone' label='Phone' required={true} />
        </Box>
        <Box marginY={1}>
          <TextInput name='emergencyAddress' label='Street Address' required={true} />
        </Box>
        <Grid container spacing={1}>
          <Grid item sm={5} xs={12}>
            <TextInput name='emergencyCity' label='City' required={true} />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextInput name='emergencyState' label='State' required={true} />
          </Grid>
          <Grid item sm={3} xs={12}>
            <TextInput name='emergencyZip' label='Zip' required={true} />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6}} />

      <Box marginY={4}>
        <Box marginY={1}>
          <Typography gutterBottom>
            Personal Statement<Typography component="span" color='error'> *</Typography>
          </Typography>
          <Typography variant='body' gutterBottom sx={{ fontStyle: 'italic' }}>
            Tell us more about why you want to complete this program, your passion for the topic, and any career aspirations you have. (approximately 250 words)
          </Typography>
        </Box>
        <TextAreaInput name='personalStatement' label='Personal Statement' rows={8} required={true} />
      </Box>
    </>
  )
}
