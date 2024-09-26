import { useEffect } from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';
import { genderOptions, raceOptions, yesNoOptions } from '../config.js';
import { CheckboxInput, RadioInput, TextInput, TextAreaInput } from './Inputs.jsx';
import { encryptData, formatContact } from '../utils.js';
import useTokenValidation from '../hooks/useTokenValidation.jsx';

const formatData = (values) => {
  const { ssn, genders, races, emergencyName, emergencyPhone, emergencyAddress, emergencyCity, emergencyState, emergencyZip, ...rest } = values;
  return {
    encryptedSSN: ssn ? encryptData(import.meta.env.VITE_PUBLIC_KEY, ssn) : null,
    gender: genders.length ? genders.join(', ') : null,
    race: races.length ? races.join(', ') : null,
    emergencyContact: formatContact(emergencyName, emergencyPhone, emergencyAddress, emergencyCity, emergencyState, emergencyZip),
    ...rest
  };
}

export default function ApplicationPart2({ setFormatData, setInvalidToken }) {
  const { isValidToken } = useTokenValidation();
  useEffect(() => {
    if (!isValidToken) {
      setInvalidToken(true);
    }
  }, [isValidToken]);

  useEffect(() => {
    setFormatData(() => formatData);
  }, []);

  return (
    <>
      <Typography variant='h4' align='center' gutterBottom>
        Fidgetech Application - Part 2
      </Typography>

      <Typography variant='body1' align='center' gutterBottom>
        We're asking for more personal information about you as part of evaluating the diversity of our application process. 
        The demographics questions are optional, and your responses will not affect your chances of admission.
      </Typography>

      <Box marginY={4}>
        <CheckboxInput name='genders' label='Gender (select all that apply)' options={genderOptions} />
      </Box>

      <Box marginY={4}>
        <CheckboxInput name='races' label='Race / Ethnicity (select all that apply)' options={raceOptions} />
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
          <TextInput name='emergencyPhone' label='Phone' required={true} />
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
