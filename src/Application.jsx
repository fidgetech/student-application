import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { getFunctions, httpsCallable } from 'firebase/functions';
import useTokenValidation from '../hooks/useTokenValidation.jsx';
import '../firebase.js';
import { initialValues } from '../config.js';
import Header from './Header.jsx';
import ApplicationPart2 from './ApplicationPart2.jsx';

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
    const data = formatData(values);
    await submitData(data);
    setSubmitting(false);
  };

  if (invalidToken) {
    return <Header heading='Invalid Token' subHeading='Please let us know if you got here after following a link in your email.' />;
  }

  return (
    <Container maxWidth='sm' sx={{ my: 4 }}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {/* {page === 'page1' && <ApplicationPart1 setFormatData={setFormatData} />} */}
            {page === 'page2' && <ApplicationPart2 setFormatData={setFormatData} setInvalidToken={setInvalidToken} />}
            {/* {page === 'combined' && <ApplicationCombined setFormatData={setFormatData} />} */}

            {error && <Header heading={error.header} subHeading={error.message} color='error' />}

            <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
