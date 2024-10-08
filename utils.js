import JSEncrypt from 'jsencrypt';

export const isValidUUID = (uuid) => uuid && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);

export const formatContact = (name, phone, address, city, state, zip) => `${name}, ${phone}, ${address}, ${city}, ${state} ${zip}`;

export const encryptData = (publicKey, value) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value);
};
