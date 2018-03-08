<a name="Audience"></a>

## Audience : <code>Object</code>
A single audience used for authenticating and communicating with an individual API.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| config.clientId | <code>string</code> | Client Id provided by Auth0 for the environment you are   trying to communicate with |
| config.host | <code>string</code> | Hostname for the API that corresponds with the clientId provided |

<a name="Auth0WebAuthSessionInfo"></a>

## Auth0WebAuthSessionInfo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| accessToken | <code>string</code> | 
| apiToken | <code>string</code> | 
| expiresAt | <code>number</code> | 

<a name="CustomAudience"></a>

## CustomAudience : <code>Object</code>
A custom audience that will override the configuration of an individual module. Consists of
either a reference to an environment that already exists or a clientId and host for a
custom environment.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| [config.clientId] | <code>string</code> | Client Id provided by Auth0 for the environment you are   trying to communicate with |
| [config.env] | <code>string</code> | The SDK provided environment name you are trying to reach |
| [config.host] | <code>string</code> | Hostname for the API that corresponds with the clientId provided |

<a name="Environments"></a>

## Environments : <code>Object.&lt;string, Audience&gt;</code>
An object of audiences that corresponds to all the different environments available for a
single module.

**Kind**: global typedef  
<a name="ExternalModule"></a>

## ExternalModule : <code>Object</code>
An external module to be integrated into the SDK as a first class citizen. Includes information
for authenticating and communicating with an individual API and the external module itself.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| config.clientId | <code>string</code> | Client Id provided by Auth0 for the environment you are   trying to communicate with |
| config.host | <code>string</code> | Hostname for the API that corresponds with the clientId provided |
| config.module | <code>function</code> | The module that will be decorated into the SDK |

<a name="Facility"></a>

## Facility : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| address1 | <code>string</code> |  |
| address2 | <code>string</code> |  |
| city | <code>string</code> |  |
| created_at | <code>string</code> | ISO 8601 Extended Format date/time string |
| id | <code>number</code> |  |
| Info | <code>Object</code> |  |
| name | <code>string</code> |  |
| Organization | <code>Object</code> |  |
| Organization.id | <code>string</code> | UUID formatted id |
| Organization.name | <code>string</code> |  |
| Organization.created_at | <code>string</code> | ISO 8601 Extended Format date/time string |
| Organization.updated_at | <code>string</code> | ISO 8601 Extended Format date/time string |
| state | <code>string</code> |  |
| tags | <code>Array.&lt;Object&gt;</code> |  |
| tags[].id | <code>number</code> |  |
| tags[].facility_id | <code>number</code> |  |
| tags[].name | <code>string</code> |  |
| tags[].created_at | <code>string</code> | ISO 8601 Extended Format date/time string |
| tags[].updated_at | <code>string</code> | ISO 8601 Extended Format date/time string |
| timezone | <code>string</code> | An IANA Time Zone Database string, i.e. America/Los_Angeles |
| weather_location_id | <code>number</code> |  |
| zip | <code>string</code> | US Zip Code |

<a name="MachineAuthSessionInfo"></a>

## MachineAuthSessionInfo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| apiToken | <code>string</code> | 
| expiresAt | <code>number</code> | 

<a name="SessionType"></a>

## SessionType : <code>Object</code>
An adapter that allows the SDK to authenticate with different services and manage various tokens.
Can authenticate with a service like Auth0 and then with Contxt or can communicate directly
with Contxt. The adapter must implement required methods, but most methods are optional. Some of
the optional methods are documented below.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [getCurrentAccessToken] | <code>function</code> | Provides a current access token from Auth0 that is   used for profile information and can be used to get API token for Contxt itself |
| getCurrentApiToken | <code>function</code> | Provides a current API token that is used across   different Contxt services |
| [getProfile] | <code>function</code> | Provides profile information about the current user |
| [handleAuthentication] | <code>function</code> | Is called by front-end code in the Auth0 reference  implementation to handle getting the access token from Auth0 |
| isAuthenticated | <code>function</code> | Tells caller if the current user is authenticated. |
| [logIn] | <code>function</code> | Is used by front-end code in the Auth0 reference implementation to   start the sign in process |
| [logOut] | <code>function</code> | Is used by the front-end code in the Auth0 reference implementation   to sign the user out |

<a name="UserConfig"></a>

## UserConfig : <code>Object</code>
User provided configuration options

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| auth | <code>Object</code> |  | User assigned configurations specific for their authentication methods |
| [auth.authorizationPath] | <code>string</code> |  | Path Auth0WebAuth process should redirect to after a   successful sign in attempt |
| auth.clientId | <code>string</code> |  | Client Id provided by Auth0 for this application |
| [auth.clientSecret] | <code>string</code> |  | Client secret provided by Auth0 for this application |
| [auth.customModuleConfigs] | <code>Object.&lt;string, CustomAudience&gt;</code> |  | Custom environment setups   for individual modules. Requires clientId/host or env |
| [auth.env] | <code>string</code> | <code>&quot;&#x27;production&#x27;&quot;</code> | The environment that every module should use for   their clientId and host |
| [auth.onRedirect] | <code>function</code> | <code>(pathname) &#x3D;&gt; { window.location &#x3D; pathname; }</code> | A redirect   method used for navigating through Auth0 callbacks in Web applications |
| [auth.tokenExpiresAtBufferMs] | <code>number</code> | <code>300000</code> | The time (in milliseconds) before a   token truly expires that we consider it expired (i.e. the token's expiresAt - this = calculated   expiresAt). Defaults to 5 minutes. |

<a name="UserProfile"></a>

## UserProfile : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| nickname | <code>string</code> |  |
| picture | <code>string</code> | URL to an avatar |
| sub | <code>string</code> | The Subject Claim of the user's JWT |
| updated_at | <code>string</code> | ISO 8601 Extended Format date/time string |
