

import { useEffect } from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';
import { CheckboxInput, RadioInput, TextInput, TextAreaInput } from './Inputs.jsx';
import { genderOptions, raceOptions, yesNoOptions } from '../config.js';
import { encryptData, formatContact } from '../utils.js';

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

export default function ApplicationPart1({ setFormatData }) {
  useEffect(() => {
    setFormatData(() => formatData);
  }, []);

  console.log('rendering');
  return (
    <>
      <Box marginY={4}>
        <Box marginTop={2} marginBottom={1}>
          <TextInput name='firstname' label='First Name' required={true} />
        </Box>
      </Box>
    </>
  )
}
