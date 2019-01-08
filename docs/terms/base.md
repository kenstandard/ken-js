---
id: base
title: Bases
---

Bases are collections of facts with metadata. Each base has a Base ID. Bases are expected to be generally moderated and maintained by groups of people.

**Simplified Json Example**

```json
{
  "baseId": "exampleBase",
  "privateIds": [
    "examplebase/tools/hammer/_f/MK5yxYv4",
    "examplebase/tools/toolkit/_f/#ZxzB7*fl"
  ],
  "facts": [
    {
      "subjectId": "examplebase/tools/hammer",
      "propertyId": "stdlib/properties/is-instance-of",
      "value": "tool-definitions/properties/hammer",
      "factId": "examplebase/tools/hammer/_f/MK5yxYv4"
    },
    {
      "subjectId": "examplebase/tools/toolkit",
      "propertyId": "stdlib/properties/is-instance-of",
      "value": "tool-definitions/properties/toolkit",
      "factId": "examplebase/tools/toolkit/_f/#ZxzB7*fl"
    }
  ]
}
```

| Key            | Description                                                                                                                                                                                                                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **baseId**     | The baseID should be the name chosen for this base.                                                                                                                                                                                                                                                                                                 |
| **privateIds** | There may be cases where some of the IDs instantiated in a given base were generated randomly. In this case, the base creator could flag these IDs as "private", meaning that they are not recommended to be referenced by other bases. This could also be used for the base creator to signal that others should not use the ID for other reasons. |
| **facts**      | A list of facts contained in the base.                                                                                                                                                                                                                                                                                                              |

Note that the above API is not currently exposed in Ken.Js. Instead, it supports KenML, which translates into a structure that handles the same information.

## Referring to a Base

Base names themselves are not valid kenIDs, and thus cannot be used to describe the bases in facts. If you would like to write facts that describe a base, add them using the kenID `{baseName}/.about`. For example, if the base ID is `tools`, the kenID to refer to it is `tools/.about`.

## Distinguishing Between Bases with the same Base IDs

Currently there is no standard to distinguish two bases that use the same base ID. In the future there could be something similar to the internet [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) system to do this.
