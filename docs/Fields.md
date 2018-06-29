<a name="Iot.fields"></a>

## Iot.fields
Module that provides access to field information

**Kind**: static class of [<code>Iot</code>](#Iot)  

* [.fields](#Iot.fields)
    * [new Fields(sdk, request, baseUrl)](#new_Iot.fields_new)
    * [.get(outputFieldId)](#Iot.fields+get) ⇒ <code>Promise</code>

<a name="new_Iot.fields_new"></a>

### new Fields(sdk, request, baseUrl)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>Object</code> | An instance of the SDK so the module can communicate   with other modules |
| request | <code>Object</code> | An instance of the request module tied to this   module's audience |
| baseUrl | <code>string</code> | The base URL provided by the parent module |

<a name="Iot.fields+get"></a>

### contxtSdk.iot.fields.get(outputFieldId) ⇒ <code>Promise</code>
Gets information about a field

API Endpoint: '/fields/:fieldId'
Method: GET

**Kind**: instance method of [<code>fields</code>](#Iot.fields)  
**Fulfill**: [<code>OutputField</code>](./Typedefs.md#OutputField) Information about the output field  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| outputFieldId | <code>Number</code> | The ID of an output field |

**Example**  
```js
contxtSdk.iot.fields
  .get(563)
  .then((outputField) => console.log(outputField))
  .catch((err) => console.log(err));
```
