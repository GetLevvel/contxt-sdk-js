import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

/**
 * @typedef {Object} UserProfile
 * @property {string} email
 * @property {boolean} email_verified
 * @property {string} name
 * @property {string} nickname
 * @property {string} picture URL to an avatar
 * @property {string} sub The Subject Claim of the user's JWT
 * @property {string} updatedAt ISO 8601 Extended Format date/time string
 */

/**
 * @typedef {Object} Auth0WebAuthSessionInfo
 * @property {string} accessToken
 * @property {number} expiresAt
 */

/**
 * A SessionType that allows the user to initially authenticate with Auth0 and then gain a valid JWT
 * from the Contxt Auth service. This would only be used in web applications. You will need to
 * integrate this module's `logIn`, `logOut`, and `handleAuthentication` methods with your UI
 * elements. `logIn` would be tied to a UI element to log the user in. `logOut` would be tied to a
 * UI element to log the user out. `handleAuthentication` would be tied with your application's
 * router and would be called when visting the route defined by `config.authorizationPath` (the
 * default is `/callback`).
 *
 * This SessionType is set up to refresh auth tokens automatically. To ensure this works, make sure
 * your single page application has {@link https://auth0.com/docs/cross-origin-authentication#configure-your-application-for-cross-origin-authentication Cross-Origin Authentication}
 * enabled in Auth0.
 *
 * *NOTE*: The web origin added in auth0 should be something like
 * "http://localhost:5000", not "http://localhost:5000/callback"
 *
 * @type SessionType
 *
 * @typicalname contxtSdk.auth
 *
 * @example
 * import ContxtSdk from '@ndustrial/contxt-sdk';
 * import history from '../services/history';
 *
 * const contxtSdk = new ContxtSdk({
 *   config: {
 *     auth: {
 *       clientId: '<client id>',
 *       onAuthenticate: (auth0WebAuthSessionInfo) => handleSuccessfulAuth(auth0WebAuthSessionInfo),
 *       onRedirect: (pathname) => history.push(pathname)
 *     }
 *   },
 *   sessionType: 'auth0WebAuth'
 * });
 */
class Auth0WebAuthNative {
  /**
   * @param {Object} sdk An instance of the SDK so the module can communicate with other modules
   * @param {Object} sdk.audiences
   * @param {Object} sdk.audiences.contxtAuth
   * @param {string} sdk.audiences.contxtAuth.clientId The Auth0 client id of the
   *   Contxt Auth environment
   * @param {Object} sdk.config
   * @param {Object} sdk.config.auth
   * @param {string} sdk.config.auth.authorizationPath Path that is called by Auth0 after
   *   successfully authenticating
   * @param {string} sdk.config.auth.clientId The Auth0 client id of this application
   * @param {function} [sdk.config.auth.onRedirect] Redirect method used when navigating between
   *   Auth0 callbacks
   */
  constructor(sdk) {
    this._sdk = sdk;

    if (!this._sdk.config.auth.clientId) {
      throw new Error('clientId is required for the WebAuth config');
    }

    this._onAuthenticate =
      this._sdk.config.auth.onAuthenticate || this._defaultOnAuthenticate;
    this._getStoredSession().then((sessionInfo) => {
      this._sessionInfo = sessionInfo;
    });

    this._auth0 = new Auth0({
      clientId: this._sdk.config.auth.clientId,
      domain: 'ndustrial.auth0.com'
    });
  }

  /**
   * Removes an audience's API token from the in-memory token storage
   *
   * @param audienceName
   *
   * @returns {Promise}
   */
  clearCurrentApiToken(audienceName) {
    const promise = this._tokenPromises[audienceName] || Promise.resolve();

    return promise.then(() => {
      delete this._tokenPromises[audienceName];
    });
  }

  /**
   * Gets the current auth0 access token
   *
   * @returns {Promise}
   * @fulfills {string} accessToken
   */
  getCurrentAccessToken() {
    if (!this.isAuthenticated()) {
      return Promise.reject(this._generateUnauthorizedError());
    }

    return Promise.resolve(this._sessionInfo.accessToken);
  }

  /**
   * Requests an api token from Contxt Auth for the correct audience
   *
   * @param audienceName
   *
   * @returns {Promise}
   * @fulfills {string} apiToken
   */
  getCurrentApiToken(audienceName) {
    if (!this.isAuthenticated()) {
      return Promise.reject(this._generateUnauthorizedError());
    }

    const audience = this._sdk.config.audiences[audienceName];

    if (!(audience && audience.clientId)) {
      return Promise.reject(new Error('No valid audience found'));
    }

    if (!this._tokenPromises[audienceName]) {
      this._tokenPromises[audienceName] = axios
        .post(
          `${this._sdk.config.audiences.contxtAuth.host}/v1/token`,
          {
            audiences: [audience.clientId],
            nonce: 'nonce'
          },
          {
            headers: {
              Authorization: `Bearer ${this._sessionInfo.accessToken}`
            }
          }
        )
        .then(({ data }) => data.access_token);
    }

    return this._tokenPromises[audienceName];
  }

