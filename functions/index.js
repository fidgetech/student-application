const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { info, error } = require("firebase-functions/logger");
const axios = require("axios");

// FOR APPLICATION PART 1; include all keys here
const APP_P1_ZAPIER_WEBHOOK = process.env.APP_P1_ZAPIER_WEBHOOK;
const APP_P1_REQUIRED_FIELDS = ['firstname', 'lastname', 'email', 'phone', 'address', 'city', 'state', 'zip', 'birthday', 'stateid', 'diagnosisAutism', 'education', 'employment', 'admission', 'intend', 'startdate'];
const APP_P1_OPTIONAL_FIELDS = ['preferred', 'parent', 'pronouns', 'diagnosisOther', 'educationDetails'];

// FOR APPLICATION PART 2; include all keys here
const APP_P2_ZAPIER_WEBHOOK = process.env.APP_P2_ZAPIER_WEBHOOK;
const APP_P2_REQUIRED_FIELDS = ['token', 'citizen', 'veteran', 'emergencyContact', 'personalStatement'];
const APP_P2_OPTIONAL_FIELDS = ['encryptedSSN', 'gender', 'race'];

// FOR PROFILE EDIT FORM; include all keys here
const PROFILE_EDIT_ZAPIER_WEBHOOK = process.env.PROFILE_EDIT_ZAPIER_WEBHOOK;
const PROFILE_EDIT_REQUIRED_FIELDS = ['emailCurrent'];
const PROFILE_EDIT_OPTIONAL_FIELDS = ['email', 'preferred', 'phone', 'pronouns'];

// FOR EXISTING STUDENTS TRANSFERRING FROM EPICODUS (TEMPORARY)
const COMBINED_ZAPIER_WEBHOOK = process.env.COMBINED_ZAPIER_WEBHOOK;
const COMBINED_REQUIRED_FIELDS = ['firstname', 'lastname', 'email', 'phone', 'address', 'city', 'state', 'zip', 'birthday', 'stateid', 'diagnosisAutism', 'education', 'employment', 'admission', 'intend', 'startdate', 'citizen', 'veteran', 'emergencyContact', 'personalStatement'];
const COMBINED_OPTIONAL_FIELDS = ['preferred', 'parent', 'pronouns', 'diagnosisOther', 'educationDetails', 'encryptedSSN', 'gender', 'race'];

// FOR DESIGN WORKSHOP; include all keys here
const DESIGN_WORKSHOP_ZAPIER_WEBHOOK = process.env.DESIGN_WORKSHOP_ZAPIER_WEBHOOK;
const DESIGN_WORKSHOP_REQUIRED_FIELDS = ['firstname', 'lastname', 'email', 'phone', 'birthday', 'stateid', 'diagnosisAutism', 'education', 'photoshop', 'illustrator', 'aftereffects', 'canva', 'artistic'];
const DESIGN_WORKSHOP_OPTIONAL_FIELDS = ['preferred', 'pronouns'];

exports.submitApplicationPart1 = onCall({ enforceAppCheck: true },
  async (request) => {
    // info('Data:', request.data);
    return submitHelper({
      data: request.data,
      url: APP_P1_ZAPIER_WEBHOOK,
      requiredFields: APP_P1_REQUIRED_FIELDS,
      optionalFields: APP_P1_OPTIONAL_FIELDS
    });
  }
);

exports.submitApplicationPart2 = onCall({ enforceAppCheck: true },
  async (request) => {
    // info('Data:', request.data);
    return submitHelper({
      data: request.data,
      url: APP_P2_ZAPIER_WEBHOOK,
      requiredFields: APP_P2_REQUIRED_FIELDS,
      optionalFields: APP_P2_OPTIONAL_FIELDS
    });
  }
);

exports.submitCombinedApplication = onCall({ enforceAppCheck: true },
  async (request) => {
    // info('Data:', request.data);
    return submitHelper({
      data: request.data,
      url: COMBINED_ZAPIER_WEBHOOK,
      requiredFields: COMBINED_REQUIRED_FIELDS,
      optionalFields: COMBINED_OPTIONAL_FIELDS
    });
  }
);

exports.submitDesignWorkshopApplication = onCall({ enforceAppCheck: true },
  async (request) => {
    info('Data:', request.data);
    return submitHelper({
      data: request.data,
      url: DESIGN_WORKSHOP_ZAPIER_WEBHOOK,
      requiredFields: DESIGN_WORKSHOP_REQUIRED_FIELDS,
      optionalFields: DESIGN_WORKSHOP_OPTIONAL_FIELDS
    });
  }
);

exports.submitProfileEdit = onCall({ enforceAppCheck: true },
  async (request) => {
    // info('Data:', request.data);
    return submitHelper({
      data: request.data,
      url: PROFILE_EDIT_ZAPIER_WEBHOOK,
      requiredFields: PROFILE_EDIT_REQUIRED_FIELDS,
      optionalFields: PROFILE_EDIT_OPTIONAL_FIELDS
    });
  }
);

const submitHelper = async ({ data, url, requiredFields, optionalFields }) => {
  const filteredData = Object.keys(data).reduce((obj, key) => {
    if (requiredFields.includes(key) || optionalFields.includes(key)) {
      obj[key] = data[key];
    }
    return obj;
  }, {});
  const isValidData = requiredFields.every(field => filteredData[field]);
  if (!isValidData) {
    error('Filtered Data:', filteredData);
    error('Missing required fields');
    throw new HttpsError('invalid-argument', 'Firebase function reports invalid data');
  }
  try {
    await axios.post(url, filteredData);
    return { success: true };
  } catch (err) {
    error('Failed to send data to Zapier', err);
    throw new HttpsError('internal', 'Firebase function unable to send data to Zapier', err);
  }
}
