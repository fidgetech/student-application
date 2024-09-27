# Fidgetech - Application

## Firebase function (back-end) for submitting data to Zapier

**Include all required and optional field keys in `functions/index.js`.**

Deploy using the Firebase CLI: `firebase deploy --only functions`

## Front-end

### Public key encryption

Store public key in `.env` as `VITE_PUBLIC_KEY`.
Store private key in [decrypt app](https://github.com/fidgetech/decrypt).

Make updates as needed in `config.js`.

Auto-deploys via GitHub action on push / merge to main.
