<a name="Facilities.costCenters"></a>

## Facilities.costCenters
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

### new CostCenters(sdk, request, baseUrl)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>Object</code> | An instance of the SDK so the module can communicate with other modules |
| request | <code>Object</code> | An instance of the request module tied to this module's audience. |
| baseUrl | <code>string</code> | The base URL provided by the parent module |

<a name="Facilities.costCenters+addFacility"></a>

### contxtSdk.facilities.costCenters.addFacility(costCenterId, facilityId) ⇒ <code>Promise</code>
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

### contxtSdk.facilities.costCenters.create(costCenter) ⇒ <code>Promise</code>
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

### contxtSdk.facilities.costCenters.delete(costCenterId) ⇒ <code>Promise</code>
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

### contxtSdk.facilities.costCenters.getAll() ⇒ <code>Promise</code>
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

### contxtSdk.facilities.costCenters.getAllByOrganizationId(organizationId) ⇒ <code>Promise</code>
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

### contxtSdk.facilities.costCenters.removeFacility(costCenterId, facilityId) ⇒ <code>Promise</code>
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

### contxtSdk.facilities.costCenters.update(costCenterId, update) ⇒ <code>Promise</code>
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