  /**
   * Gets the current user's profile from Auth0
   *
   * @returns {Promise}
   * @fulfill {UserProfile}
   * @rejects {Error}
   */
  getProfile() {
    return this._auth0
      .users(this._sessionInfo.accessToken)
      .getUser()
      .then((profile) => {
        const formattedProfile = {
          ...profile,
          updatedAt: profile.updated_at
        };
        delete formattedProfile.updated_at;

        return formattedProfile;
      })
      .catch((err) => err);
  }

  /**
   * Routine that takes unparsed information from Auth0, stores it in a way that
   * can be used for getting access tokens, schedules its future renewal, and
   * redirects to the correct page in the application.
   *
   * @returns {Promise}
   * @fulfill {Auth0WebAuthSessionInfo}
   * @rejects {Error}
   */
  handleAuthentication() {
    /**
     * For the native version we can either NO-OP this or make it return the id-token
     * This is because the logIn method doesn't need to support a callback.
     *
     * We still want this method here for interop with web/native
     */
    return Promise.resolve(this.sessionInfo.accessToken);
  }

  /**
   * Tells caller if the current user is authenticated.
   *
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!(
      this._sessionInfo &&
      this._sessionInfo.accessToken &&
      this._sessionInfo.expiresAt > Date.now()
    );
  }

  /**
   * Starts the Auth0 log in process
   *
   * @param {Object} options
   * @param {Boolean} [options.forceLogin = false] When true will bypass any sso settings in the authorization provider
   */
  logIn(options = {}) {
    const authOptions = {
      responseType: 'token',
      audience: this._sdk.config.audiences.contxtAuth.clientId,
      scope: 'email profile openid'
    };

    if (options.forceLogin) {
      authOptions.prompt = 'login';
    }

    const loginPromise = this._auth0.webAuth
      .authorize(authOptions)
      .then((success) => {
        this._storeSession({
          accessToken: success.idToken,
          expiresIn: success.expiresIn
        });
      })
      .catch((err) => {
        console.log(`Error while handling authentication: ${err}`);
      });

    return loginPromise;
  }

  /**
   * Logs the user out by removing any stored session info, clearing any token
   * renewal, and redirecting to the root
   *
   */
  logOut() {
    this._sessionInfo = {};
    this._tokenPromises = {};

    AsyncStorage.removeItem('@accessToken');
    AsyncStorage.removeItem('@expiresAt');

    this._auth0.webAuth.logout();
  }

  /**
   * Default method used for intercepting a successful authentication result. Overridden
   * by `onAuthenticate` in the auth config
   *
   * @private
   */
  _defaultOnAuthenticate(authResult) {
    return authResult;
  }

  /**
   * Loads a saved session from local storage
   *
   * @returns {Object} session
   * @returns {string} session.accessToken
   * @returns {number} session.expiresAt
   *
   * @private
   */
  async _getStoredSession() {
    try {
      const accessToken = await AsyncStorage.getItem('@accessToken');
      const expiresAt = Number.parseInt(
        await AsyncStorage.getItem('@expiresAt')
      );
      console.log(
        'Retrieved stored session: ' +
          JSON.stringify({ accessToken, expiresAt })
      );
      return {
        accessToken,
        expiresAt
      };
    } catch (err) {
      console.log('Unable to read from local storage');
      return {
        accessToken: '',
        expiresAt: ''
      };
    }
  }

  _generateUnauthorizedError(err) {
    const error = new Error('Unauthorized');

    if (!err) {
      error.fromSdk = true;
    }

    error.response = {
      data: {
        ...err,
        code: 401
      },
      status: 401
    };

    return error;
  }

  /**
   * Saves a session in local storage for future use
   *
   * @param {Object} sessionInfo
   * @param {string} sessionInfo.accessToken
   * @param {number} sessionInfo.expiresAt
   *
   * @private
   */
  _storeSession({ accessToken, expiresIn }) {
    const expiresAt = expiresIn * 1000 + Date.now();

    this._sessionInfo.accessToken = accessToken;
    this._sessionInfo.expiresAt = expiresAt;

    AsyncStorage.setItem('@accessToken', accessToken);
    // Async storage behavior is undefined for values that aren't strings
    AsyncStorage.setItem('@expiresAt', expiresAt.toString());
  }
}

export const TYPE = 'auth0WebAuthNative';
export default Auth0WebAuthNative;
