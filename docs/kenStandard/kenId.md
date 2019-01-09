---
id: kenID
title: kenID
---

KenIDs are almost-globally-unique IDs created for readability. They include information the base that describes a thing, as well as its path and local name.

**kenID syntax**

```
kenID = [baseId]/[path]/[name]
```

**kenID examples**

```json
stdlib/properties/p-name
john.smith/things/tools/red-screwdriver
john.smith/things/tools/red-screwdriver/_f/8wj3k
john.smith/.about
john.smith/things/.about
```

## kenID Standard

kenIDs **MUST** contain a base ID followed by a slash, followed by at least one alphanumeric character.  
kenIDs **MUST** not contain multiple slashes next to each other.  
kenIDs **MAY** contain periods as part of the baseID, path, or thing name.  
kenIDs **MAY** contain a path.

## Recommended Naming Conventions

1. When describing a base or directory, use the kenID `{directory}/.about`
2. Facts in a base about subjects in that same base should follow the format `{subjectKenId}/_f/{factId}`. If the factId is not public, then it should be random.
3. Facts in a base about subjects in a different base should follow the format `{directory}/_f/{factId}`, where the directory could be anything that seems reasonable in the base that stores the fact.

## Predictability

It can be good form to have predictable kenIDs. For instance, someone could choose that all books in a specific base will be categorized only by their ISBN numbers (i.e. `books-by-isbn/978-3-16-148410-0`). In this case a base may not have to have any information about a book for other groups to add information about books using that base's naming system.

## Different kenIDs representing the same things

There may be cases where the same semantic thing is described by different kenIDs in different bases. It should be possible to provide translations between these IDs in many of these cases. For example, [Wikidata](https://www.wikidata.org/wiki/Q54819698) and [schema.org](https://schema.org/sameAs) use the sameAs property for this general purpose.

## Similar Tools

### Comparison to URIs/URLs

URIs and URLs are references to specific web resources. Ken is meant for refering to general semantic data; i.e. anything a person can think of. Sometimes there is a one-to-one correspondence between web resources and other things, but this is not always the case. Web naming systems can also change and websites and applications often have turnover, so most URLs can't be expected to last a very long time.

Because all kenIDs refer to the same type of information independent of the medium, the URI `scheme` and the URL file extension are not necessary.

### Comparison to UUID / OIDs

There are multiple existing formats for identifying arbitrary data with globally unique IDs. For instance, [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier) and [OIDs](https://en.wikipedia.org/wiki/Object_identifier). However, the existing options typically aren't optimized for human readability.
