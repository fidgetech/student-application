// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Typography, Container, Button, Box, Grid, Divider } from '@mui/material';
// import { Formik, Form } from 'formik';
// import { getFunctions, httpsCallable } from 'firebase/functions';
// import '../firebase.js';
// import { formatAddress, encryptData } from '../utils.js';
// import useTokenValidation from '../hooks/useTokenValidation.jsx';
// import { initialValues, genderOptions, raceOptions, yesNoOptions, pronounsOptions, employmentOptions, admissionOptions, intendOptions, educationOptions } from '../config.js';
// import { CheckboxInput, RadioInput, TextInput, TextAreaInput } from './Inputs.jsx';
// import Header from './Header.jsx';

// const submitCombinedApplication = httpsCallable(getFunctions(), 'submitCombinedApplication', { limitedUseAppCheckTokens: true });

function ApplicationCombined() {
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { isValidToken, token } = useTokenValidation();

//   useEffect(() => {
//     if (!isValidToken) {
//       setError({
//         fullPage: true,
//         header: "Invalid Token",
//         message: "Please let us know if you got here after following a link in your email."
//       });
//     }
//   }, [isValidToken]);

//   const submitData = async (data) => {
//     try {
//       const response = await submitCombinedApplication(data);
//       if (response.data.success) {
//         navigate('/success', { replace: true });
//       } else {
//         throw new Error('Failed to submit application');
//       }
//     } catch (error) {
//       setError({
//         header: "Failed to submit application",
//         message: "Please let us know if this problem persists."
//       });
//     }
//   }

//   const handleSubmit = async (values, { setSubmitting }) => {
//     const data = { token, ...formatData(values) };
//     await submitData(data);
//     setSubmitting(false);
//   };

//   if (error?.fullPage) {
//     return <Header heading={error.header} subHeading={error.message} />;
//   }

//   return (
//     <Container maxWidth='sm' sx={{ my: 4 }}>    
//       <Typography variant='h4' align='center'>For Existing Students<br /></Typography>
//       <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//         {({ isSubmitting }) => (
//           <Form>
//             <Box marginY={4}>
//               <TextInput name='firstname' label='First Name (legal)' sx={{ mb: 2 }} />
//               <TextInput name='lastname' label='Last Name (legal)' sx={{ mb: 2 }} />
//               <TextInput name='preferred' label='Preferred First Name' sx={{ mb: 2 }} />
//               <TextInput name='email' label='Student Email' sx={{ mb: 2 }} />
//               <TextInput name='phone' label='Phone' sx={{ mb: 2 }} />
//               <TextInput name='address' label='Street Address' sx={{ mb: 2 }} />
//               <TextInput name='city' label='City' sx={{ mb: 2 }} />
//               <TextInput name='state' label='State' sx={{ mb: 2 }} />
//               <TextInput name='zip' label='ZIP Code' sx={{ mb: 2 }} />
//             </Box>

//             <Box>
//               <Typography>Parent / Guardian Contact Info (optional)<br />Include Full Name, Email, Phone</Typography>
//               <TextInput name='parent' />
//             </Box>

//             <Box marginY={4}>
//               <CheckboxInput name='pronouns' label='Pronouns (select all that apply)' options={pronounsOptions} />
//               <TextInput name='pronounsOther' label='Pronouns (other)' sx={{ mt: 2 }} />
//             </Box>

//             <Box marginY={4}>
//               <CheckboxInput name='genders' label='Gender (select all that apply)' options={genderOptions} />
//             </Box>

//             <Box marginY={4}>
//               <CheckboxInput name='races' label='Race / Ethnicity (select all that apply)' options={raceOptions} />
//             </Box>

//             <Divider sx={{ my: 6}} />

//             <Box marginY={4}>
//               <RadioInput name='stateid' label='Do you have a valid state-issued ID?' options={yesNoOptions} required={true} />
//             </Box>

//             <Box marginY={4}>
//               <RadioInput name='diagnosisAutism' label='Do you have an Autism diagnosis?' options={yesNoOptions} required={true} />
//             </Box>

//             <Box marginY={4}>
//               <Typography>Please list any other diagnoses you are willing to disclose, if any.</Typography>
//               <TextInput name='diagnosisOther' />
//             </Box>

//             <Box marginY={4}>
//               <RadioInput name='education' label="What is the highest level of education you've completed? " options={educationOptions} required={true} />
//             </Box>

//             <Box marginY={4}>
//               <Typography>List the name & location of postsecondary institution(s) you attended, if any.</Typography>
//               <TextInput name='educationDetails' />
//             </Box>

//             <Box marginY={4}>
//               <RadioInput name='employment' label='Are you currently employed?' options={employmentOptions} required={true} />
//             </Box>

//             <Box marginY={4}>
//               <RadioInput name='admission' label='I am enrolled primarily for the following reason:' options={admissionOptions} required={true} />
//             </Box>

//             <Box marginY={4}>
//               <RadioInput name='intend' label='I am enrolled in the following program' options={intendOptions} required={true} />
//             </Box>

//             <Box marginY={4}>
//               <Typography>Approximate date you began the program:</Typography>
//               <TextInput name='startdate' />
//             </Box>

//             <Box marginY={4}>
//               <RadioInput name='citizen' label='Are you a U.S. citizen?' options={yesNoOptions} required={true} />
//             </Box>

//             <Box marginY={4}>
//               <RadioInput name='veteran' label='Have you served in the U.S. military/armed services?' options={yesNoOptions} required={true} />
//             </Box>

//             <Divider sx={{ my: 6}} />

//             <Box marginY={4}>
//               <Typography variant='body' gutterBottom sx={{ fontStyle: 'italic' }}>
//                 Note: We are required by law to ask students for their social security number. We report it to the Oregon state government, which uses it to measure program outcomes. You may choose not to provide your social security number with no penalty. We take utmost precaution with your social security number, including encrypting it before storing it.
//               </Typography>
//               <Box marginY={2}>
//                 <TextInput name='ssn' label='Social Security Number' placeholder='XXX-XX-XXXX' />
//               </Box>
//             </Box>

//             <Divider sx={{ my: 6}} />

//             <Box marginY={4}>
//               <Typography variant='body' gutterBottom>
//                 Emergency Contact Information<Typography component="span" color='error'> *</Typography>
//               </Typography>
//               <Box marginTop={2} marginBottom={1}>
//                 <TextInput name='emergencyName' label='Name' required={true} />
//               </Box>
//               <Box marginY={1}>
//                 <TextInput name='emergencyPhone' label='Phone' required={true} />
//               </Box>
//               <Box marginY={1}>
//                 <TextInput name='emergencyAddress' label='Street Address' required={true} />
//               </Box>
//               <Grid container spacing={1}>
//                 <Grid item sm={5} xs={12}>
//                   <TextInput name='emergencyCity' label='City' required={true} />
//                 </Grid>
//                 <Grid item sm={4} xs={12}>
//                   <TextInput name='emergencyState' label='State' required={true} />
//                 </Grid>
//                 <Grid item sm={3} xs={12}>
//                   <TextInput name='emergencyZip' label='Zip' required={true} />
//                 </Grid>
//               </Grid>
//             </Box>

//             <Divider sx={{ my: 6}} />

//             <Box marginY={4}>
//               <Box marginY={1}>
//                 <Typography gutterBottom>
//                   Personal Statement<Typography component="span" color='error'> *</Typography>
//                 </Typography>
//                 <Typography variant='body' gutterBottom sx={{ fontStyle: 'italic' }}>
//                   Tell us more about why you want to complete this program, your passion for the topic, and any career aspirations you have. (approximately 250 words)
//                 </Typography>
//               </Box>
//               <TextAreaInput name='personalStatement' label='Personal Statement' rows={8} required={true} />
//             </Box>

//             {error && <Header heading={error.header} subHeading={error.message} color='error' />}

//             <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
//               Submit
//             </Button>

//           </Form>
//         )}
//       </Formik>
//     </Container>
//   )
// }

// const formatData = ({ ssn, genders, races, citizen, veteran, emergencyName, emergencyPhone, emergencyAddress, emergencyCity, emergencyState, emergencyZip, personalStatement }) => {
//   return {
//     encryptedSSN: ssn ? encryptData(import.meta.env.VITE_PUBLIC_KEY, ssn) : null,
//     gender: genders.length ? genders.join(', ') : null,
//     race: races.length ? races.join(', ') : null,
//     citizen,
//     veteran,
//     emergencyContactName: emergencyName,
//     emergencyContactPhone: emergencyPhone,
//     emergencyContactAddress: formatAddress(emergencyAddress, emergencyCity, emergencyState, emergencyZip),
//     personalStatement
//   };
}

export default ApplicationCombined
