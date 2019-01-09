---
id: ecosystem
title: Stack Layers
---

The Ken ecosystem can be a lot to understand, so can be split into multiple layers. The layers are ordered by a mix of abstraction and closeness to user interfaces.

![stack](/img/stack.png)

## Standard

The [Ken Standard](/docs/kenStandard/base) is currently quite simple. It will likely expand somewhat as future functionality is requested. In particular, there may eventually be a large set of "value" types. If these extend to varieties of JSON, they can become numerous. Out of all of the stack layers, the Ken Standard is the main one to incoorporate into projects that want to make use of Ken-related tooling.

## Registry

All bases have IDs, but there can be conflicts. It would make sense to have trusted registries of which bases should be titled under which names. This would be similar to the [DNS system](https://en.wikipedia.org/wiki/Domain_Name_System). Currently such a system does not exist for KEN, as there haven't yet been enough bases for this to be an issue.

## Ontology

The ontology layer refers to the collection of Ken knowledge graphs that describe important properties and their relationships. These are be imported by knowledge graphs in the data layer. Currently, the `stdlib base` fulfils this role.

## Data

Data refers to Ken gnowledge graphs that deal primarily with information about the world, rather than ways to describe such information. For instance, the base of "movies made in 2018" would be considered part of the data layer.

## Data Tooling

This refers to software for making it easier to make knowledge graphs and convert them to and from other kinds of data. For instance, libraries that access APIs or web scrapers, and write or read KenML.

## Storage

Currently, only static files with KenML are supported for use with KenJs. We recommend the use of Github or similar tools for authorization and change management. These files can be stored using any system that can store and distribute static files. If you care about file permissions, you may want to use something like Dropbox or Box. If you care more about use in programming, you may want to use [NPM](https://www.npmjs.com).

Systems you may consider for file sharing:

- Dropbox
- Box
- Google Drive
- Keybase File System
- NPM
- BitTorrent
- Dat

KenMl does not include a "site map" equivalent, so it would be difficult to share a base with multiple files directly as a web resource.

In the future, it is possible some Ken knowledge bases can be stored in databases as well.

## Client

The only current client is [kenJs](/docs/kenjs), which provides an interface to Ken data for javascript.

## Presentation

The only current presentation tool is the [Ken Explorer](/docs/kenExplorer). This is mostly for understanding and debugging knowledge bases, but can double for some light direct use. Think of it as a database explorer, rather than frontend.

KenJs can be used directly in other javascript applications to provide knowledge graph functionality where is useful.
