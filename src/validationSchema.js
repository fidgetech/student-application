import * as Yup from 'yup';
import { yesNoOptions, educationOptions, employmentOptions, admissionOptions, intendOptions, startdateOptions } from '../config.js';

export function validationSchema(page) {
  const part1Schema = Yup.object({
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    preferred: Yup.string(),
    email: Yup.string().email('Invalid email address').required('Required'),
    emailConfirm: Yup.string().oneOf([Yup.ref('email'), null], 'Emails must match').required('Required'),
    phone: Yup.string().matches(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone number').required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zip: Yup.string().required('Required'),
    birthday: Yup.string().matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Invalid date').required('Required'),
    pronouns: Yup.array().of(Yup.string()).required('Required'),
    pronounsOther: Yup.string(),
    stateid: Yup.mixed().oneOf(yesNoOptions).required('Required'),
    diagnosisAutism: Yup.mixed().oneOf(yesNoOptions).required('Required'),
    diagnosisOther: Yup.string(),
    education: Yup.mixed().oneOf(educationOptions).required('Required'),
    educationDetails: Yup.string(),
    employment: Yup.mixed().oneOf(employmentOptions).required('Required'),
    parent: Yup.string(),
    admission: Yup.mixed().oneOf(admissionOptions).required('Required'),
    intend: Yup.mixed().oneOf(intendOptions).required('Required'),
    startdate: Yup.mixed().oneOf(startdateOptions).required('Required')
  });

  if (page === 'page1') {
    return part1Schema;
  } else {
    return Yup.object();
  }
}
