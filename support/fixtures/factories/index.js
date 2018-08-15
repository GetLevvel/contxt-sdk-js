'use strict';

const factory = require('rosie').Factory;

require('./asset');
require('./assetAttribute');
require('./assetAttributeValue');
require('./assetType');
require('./audience');
require('./channel');
require('./contxtOrganization');
require('./contxtUser');
require('./costCenter');
require('./costCenterFacility');
require('./defaultAudiences');
require('./edgeNode');
require('./event');
require('./eventType');
require('./facility');
require('./facilityGrouping');
require('./facilityGroupingFacility');
require('./facilityInfo');
require('./facilityTag');
require('./outputField');
require('./outputFieldData');
require('./organization');
require('./owner');
require('./paginationMetadata');
require('./userProfile');

module.exports = factory;
