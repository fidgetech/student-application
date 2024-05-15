import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Button, Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { getFunctions, httpsCallable } from 'firebase/functions';
import '../firebase.js';
import { formatAddress, encryptData } from '../utils';
import useTokenValidation from '../hooks/useTokenValidation.jsx';
import { initialValues, genderOptions, raceOptions, yesNoOptions } from '../config.js';
import { CheckboxInput, RadioInput, TextInput, TextAreaInput } from './Inputs.jsx';
import Header from './Header.jsx';

const submitApplication = httpsCallable(getFunctions(), 'submitApplication', { limitedUseAppCheckTokens: true });

function App() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isValidToken, token } = useTokenValidation();
  
  useEffect(() => {
    if (!isValidToken) {
      setError({
        fullPage: true,
        header: "Invalid Token",
        message: "Please let us know if you got here after following a link in your email."
      });
    }
  }, [isValidToken]);

  const submitData = async (data) => {
    try {
      const response = await submitApplication(data);
      if (response.data.success) {
        navigate('/success', { replace: true });
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      setError({
        header: "Failed to submit application",
        message: "Please let us know if this problem persists."
      });
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = { token, ...formatData(values) };
    await submitData(data);
    setSubmitting(false);
  };

  if (error?.fullPage) {
    return <Header heading={error.header} subHeading={error.message} />;
  }

  return (
    <Container maxWidth='sm' sx={{ my: 4 }}>    
      <Typography variant='h4' align='center' gutterBottom>
        Student Application - Part 2
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
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

            <Box marginY={4}>
              <Typography variant='body' gutterBottom sx={{ fontStyle: 'italic' }}>
                Note: We are required by law to ask students for their social security number. We report it to the Oregon state government, which uses it to measure program outcomes. You may choose not to provide your social security number with no penalty. We take utmost precaution with your social security number, including encrypting it before storing it.
              </Typography>
              <Box marginY={2}>
                <TextInput name='ssn' label='Social Security Number' placeholder='XXX-XX-XXXX' />
              </Box>
            </Box>

            <Box marginY={4}>
              <Typography variant='body' gutterBottom>
                Emergency Contact Information<Typography component="span" color='error'> *</Typography>
              </Typography>
              <Box marginTop={2} marginBottom={1}>
                <TextInput name='name' label='Name' required={true} />
              </Box>
              <Box marginY={1}>
                <TextInput name='phone' label='Phone' required={true} />
              </Box>
              <Box marginY={1}>
                <TextInput name='address' label='Street Address' required={true} />
              </Box>
              <Grid container spacing={1}>
                <Grid item sm={5} xs={12}>
                  <TextInput name='city' label='City' required={true} />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextInput name='state' label='State' required={true} />
                </Grid>
                <Grid item sm={3} xs={12}>
                  <TextInput name='zip' label='Zip' required={true} />
                </Grid>
              </Grid>
            </Box>

            <Box marginY={4}>
              <Box marginY={1}>
                <Typography gutterBottom>
                  Personal Statement<Typography component="span" color='error'> *</Typography>
                </Typography>
                <Typography variant='body' gutterBottom sx={{ fontStyle: 'italic' }}>
                  Tell us more about why you want to complete this program, your passion for the topic, and any career aspirations you have.
                </Typography>
              </Box>
              <TextAreaInput name='personalStatement' label='Personal Statement' rows={8} required={true} />
            </Box>

            {error && <Header heading={error.header} subHeading={error.message} color='error' />}

            <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
              Submit
            </Button>

          </Form>
        )}
      </Formik>
    </Container>
  )
}

const formatData = ({ ssn, genders, races, citizen, veteran, name, phone, address, city, state, zip, personalStatement }) => {
  return {
    encryptedSSN: ssn ? encryptData(import.meta.env.VITE_PUBLIC_KEY, ssn) : null,
    gender: genders.length ? genders.join(', ') : null,
    race: races.length ? races.join(', ') : null,
    citizen: citizen,
    veteran: veteran,
    emergencyContactName: name,
    emergencyContactPhone: phone,
    emergencyContactAddress: formatAddress(address, city, state, zip),
    personalStatement: personalStatement
  };
}

export default App
