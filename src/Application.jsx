import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import { getFunctions, httpsCallable } from 'firebase/functions';
import useTokenValidation from '../hooks/useTokenValidation.jsx';
import '../firebase.js';
import { initialValues } from '../config.js';
import Header from './Header.jsx';
import ApplicationPart1 from './ApplicationPart1.jsx';
import ApplicationPart2 from './ApplicationPart2.jsx';
import ApplicationCombined from './ApplicationCombined.jsx';
import ProfileEdit from './ProfileEdit.jsx';
import { validationSchema } from './validationSchema.js';

const submitFunction = (page) => {
  const functionMap = {
    page1: 'submitApplicationPart1',
    page2: 'submitApplicationPart2',
    combined: 'submitCombinedApplication'
  };
  return httpsCallable(getFunctions(), functionMap[page], { limitedUseAppCheckTokens: true });
};

export default function Application({ page }) {
  const navigate = useNavigate();
  const { token } = useTokenValidation();
  const [error, setError] = useState(null);
  const [invalidToken, setInvalidToken] = useState(null);
  const [formatData, setFormatData] = useState(null);

  const submitData = async (data) => {
    const submitApplication = submitFunction(page);
    try {
      const response = await submitApplication({ token, ...data });
      if (response.data.success) {
        window.location.href = 'https://www.fidgetech.org/success';
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
    setError(null);
    const data = formatData(values);
    await submitData(data);
    setSubmitting(false);
  };

  if (invalidToken) {
    return <Header heading='Invalid Token' subHeading='Please let us know if you got here after following a link in your email.' />;
  }

  return (
    <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
      <Box textAlign='center' sx={{ mb: 2 }}>
        <img src='/logo+copy.png' alt='Fidgetech Logo' style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }} />
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema(page)}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {(formik) => (
          <Form spellCheck='false'>
            {page === 'page1' && <ApplicationPart1 setFormatData={setFormatData} />}
            {page === 'page2' && <ApplicationPart2 setFormatData={setFormatData} setInvalidToken={setInvalidToken} />}
            {page === 'combined' && <ApplicationCombined setFormatData={setFormatData} />}
            {page === 'profile' && <ProfileEdit setFormatData={setFormatData} />}

            {error && <Header heading={error.header} subHeading={error.message} color='error' />}

            <Button type='submit' variant='contained' color='primary' disabled={formik.isSubmitting}>
              Submit Application
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
