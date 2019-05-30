import { toCamelCase } from '../utils/objects';

/**
 * @typedef {Object} ContxtUserPermissions
 * @property {number[]} applicationsExplicit Application ids the user has directly been given access to
 * @property {number[]} applicationsImplicit Application ids the user has access to from a role or being the owner
 * @property {string[]} roles Role ids that the user belongs to
 * @property {number[]} stacksExplicit Stack ids the user has directly been given access to
 * @property {number[]} stacksImplicit Stack ids the user has access to from a role or being the owner
 * @property {string} userId
 */

/**
 * Module that provides access to contxt user permissions
 *
 * @typicalname contxtSdk.coordinator.permissions
 */
class Permissions {
  /**
   * @param {Object} sdk An instance of the SDK so the module can communicate with other modules
   * @param {Object} request An instance of the request module tied to this module's audience.
   * @param {string} baseUrl The base URL provided by the parent module
   */
  constructor(sdk, request, baseUrl) {
    this._baseUrl = baseUrl;
    this._request = request;
    this._sdk = sdk;
  }

  /**
   * Gets a list of user permissions for each user in an organization
   *
   * API Endpoint: '/organizations/:organizationId/users/permissions'
   * Method: GET
   *
   * @param {string} organizationId The ID of the organization
   *
   * @returns {Promise}
   * @fulfill {ContxtUserPermissions[]} A collection of user permissions
   * @reject {Error}
   *
   * @example
   * contxtSdk.coordinator.permissions
   *   .getAllByOrganizationId('36b8421a-cc4a-4204-b839-1397374fb16b')
   *   .then((usersPermissions) => console.log(usersPermissions))
   *   .catch((err) => console.log(err));
   */
  getAllByOrganizationId(organizationId) {
    if (!organizationId) {
      return Promise.reject(
        new Error(
          'An organization ID is required for getting users permissions for an organization'
        )
      );
    }

    return this._request
      .get(`${this._baseUrl}/organizations/${organizationId}/users/permissions`)
      .then((userPermissions) => toCamelCase(userPermissions));
  }

  /**
   * Gets a single user's permissions within an organization
   *
   * API Endpoint: '/organizations/:organizationId/users/:userId/permissions'
   * Method: GET
   *
   * @param {string} organizationId The ID of the organization
   * @param {string} userId The ID of the user
   *
   * @returns {Promise}
   * @fulfill {ContxtUserPermissions} A single user's permissions
   * @reject {Error}
   *
   * @example
   * contxtSdk.coordinator.permissions
   *   .getOneByOrganizationId('36b8421a-cc4a-4204-b839-1397374fb16b', 'auth0|12345')
   *   .then((usersPermissions) => console.log(usersPermissions))
   *   .catch((err) => console.log(err));
   */
  getOneByOrganizationId(organizationId, userId) {
    if (!organizationId) {
      return Promise.reject(
        new Error(
          "An organization ID is required for getting a user's permissions for an organization"
        )
      );
    }

    if (!userId) {
      return Promise.reject(
        new Error(
          "A user ID is required for getting a user's permissions for an organization"
        )
      );
    }

    return this._request
      .get(
        `${
          this._baseUrl
        }/organizations/${organizationId}/users/${userId}/permissions`
      )
      .then((userPermissions) => toCamelCase(userPermissions));
  }

  /**
   * Gets a map of permission scopes to which the user has access
   *
   * API Endpoint: '/users/:userId/permissions'
   * Method: GET
   *
   * @param {string} userId The ID of the user
   *
   * @returns {Promise}
   * @fulfill {Object.<string, string[]>} A map of user permissions where the
   *   key corresponds to a service ID (i.e. the ID generated by Auth0) and the
   *   value is an array of permission scopes that are managed by Contxt (e.g.
   *   `read:facilities` and `write:facilities`)
   * @reject {Error}
   *
   * @example
   * contxtSdk.coordinator.permissions
   *   .getByUserId('auth0|12345')
   *   .then((permissionsMap) => console.log(permissionsMap))
   *   .catch((err) => console.log(err));
   */
  getByUserId(userId) {
    if (!userId) {
      return Promise.reject(
        new Error(
          "A user ID is required for getting information about a user's permissions map"
        )
      );
    }

    // NOTE: This response is not run through the `toCamelCase` method because
    // it could errantly remove underscores from service IDs.
    return this._request.get(`${this._baseUrl}/users/${userId}/permissions`);
  }
}

export default Permissions;
