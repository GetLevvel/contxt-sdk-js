<a name="Facilities"></a>

## Facilities
Module that provides access to, and the manipulation
of, information about different facilities

**Kind**: global class  

* [Facilities](#Facilities)
    * [new Facilities(sdk, request)](#new_Facilities_new)
    * _instance_
        * [.create(facility)](#Facilities+create) ⇒ <code>Promise</code>
        * [.createOrUpdateInfo(facilityId, update)](#Facilities+createOrUpdateInfo) ⇒ <code>Promise</code>
        * [.delete(facilityId)](#Facilities+delete) ⇒ <code>Promise</code>
        * [.get(facilityId)](#Facilities+get) ⇒ <code>Promise</code>
        * [.getAll()](#Facilities+getAll) ⇒ <code>Promise</code>
        * [.getAllByOrganizationId(organizationId, [options])](#Facilities+getAllByOrganizationId) ⇒ <code>Promise</code>
        * [.update(facilityId, update)](#Facilities+update) ⇒ <code>Promise</code>
    * _static_
        * [.costCenters](#Facilities.costCenters)
            * [new CostCenters(sdk, request, baseUrl)](#new_Facilities.costCenters_new)
            * [.addFacility(costCenterId, facilityId)](#Facilities.costCenters+addFacility) ⇒ <code>Promise</code>
            * [.create(costCenter)](#Facilities.costCenters+create) ⇒ <code>Promise</code>
            * [.delete(costCenterId)](#Facilities.costCenters+delete) ⇒ <code>Promise</code>
            * [.getAll()](#Facilities.costCenters+getAll) ⇒ <code>Promise</code>
            * [.getAllByOrganizationId(organizationId)](#Facilities.costCenters+getAllByOrganizationId) ⇒ <code>Promise</code>
            * [.removeFacility(costCenterId, facilityId)](#Facilities.costCenters+removeFacility) ⇒ <code>Promise</code>
            * [.update(costCenterId, update)](#Facilities.costCenters+update) ⇒ <code>Promise</code>
        * [.groupings](#Facilities.groupings)
            * [new FacilityGroupings(sdk, request, baseUrl)](#new_Facilities.groupings_new)
            * [.addFacility(facilityGroupingId, facilityId)](#Facilities.groupings+addFacility) ⇒ <code>Promise</code>
            * [.create(facilityGrouping)](#Facilities.groupings+create) ⇒ <code>Promise</code>
            * [.delete(facilityGroupingId)](#Facilities.groupings+delete) ⇒ <code>Promise</code>
            * [.getAll()](#Facilities.groupings+getAll) ⇒ <code>Promise</code>
            * [.getAllByOrganizationId(organizationId)](#Facilities.groupings+getAllByOrganizationId) ⇒ <code>Promise</code>
            * [.removeFacility(facilityGroupingId, facilityId)](#Facilities.groupings+removeFacility) ⇒ <code>Promise</code>
            * [.update(facilityGroupingId, update)](#Facilities.groupings+update) ⇒ <code>Promise</code>

<a name="new_Facilities_new"></a>

### new Facilities(sdk, request)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>Object</code> | An instance of the SDK so the module can communicate with other modules |
| request | <code>Object</code> | An instance of the request module tied to this module's audience. |

<a name="Facilities+create"></a>

### contxtSdk.facilities.create(facility) ⇒ <code>Promise</code>
Creates a new facility

API Endpoint: '/facilities'
Method: POST

**Kind**: instance method of [<code>Facilities</code>](#Facilities)  
**Fulfill**: [<code>Facility</code>](./Typedefs.md#Facility) Information about the new facility  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facility | <code>Object</code> |  |
| [facility.address1] | <code>string</code> |  |
| [facility.address2] | <code>string</code> |  |
| [facility.city] | <code>string</code> |  |
| [facility.geometryId] | <code>string</code> | UUID corresponding with a geometry |
| facility.name | <code>string</code> |  |
| facility.organizationId | <code>string</code> | UUID corresponding with an organization |
| [facility.state] | <code>string</code> |  |
| facility.timezone | <code>string</code> |  |
| [facility.weatherLocationId] | <code>number</code> |  |
| [facility.zip] | <code>string</code> |  |

**Example**  
```js
contxtSdk.facilities
  .create({
    address: '221 B Baker St, London, England',
    name: 'Sherlock Holmes Museum',
    organizationId: 25
  })
  .then((facilities) => console.log(facilities))
  .catch((err) => console.log(err));
```
<a name="Facilities+createOrUpdateInfo"></a>

### contxtSdk.facilities.createOrUpdateInfo(facilityId, update) ⇒ <code>Promise</code>
Creates or updates a facility's info (NOTE: This refers to the facility_info model)

API Endpoint: '/facilities/:facilityId/info?should_update=true'
Method: POST

**Kind**: instance method of [<code>Facilities</code>](#Facilities)  
**Fulfill**: <code>undefined</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facilityId | <code>number</code> | The ID of the facility to update |
| update | <code>Object</code> | An object containing the facility info for the facility |

**Example**  
```js
contxtSdk.facilities.createOrUpdateInfo(25, {
  square_feet: '10000'
});
```
<a name="Facilities+delete"></a>

### contxtSdk.facilities.delete(facilityId) ⇒ <code>Promise</code>
Deletes a facility

API Endpoint: '/facilities/:facilityId'
Method: DELETE

**Kind**: instance method of [<code>Facilities</code>](#Facilities)  
**Fulfill**: <code>undefined</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facilityId | <code>number</code> | The ID of the facility |

**Example**  
```js
contxtSdk.facilities.delete(25);
```
<a name="Facilities+get"></a>

### contxtSdk.facilities.get(facilityId) ⇒ <code>Promise</code>
Gets information about a facility

API Endpoint: '/facilities/:facilityId'
Method: GET

**Kind**: instance method of [<code>Facilities</code>](#Facilities)  
**Fulfill**: [<code>Facility</code>](./Typedefs.md#Facility) Information about a facility  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facilityId | <code>number</code> | The ID of the facility |

**Example**  
```js
contxtSdk.facilities
  .get(25)
  .then((facility) => console.log(facility))
  .catch((err) => console.log(err));
```
<a name="Facilities+getAll"></a>

### contxtSdk.facilities.getAll() ⇒ <code>Promise</code>
Gets a list of all facilities

API Endpoint: '/facilities'
Method: GET

**Kind**: instance method of [<code>Facilities</code>](#Facilities)  
**Fulfill**: <code>Facility[]</code> Information about all facilities  
**Reject**: <code>Error</code>  
**Example**  
```js
contxtSdk.facilities
  .getAll()
  .then((facilities) => console.log(facilities))
  .catch((err) => console.log(err));
```
<a name="Facilities+getAllByOrganizationId"></a>

### contxtSdk.facilities.getAllByOrganizationId(organizationId, [options]) ⇒ <code>Promise</code>
Gets a list of all facilities that belong to a particular organization

API Endpoint: '/organizations/:organizationId/facilities'
Method: GET

**Kind**: instance method of [<code>Facilities</code>](#Facilities)  
**Fulfill**: <code>Facility[]</code> Information about all facilities  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| organizationId | <code>string</code> | UUID corresponding with an organization |
| [options] | <code>object</code> | Object containing parameters to be called with the request |
| [options.includeGroupings] | <code>boolean</code> | Boolean flag for including groupings data with each facility |

**Example**  
```js
contxtSdk.facilities
  .getAllByOrganizationId(25, { includeGroupings: true })
  .then((facilities) => console.log(facilities))
  .catch((err) => console.log(err));
```
<a name="Facilities+update"></a>

### contxtSdk.facilities.update(facilityId, update) ⇒ <code>Promise</code>
Updates a facility's specifics

API Endpoint: '/facilities/:facilityId'
Method: PUT

**Kind**: instance method of [<code>Facilities</code>](#Facilities)  
**Fulfill**: <code>undefined</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facilityId | <code>number</code> | The ID of the facility to update |
| update | <code>Object</code> | An object containing the updated data for the facility |
| [update.address1] | <code>string</code> |  |
| [update.address2] | <code>string</code> |  |
| [update.city] | <code>string</code> |  |
| [update.geometryId] | <code>string</code> | UUID corresponding with a geometry |
| [update.info] | <code>Object</code> | User declared information |
| [update.name] | <code>string</code> |  |
| [update.organizationId] | <code>string</code> | UUID corresponding with an organization |
| [update.state] | <code>string</code> |  |
| [update.timezone] | <code>string</code> |  |
| [update.weatherLocationId] | <code>number</code> |  |
| [update.zip] | <code>string</code> |  |

**Example**  
```js
contxtSdk.facilities.update(25, {
  address: '221 B Baker St, London, England',
  name: 'Sherlock Homes Museum',
  organizationId: 25
});
```
<a name="Facilities.costCenters"></a>

### Facilities.costCenters
Module that provides access to cost centers, and helps manage
the relationship between those cost centers and facilities

**Kind**: static class of [<code>Facilities</code>](#Facilities)  

* [.costCenters](#Facilities.costCenters)
    * [new CostCenters(sdk, request, baseUrl)](#new_Facilities.costCenters_new)
    * [.addFacility(costCenterId, facilityId)](#Facilities.costCenters+addFacility) ⇒ <code>Promise</code>
    * [.create(costCenter)](#Facilities.costCenters+create) ⇒ <code>Promise</code>
    * [.delete(costCenterId)](#Facilities.costCenters+delete) ⇒ <code>Promise</code>
    * [.getAll()](#Facilities.costCenters+getAll) ⇒ <code>Promise</code>
    * [.getAllByOrganizationId(organizationId)](#Facilities.costCenters+getAllByOrganizationId) ⇒ <code>Promise</code>
    * [.removeFacility(costCenterId, facilityId)](#Facilities.costCenters+removeFacility) ⇒ <code>Promise</code>
    * [.update(costCenterId, update)](#Facilities.costCenters+update) ⇒ <code>Promise</code>

<a name="new_Facilities.costCenters_new"></a>

#### new CostCenters(sdk, request, baseUrl)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>Object</code> | An instance of the SDK so the module can communicate with other modules |
| request | <code>Object</code> | An instance of the request module tied to this module's audience. |
| baseUrl | <code>string</code> | The base URL provided by the parent module |

<a name="Facilities.costCenters+addFacility"></a>

#### contxtSdk.facilities.costCenters.addFacility(costCenterId, facilityId) ⇒ <code>Promise</code>
Adds a facility to a cost center

API Endpoint: '/costcenters/:costCenterId/facility/:facilityId'
Method: POST

**Kind**: instance method of [<code>costCenters</code>](#Facilities.costCenters)  
**Fulfill**: [<code>CostCenterFacility</code>](./Typedefs.md#CostCenterFacility) Information about the new cost center facility relationship  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| costCenterId | <code>string</code> | UUID corresponding with a cost center |
| facilityId | <code>number</code> | The ID of a facility |

**Example**  
```js
contxtSdk.facilities.costCenters
  .addFacility('b3dbaae3-25dd-475b-80dc-66296630a8d0', 4)
  .then((costCenter) => console.log(costCenter))
  .catch((err) => console.log(err));
```
<a name="Facilities.costCenters+create"></a>

#### contxtSdk.facilities.costCenters.create(costCenter) ⇒ <code>Promise</code>
Creates a new cost center

API Endpoint: '/costcenters'
Method: POST

**Kind**: instance method of [<code>costCenters</code>](#Facilities.costCenters)  
**Fulfill**: [<code>CostCenter</code>](./Typedefs.md#CostCenter) Information about the new cost center  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| costCenter | <code>Object</code> |  |
| [costCenter.description] | <code>string</code> |  |
| costCenter.name | <code>string</code> |  |
| costCenter.organizationId | <code>string</code> | UUID |

**Example**  
```js
contxtSdk.facilities.costCenters
  .create({
    decsription: 'Cost center number 1',
    name: 'North Carolina, USA',
    organizationId: '61f5fe1d-d202-4ae7-af76-8f37f5bbeec5'
  })
  .then((costCenter) => console.log(costCenter))
  .catch((err) => console.log(err));
```
<a name="Facilities.costCenters+delete"></a>

#### contxtSdk.facilities.costCenters.delete(costCenterId) ⇒ <code>Promise</code>
Delete a cost center

API Endpoint: '/costcenters/:costCenterId'
Method: DELETE

**Kind**: instance method of [<code>costCenters</code>](#Facilities.costCenters)  
**Fulfill**: <code>undefined</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| costCenterId | <code>string</code> | The ID of the cost center (formatted as a UUID) |

**Example**  
```js
contxtSdk.facilities.costCenters.delete(
  'e4fec739-56aa-4b50-8dab-e9d6b9c91a5d'
);
```
<a name="Facilities.costCenters+getAll"></a>

#### contxtSdk.facilities.costCenters.getAll() ⇒ <code>Promise</code>
Get a listing of all cost centers

API Endpoint: '/costcenters'
METHOD: GET

**Kind**: instance method of [<code>costCenters</code>](#Facilities.costCenters)  
**Fulfill**: <code>CostCenter[]</code>  
**Reject**: <code>Error</code>  
**Example**  
```js
contxtSdk.facilities.costCenters
  .getAll()
  .then((costCenters) => console.log(costCenters))
  .catch((err) => console.log(err));
```
<a name="Facilities.costCenters+getAllByOrganizationId"></a>

#### contxtSdk.facilities.costCenters.getAllByOrganizationId(organizationId) ⇒ <code>Promise</code>
Get a listing of all cost centers for an organization

API Endpoint: '/organizations/:organizationId/costcenters'
METHOD: GET

**Kind**: instance method of [<code>costCenters</code>](#Facilities.costCenters)  
**Fulfill**: <code>CostCenter[]</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| organizationId | <code>string</code> | The ID of the organization (formatted as a UUID) |

**Example**  
```js
contxtSdk.facilities.costCenters
  .getAllByOrganizationId('59270c25-4de9-4b22-8e0b-ab287ac344ce')
  .then((costCenters) => console.log(costCenters))
  .catch((err) => console.log(err));
```
<a name="Facilities.costCenters+removeFacility"></a>

#### contxtSdk.facilities.costCenters.removeFacility(costCenterId, facilityId) ⇒ <code>Promise</code>
Removes a facility from a cost center

API Endpoint: '/costcenters/:costCenterId/facility/:facilityId'
Method: DELETE

**Kind**: instance method of [<code>costCenters</code>](#Facilities.costCenters)  
**Fulfill**: <code>undefined</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| costCenterId | <code>string</code> | UUID corresponding with a cost center |
| facilityId | <code>number</code> | ID corresponding with the facility |

**Example**  
```js
contxtSdk.facilities.costCenters
  .removeFacility('b3dbaae3-25dd-475b-80dc-66296630a8d0', 4)
  .catch((err) => console.log(err));
```
<a name="Facilities.costCenters+update"></a>

#### contxtSdk.facilities.costCenters.update(costCenterId, update) ⇒ <code>Promise</code>
Updates an existing cost center

API Endpoint: '/costcenters/:costCenterId'
Method: PUT

**Kind**: instance method of [<code>costCenters</code>](#Facilities.costCenters)  
**Fulfill**: [<code>FacilityGrouping</code>](./Typedefs.md#FacilityGrouping) Information about the updated cost center  
**Reject**: <code>Error</code>  

| Param | Type |
| --- | --- |
| costCenterId | <code>String</code> | 
| update | <code>Object</code> | 
| [update.description] | <code>string</code> | 
| [update.name] | <code>string</code> | 

**Example**  
```js
contxtSdk.facilities.costCenters
  .update({
    description: 'Refrigeration compressors throughout the facility',
    name: 'Compressors',
  })
  .then((costCenter) => console.log(costCenter))
  .catch((err) => console.log(err));
```
<a name="Facilities.groupings"></a>

### Facilities.groupings
Module that provides access to facility groupings, and helps manage
the relationship between those groupings and facilities

**Kind**: static class of [<code>Facilities</code>](#Facilities)  

* [.groupings](#Facilities.groupings)
    * [new FacilityGroupings(sdk, request, baseUrl)](#new_Facilities.groupings_new)
    * [.addFacility(facilityGroupingId, facilityId)](#Facilities.groupings+addFacility) ⇒ <code>Promise</code>
    * [.create(facilityGrouping)](#Facilities.groupings+create) ⇒ <code>Promise</code>
    * [.delete(facilityGroupingId)](#Facilities.groupings+delete) ⇒ <code>Promise</code>
    * [.getAll()](#Facilities.groupings+getAll) ⇒ <code>Promise</code>
    * [.getAllByOrganizationId(organizationId)](#Facilities.groupings+getAllByOrganizationId) ⇒ <code>Promise</code>
    * [.removeFacility(facilityGroupingId, facilityId)](#Facilities.groupings+removeFacility) ⇒ <code>Promise</code>
    * [.update(facilityGroupingId, update)](#Facilities.groupings+update) ⇒ <code>Promise</code>

<a name="new_Facilities.groupings_new"></a>

#### new FacilityGroupings(sdk, request, baseUrl)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>Object</code> | An instance of the SDK so the module can communicate with other modules |
| request | <code>Object</code> | An instance of the request module tied to this module's audience. |
| baseUrl | <code>string</code> | The base URL provided by the parent module |

<a name="Facilities.groupings+addFacility"></a>

#### contxtSdk.facilities.groupings.addFacility(facilityGroupingId, facilityId) ⇒ <code>Promise</code>
Adds a facility to a facility grouping

API Endpoint: '/groupings/:facilityGroupingId/facilities/:facilityId'
Method: POST

**Kind**: instance method of [<code>groupings</code>](#Facilities.groupings)  
**Fulfill**: [<code>FacilityGroupingFacility</code>](./Typedefs.md#FacilityGroupingFacility) Information about the new facility/grouping relationship  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facilityGroupingId | <code>string</code> | UUID corresponding with a facility grouping |
| facilityId | <code>number</code> |  |

**Example**  
```js
contxtSdk.facilities.groupings
  .addFacility('b3dbaae3-25dd-475b-80dc-66296630a8d0', 4)
  .then((grouping) => console.log(grouping))
  .catch((err) => console.log(err));
```
<a name="Facilities.groupings+create"></a>

#### contxtSdk.facilities.groupings.create(facilityGrouping) ⇒ <code>Promise</code>
Creates a new facility grouping

API Endpoint: '/groupings'
Method: POST

**Kind**: instance method of [<code>groupings</code>](#Facilities.groupings)  
**Fulfill**: [<code>FacilityGrouping</code>](./Typedefs.md#FacilityGrouping) Information about the new facility grouping  
**Reject**: <code>Error</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| facilityGrouping | <code>Object</code> |  |  |
| [facilityGrouping.description] | <code>string</code> |  |  |
| [facilityGrouping.isPrivate] | <code>boolean</code> | <code>false</code> |  |
| facilityGrouping.name | <code>string</code> |  |  |
| facilityGrouping.organizationId | <code>string</code> |  | UUID |
| [facilityGrouping.parentGroupingId] | <code>string</code> |  | UUID |

**Example**  
```js
contxtSdk.facilities.groupings
  .create({
    description: 'US States of CT, MA, ME, NH, RI, VT',
    isPrivate: false,
    name: 'New England, USA',
    organizationId: '61f5fe1d-d202-4ae7-af76-8f37f5bbeec5',
    parentGroupingId: 'e9f8f89c-609c-4c83-8ebc-cea928af661e'
  })
  .then((grouping) => console.log(grouping))
  .catch((err) => console.log(err));
```
<a name="Facilities.groupings+delete"></a>

#### contxtSdk.facilities.groupings.delete(facilityGroupingId) ⇒ <code>Promise</code>
Delete a facility groupings

API Endpoint: '/groupings/:facilityGroupingId'
Method: DELETE

**Kind**: instance method of [<code>groupings</code>](#Facilities.groupings)  
**Fulfill**: <code>undefined</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facilityGroupingId | <code>string</code> | The id of the facility grouping (formatted as a UUID) |

**Example**  
```js
contxtSdk.facilities.groupings.delete(
  'e4fec739-56aa-4b50-8dab-e9d6b9c91a5d'
);
```
<a name="Facilities.groupings+getAll"></a>

#### contxtSdk.facilities.groupings.getAll() ⇒ <code>Promise</code>
Get a listing of all facility groupings available to a user. Includes public groupings across
any organization the user has access to and the user's private groupings.

API Endpoint: '/groupings'
Method: GET

**Kind**: instance method of [<code>groupings</code>](#Facilities.groupings)  
**Fulfill**: <code>FacilityGrouping[]</code>  
**Reject**: <code>Error</code>  
**Example**  
```js
contxtSdk.facilites.groupings
  .getAll()
  .then((groupings) => console.log(groupings))
  .catch((err) => console.log(err));
```
<a name="Facilities.groupings+getAllByOrganizationId"></a>

#### contxtSdk.facilities.groupings.getAllByOrganizationId(organizationId) ⇒ <code>Promise</code>
Get a listing of all facility groupings for an organization. Includes public groupings
across that specific organization and the user's private groupings for that organization.

API Endpoint: '/organizations/:organizationId/groupings'
Method: GET

**Kind**: instance method of [<code>groupings</code>](#Facilities.groupings)  
**Fulfill**: <code>FacilityGrouping[]</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| organizationId | <code>string</code> | UUID corresponding with an organization |

**Example**  
```js
contxtSdk.facilites.groupings
  .getAllByOrganizationId('349dbd36-5dca-4a10-b54d-d0f71c3c8709')
  .then((groupings) => console.log(groupings))
  .catch((err) => console.log(err));
```
<a name="Facilities.groupings+removeFacility"></a>

#### contxtSdk.facilities.groupings.removeFacility(facilityGroupingId, facilityId) ⇒ <code>Promise</code>
Removes a facility from a facility grouping

API Endpoint: '/groupings/:facilityGroupingId/facilities/:facilityId'
Method: DELETE

**Kind**: instance method of [<code>groupings</code>](#Facilities.groupings)  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facilityGroupingId | <code>string</code> | UUID corresponding with a facility grouping |
| facilityId | <code>number</code> |  |

**Example**  
```js
contxtSdk.facilities.groupings
  .removeFacility('b3dbaae3-25dd-475b-80dc-66296630a8d0', 4)
  .catch((err) => console.log(err));
```
<a name="Facilities.groupings+update"></a>

#### contxtSdk.facilities.groupings.update(facilityGroupingId, update) ⇒ <code>Promise</code>
Updates an existing facility grouping

API Endpoint: '/groupings/:facilityGroupingId'
Method: PUT

**Kind**: instance method of [<code>groupings</code>](#Facilities.groupings)  
**Fulfill**: [<code>FacilityGrouping</code>](./Typedefs.md#FacilityGrouping) Information about the updated facility grouping  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| facilityGroupingId | <code>String</code> |  |
| update | <code>Object</code> |  |
| [update.description] | <code>string</code> |  |
| [update.isPrivate] | <code>boolean</code> |  |
| [update.name] | <code>string</code> |  |
| [update.parentGroupingId] | <code>string</code> | UUID corresponding with another facility grouping |

**Example**  
```js
contxtSdk.facilities.groupings
  .update({
    description: 'US States of CT, MA, ME, NH, RI, VT',
    isPrivate: false,
    name: 'New England, USA',
    parentGroupingId: 'e9f8f89c-609c-4c83-8ebc-cea928af661e'
  })
  .then((grouping) => console.log(grouping))
  .catch((err) => console.log(err));
```
