const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineString } = require('firebase-functions/params');
const { log, error } = require("firebase-functions/logger");
const axios = require("axios");
const ZAPIER_WEBHOOK_URL = defineString('ZAPIER_WEBHOOK_URL');

// INCLUDE ALL FIELD KEYS HERE:
const REQUIRED_FIELDS = ['token', 'citizen', 'veteran', 'emergencyContactName', 'emergencyContactPhone', 'emergencyContactAddress', 'personalStatement'];
const OPTIONAL_FIELDS = ['encryptedSSN', 'gender', 'race'];

exports.submitApplication = onCall(
  { enforceAppCheck: true, consumeAppCheckToken: true },
  async (request) => {
    const { data } = request;
    const filteredData = Object.keys(data).reduce((obj, key) => {
      if (REQUIRED_FIELDS.includes(key) || OPTIONAL_FIELDS.includes(key)) {
        obj[key] = data[key];
      }
      return obj;
    }, {});
    const isValidData = REQUIRED_FIELDS.every(field => filteredData[field]);
    if (!isValidData) {
      error('Missing required fields');
      throw new HttpsError('invalid-argument', 'Firebase function reports invalid data');
    }
    try {
      await axios.post(ZAPIER_WEBHOOK_URL.value(), filteredData);
      return { success: true };
    } catch (err) {
      error('Failed to send data to Zapier', err);
      throw new HttpsError('internal', 'Firebase function unable to send data to Zapier', err);
    }
  }
);
