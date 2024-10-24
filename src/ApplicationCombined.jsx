import { useEffect } from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';
import { CheckboxInput, RadioInput, TextInput, TextAreaInput, NumberInput } from './Inputs.jsx';
import { genderOptions, raceOptions, yesNoOptions, pronounsOptions, employmentOptions, admissionOptions, intendOptions, educationOptions } from '../config.js';
import { encryptData, formatContact } from '../utils.js';
import { useFormikContext } from 'formik';

const formatData = (values) => {
  const { pronouns, pronounsOther, diagnosisOther, educationDetails, parent, ssn, genders, races, emergencyName, emergencyPhone, emergencyAddress, emergencyCity, emergencyState, emergencyZip, ...rest } = values;
  return {
    pronouns: pronouns.concat(pronounsOther).filter(p => p !== 'Other').join(', '),
    diagnosisOther: diagnosisOther.replace(/\n/g, '; '),
    educationDetails: educationDetails.replace(/\n/g, '; '),
    parent: parent.replace(/\n/g, '; '),
    gender: genders.length ? genders.join(', ') : null,
    race: races.length ? races.join(', ') : null,
    emergencyContact: formatContact(emergencyName, emergencyPhone, emergencyAddress, emergencyCity, emergencyState, emergencyZip),
    encryptedSSN: ssn ? encryptData(import.meta.env.VITE_PUBLIC_KEY, ssn) : null,
    ...rest
  };
}

export default function ApplicationCombined({ setFormatData }) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    document.title = 'Transfer Application';
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
        Transfer Application Form for Former Epicodus Students
      </Typography>

      <Box marginY={4}>
        <TextInput name='firstname' label='First Name (legal)' required={true} sx={{ mb: 2 }} />
        <TextInput name='lastname' label='Last Name (legal)' required={true} sx={{ mb: 2 }} />
        <TextInput name='preferred' label='Preferred First Name' sx={{ mb: 2 }} />
        <TextInput name='email' label='Student Email' required={true}sx={{ mb: 2 }} />
        <TextInput name='emailConfirm' label='Re-enter Email' required={true} sx={{ mb: 2 }} />
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
        <TextAreaInput name='diagnosisOther' rows={2} />
      </Box>

      <Box marginY={4}>
        <RadioInput name='education' label="What is the highest level of education you've completed? " options={educationOptions} required={true} />
      </Box>

      <Box marginY={4}>
        <Typography>List postsecondary institution(s) you attended, if any.</Typography>
        <TextAreaInput name='educationDetails' rows={2} />
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
        <Typography>Approximate date you began the program:<Typography component="span" color='error'> *</Typography></Typography>
        <TextInput name='startdate' required={true} />
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

      <Box marginy={4}>
        <Typography>Parent / Guardian Contact Info<br />(Include Full Name, Email, Phone)</Typography>
        <TextAreaInput name='parent' rows={2} />
      </Box>

      <Box marginY={4}>
        <Typography variant='body' gutterBottom>
          Emergency Contact Information<Typography component="span" color='error'> *</Typography>
        </Typography>
        <Box marginTop={2} marginBottom={1}>
          <TextInput name='emergencyName' label='Name' required={true} />
        </Box>
        <Box marginY={1}>
          <NumberInput name='emergencyPhone' label='Phone' format='###-###-####' placeholder='###-###-####' required={true} />
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
