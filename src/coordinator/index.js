import EdgeNodes from './edgeNodes';

import {
  formatOrganizationFromServer,
  formatUserFromServer
} from '../utils/coordinator';

/**
 * @typedef {Object} ContxtOrganization
 * @property {string} createdAt ISO 8601 Extended Format date/time string
 * @property {string} id UUID formatted ID
 * @property {number} legacyOrganizationId
 * @property {string} name
 * @property {string} updatedAt ISO 8601 Extended Format date/time string
 */

/**
 * @typedef {Object} ContxtUser
 * @property {string} createdAt ISO 8601 Extended Format date/time string
 * @property {string} email
 * @property {string} firstName
 * @property {string} id
 * @property {boolean} isActivated
 * @property {boolean} isSuperuser
 * @property {string} lastName
 * @property {string} [phoneNumber]
 * @property {string} updatedAt ISO 8601 Extended Format date/time string
 */

/**
 * Module that provides access to information about Contxt
 *
 * @typicalname contxtSdk.coordinator
 */
class Coordinator {
  /**
   * @param {Object} sdk An instance of the SDK so the module can communicate with other modules
   * @param {Object} request An instance of the request module tied to this module's audience.
   */
  constructor(sdk, request) {
    const baseUrl = `${sdk.config.audiences.coordinator.host}/v1`;

    this._baseUrl = baseUrl;
    this._request = request;
    this._sdk = sdk;

    this.edgeNodes = new EdgeNodes(sdk, request, baseUrl);
  }

  /**
   * Gets information about all contxt organizations
   *
   * API Endpoint: '/organizations'
   * Method: GET
   *
   * @returns {Promise}
   * @fulfill {ContxtOrganization[]} Information about all contxt organizations
   * @reject {Error}
   *
   * @example
   * contxtSdk.coordinator
   *   .getAllOrganizations()
   *   .then((orgs) => console.log(orgs))
   *   .catch((err) => console.log(err));
   */
  getAllOrganizations() {
    return this._request
      .get(`${this._baseUrl}/organizations`)
      .then((orgs) => orgs.map(formatOrganizationFromServer));
  }

  /**
   * Gets information about a contxt organization
   *
   * API Endpoint: '/organizations/:organizationId'
   * Method: GET
   *
   * @param {string} organizationId The ID of the organization
   *
   * @returns {Promise}
   * @fulfill {ContxtOrganization} Information about a contxt organization
   * @reject {Error}
   *
   * @example
   * contxtSdk.coordinator
   *   .getOrganizationById('36b8421a-cc4a-4204-b839-1397374fb16b')
   *   .then((org) => console.log(org))
   *   .catch((err) => console.log(err));
   */
  getOrganizationById(organizationId) {
    if (!organizationId) {
      return Promise.reject(
        new Error(
          'An organization ID is required for getting information about an organization'
        )
      );
    }

    return this._request
      .get(`${this._baseUrl}/organizations/${organizationId}`)
      .then((org) => formatOrganizationFromServer(org));
  }

  /**
   * Gets information about a contxt user
   *
   * API Endpoint: '/users/:userId'
   * Method: GET
   *
   * @param {string} userId The ID of the user
   *
   * @returns {Promise}
   * @fulfill {ContxtUser} Information about a contxt user
   * @reject {Error}
   *
   * @example
   * contxtSdk.coordinator
   *   .getUser('auth0|12345')
   *   .then((user) => console.log(user))
   *   .catch((err) => console.log(err));
   */
  getUser(userId) {
    if (!userId) {
      return Promise.reject(
        new Error('A user ID is required for getting information about a user')
      );
    }

    return this._request
      .get(`${this._baseUrl}/users/${userId}`)
      .then((user) => formatUserFromServer(user));
  }
}

export default Coordinator;
