---
id: kenml
title: KenML
sidebar_label: KenML
---

KenML is a markup language for describing structured data, meant for the Ken Standard. It's meant to be a compromise between human readability and machine interoperability.

## An Extended TOML Example

```toml
# All files need a config section with a baseId and a resourceId.
[config]
baseId = "samanthas-tools"
resourceId = "workshop"

# You can list aliases for the rest of the document.
# These are document-specific. The @ sign is used to signify the beginning of a base.
[config.aliases]
name = "@base/properties/p-name"
instance-of = "@base/properties/instance-of"
condition = "@toollib/condition"
rebecca = "@rebecca-34/personal/rebecca"
henry = "@henry/personal/henry"
# ...Other aliases omitted

# Headers besides "config" will count as the unique ID for a subject.
# Choose ID names you don't expect to change.
[n-large-hammer]
name = "Large Hammer"
instance-of = "hammer"
condition = "Still quite sturdy. Should be usable for a long time."
# If you give an array of values, this will create one fact per value.
previous-borrowers = ["henry", "rebecca"]

[n-toolkit]
name = "Red Toolkit"
instance-of = "toolkit"
condition = "Old but mostly useful. It would be good to replace at some point."
```
