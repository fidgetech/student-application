import Header from './Header.jsx';

function Success({ heading='Success!', subHeading='Thank you for submitting your application.' }) {
  return <Header heading={heading} subHeading={subHeading} />;
}

export default Success;