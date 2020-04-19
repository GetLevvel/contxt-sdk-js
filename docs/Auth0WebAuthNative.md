<a name="Auth0WebAuthNative"></a>

## Auth0WebAuthNative : [<code>SessionType</code>](./Typedefs.md#SessionType)
A SessionType that allows the user to initially authenticate with Auth0 and then gain a valid JWT
from the Contxt Auth service. This would only be used in web applications. You will need to
integrate this module's `logIn`, `logOut`, and `handleAuthentication` methods with your UI
elements. `logIn` would be tied to a UI element to log the user in. `logOut` would be tied to a
UI element to log the user out. `handleAuthentication` would be tied with your application's
router and would be called when visting the route defined by `config.authorizationPath` (the
default is `/callback`).

This SessionType is set up to refresh auth tokens automatically. To ensure this works, make sure
your single page application has [Cross-Origin Authentication](https://auth0.com/docs/cross-origin-authentication#configure-your-application-for-cross-origin-authentication)
enabled in Auth0.

*NOTE*: The web origin added in auth0 should be something like
"http://localhost:5000", not "http://localhost:5000/callback"

**Kind**: global class  

* [Auth0WebAuthNative](#Auth0WebAuthNative) : [<code>SessionType</code>](./Typedefs.md#SessionType)
    * [new Auth0WebAuthNative(sdk)](#new_Auth0WebAuthNative_new)
    * [.clearCurrentApiToken(audienceName)](#Auth0WebAuthNative+clearCurrentApiToken) ⇒ <code>Promise</code>
    * [.getCurrentAccessToken()](#Auth0WebAuthNative+getCurrentAccessToken) ⇒ <code>Promise</code>
    * [.getCurrentApiToken(audienceName)](#Auth0WebAuthNative+getCurrentApiToken) ⇒ <code>Promise</code>
    * [.getProfile()](#Auth0WebAuthNative+getProfile) ⇒ <code>Promise</code>
    * [.handleAuthentication()](#Auth0WebAuthNative+handleAuthentication) ⇒ <code>Promise</code>
    * [.isAuthenticated()](#Auth0WebAuthNative+isAuthenticated) ⇒ <code>boolean</code>
    * [.logIn(options)](#Auth0WebAuthNative+logIn)
    * [.logOut()](#Auth0WebAuthNative+logOut)

<a name="new_Auth0WebAuthNative_new"></a>

### new Auth0WebAuthNative(sdk)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>Object</code> | An instance of the SDK so the module can communicate with other modules |
| sdk.audiences | <code>Object</code> |  |
| sdk.audiences.contxtAuth | <code>Object</code> |  |
| sdk.audiences.contxtAuth.clientId | <code>string</code> | The Auth0 client id of the   Contxt Auth environment |
| sdk.config | <code>Object</code> |  |
| sdk.config.auth | <code>Object</code> |  |
| sdk.config.auth.authorizationPath | <code>string</code> | Path that is called by Auth0 after   successfully authenticating |
| sdk.config.auth.clientId | <code>string</code> | The Auth0 client id of this application |
| [sdk.config.auth.onRedirect] | <code>function</code> | Redirect method used when navigating between   Auth0 callbacks |

**Example**  
```js
import ContxtSdk from '@ndustrial/contxt-sdk';
import history from '../services/history';

const contxtSdk = new ContxtSdk({
  config: {
    auth: {
      clientId: '<client id>',
      onAuthenticate: (auth0WebAuthSessionInfo) => handleSuccessfulAuth(auth0WebAuthSessionInfo),
      onRedirect: (pathname) => history.push(pathname)
    }
  },
  sessionType: 'auth0WebAuth'
});
```
<a name="Auth0WebAuthNative+clearCurrentApiToken"></a>

### contxtSdk.auth.clearCurrentApiToken(audienceName) ⇒ <code>Promise</code>
Removes an audience's API token from the in-memory token storage

**Kind**: instance method of [<code>Auth0WebAuthNative</code>](#Auth0WebAuthNative)  

| Param |
| --- |
| audienceName | 

<a name="Auth0WebAuthNative+getCurrentAccessToken"></a>

### contxtSdk.auth.getCurrentAccessToken() ⇒ <code>Promise</code>
Gets the current auth0 access token

**Kind**: instance method of [<code>Auth0WebAuthNative</code>](#Auth0WebAuthNative)  
**Fulfills**: <code>string</code> accessToken  
<a name="Auth0WebAuthNative+getCurrentApiToken"></a>

### contxtSdk.auth.getCurrentApiToken(audienceName) ⇒ <code>Promise</code>
Requests an api token from Contxt Auth for the correct audience

**Kind**: instance method of [<code>Auth0WebAuthNative</code>](#Auth0WebAuthNative)  
**Fulfills**: <code>string</code> apiToken  

| Param |
| --- |
| audienceName | 

<a name="Auth0WebAuthNative+getProfile"></a>

### contxtSdk.auth.getProfile() ⇒ <code>Promise</code>
Gets the current user's profile from Auth0

**Kind**: instance method of [<code>Auth0WebAuthNative</code>](#Auth0WebAuthNative)  
**Fulfill**: [<code>UserProfile</code>](./Typedefs.md#UserProfile)  
**Rejects**: <code>Error</code>  
<a name="Auth0WebAuthNative+handleAuthentication"></a>

### contxtSdk.auth.handleAuthentication() ⇒ <code>Promise</code>
Routine that takes unparsed information from Auth0, stores it in a way that
can be used for getting access tokens, schedules its future renewal, and
redirects to the correct page in the application.

**Kind**: instance method of [<code>Auth0WebAuthNative</code>](#Auth0WebAuthNative)  
**Fulfill**: [<code>Auth0WebAuthSessionInfo</code>](./Typedefs.md#Auth0WebAuthSessionInfo)  
**Rejects**: <code>Error</code>  
<a name="Auth0WebAuthNative+isAuthenticated"></a>

### contxtSdk.auth.isAuthenticated() ⇒ <code>boolean</code>
Tells caller if the current user is authenticated.

**Kind**: instance method of [<code>Auth0WebAuthNative</code>](#Auth0WebAuthNative)  
<a name="Auth0WebAuthNative+logIn"></a>

### contxtSdk.auth.logIn(options)
Starts the Auth0 log in process

**Kind**: instance method of [<code>Auth0WebAuthNative</code>](#Auth0WebAuthNative)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.forceLogin] | <code>Boolean</code> | <code>false</code> | When true will bypass any sso settings in the authorization provider |

<a name="Auth0WebAuthNative+logOut"></a>

### contxtSdk.auth.logOut()
Logs the user out by removing any stored session info, clearing any token
renewal, and redirecting to the root

**Kind**: instance method of [<code>Auth0WebAuthNative</code>](#Auth0WebAuthNative)  
