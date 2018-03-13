/**
 * @typedef {Object} Facility
 * @property {string} address1
 * @property {string} address2
 * @property {string} city
 * @property {string} created_at ISO 8601 Extended Format date/time string
 * @property {number} id
 * @property {Object} Info
 * @property {string} name
 * @property {Object} Organization
 * @property {string} Organization.id UUID formatted id
 * @property {string} Organization.name
 * @property {string} Organization.created_at ISO 8601 Extended Format date/time string
 * @property {string} Organization.updated_at ISO 8601 Extended Format date/time string
 * @property {string} state
 * @property {Object[]} tags
 * @property {number} tags[].id
 * @property {number} tags[].facility_id
 * @property {string} tags[].name
 * @property {string} tags[].created_at ISO 8601 Extended Format date/time string
 * @property {string} tags[].updated_at ISO 8601 Extended Format date/time string
 * @property {string} timezone An IANA Time Zone Database string, i.e. America/Los_Angeles
 * @property {number} weather_location_id
 * @property {string} zip US Zip Code
 */

/**
 * Module that provides access to, and the manipulation
 * of, information about different facilities
 *
 * @typicalname contxtSdk.facilities
 */
class Facilities {
  /**
   * @param {Object} sdk An instance of the SDK so the module can communicate with other modules
   * @param {Object} request An instance of the request module tied to this module's audience.
   */
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.facilities.host}/v1`;
    this._request = request;
    this._sdk = sdk;
  }

  /**
   * Gets information about a facility
   *
   * API Endpoint: '/facilities/:facilityId'
   * Method: GET
   *
   * @param {number|string} facilityId The id of the facility
   *
   * @returns {Promise}
   * @fulfill {Facility} Information about a facility
   * @reject {Error}
   *
   * @example
   * contxtSdk.facilities.get(25)
   *   .then((facility) => console.log(facility));
   *   .catch((err) => console.log(err));
   */
  get(facilityId) {
    return this._request.get(`${this._baseUrl}/facilities/${facilityId}`);
  }

  /**
   * Gets a list of all facilities
   *
   * API Endpoint: '/facilities'
   * Method: GET
   *
   * @returns {Promise}
   * @fulfill {Facility[]} Information about all facilities
   * @reject {Error}
   *
   * @example
   * contxtSdk.facilities.getAll()
   *   .then((facilities) => console.log(facilities));
   *   .catch((err) => console.log(err));
   */
  getAll() {
    return this._request.get(`${this._baseUrl}/facilities`);
  }

  /**
   * Gets a list of all facilities that belong to a particular organization
   *
   * API Endpoint: '/organizations/:organizationId/facilities'
   * Method: GET
   *
   * @param {number|string} organizationId
   *
   * @returns {Promise}
   * @fulfill {Facility[]} Information about all facilities
   * @reject {Error}
   *
   * @example
   * contxtSdk.facilities.getAllByOrganizationId(25)
   *   .then((facilities) => console.log(facilities));
   *   .catch((err) => console.log(err));
   */
  getAllByOrganizationId(organizationId) {
    return this._request.get(`${this._baseUrl}/organizations/${organizationId}/facilities`);
  }
}

export default Facilities;
