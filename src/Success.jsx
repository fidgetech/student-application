import { useEffect } from 'react';
import Header from './Header.jsx';

function Success({ heading='Success!', subHeading='Thank you for submitting your application.' }) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //     window.parent.postMessage({ height: document.documentElement.scrollHeight }, '*');
  //   }, 0);
  // }, []);

  return <Header heading={heading} subHeading={subHeading} />;
}

export default Success;