---
id: fact
title: Facts
---

A fact is a combination of a fact ID, subject ID, property ID, and value. The Ken fact format is heavily inspired by [RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework).

**Simplified Json Example**

```json
{
  "subjectId": "examplebase/tools/hammer",
  "propertyId": "stdlib/properties/is-instance-of",
  "value": "tool-definitions/properties/hammer",
  "factId": "examplebase/tools/hammer/_f/MK5yxYv4"
}
```

| Key            | Description                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **subjectId**  | `KenID` of the subject the fact is describing.                                                                                                                                        |
| **propertyId** | The `KenID` of the property. Some common properties are things like `name`, `description`, and `is-instance-of`. Properties are things that are labeled as `instances-of` `property`. |
| **value**      | The value for the given fact. Values could represent any data type. Currently KenJs only supports strings and KenIds as values.                                                       |
| **factId**     | The fact itself has a `KenID`. This allows one to give the fact properties, for instance, to describe its source or truth rating.                                                     |
