const AuthNative = require('./auth0WebAuthNative'); // dynamic imports are not allowed by react-native so we have to put this one at the top.

const TYPES = {
  AUTH0_WEB_AUTH: 'auth0WebAuth',
  AUTH0_WEB_AUTH_NATIVE: 'auth0WebAuthNative',
  MACHINE_AUTH: 'machineAuth',
  PASSWORD_GRANT_AUTH: 'passwordGrantAuth'
};

function Auth0WebAuth(...args) {
  const Auth = require('./auth0WebAuth').default;

  return new Auth(...args);
}

function Auth0WebAuthNative(...args) {
  return new AuthNative(...args);
}

function MachineAuth(...args) {
  const Auth = require('./machineAuth').default;

  return new Auth(...args);
}

function PasswordGrantAuth(...args) {
  const Auth = require('./passwordGrantAuth').default;

  return new Auth(...args);
}

export {
  Auth0WebAuth,
  Auth0WebAuthNative,
  MachineAuth,
  PasswordGrantAuth,
  TYPES
};
