---
id: introduction
title: What & Why
---

> **Ken**, noun: **"the range of perception, understanding, or knowledge"**  
> [(Mariam Webster)](https://www.merriam-webster.com/dictionary/ken)

Ken was created out of a frustration of not having a simple way to organize personal and organizational structured information. Spreadsheets are pretty isolated and databases can take a while to set up. Existing attempts at knowledge graphs have typically been focussed on artificial intelligence and machine interpretability, rather than for information organization by small groups.

## Knowledge Graphs

Knowledge graphs are typically databases of "facts", where facts can be used to declare values for a wide variety of properties and subjects. The most famous knowledge graph is [that from Google](https://en.wikipedia.org/wiki/Knowledge_Graph), which contains billions of facts and is used heavily for search results. [This article](https://hackernoon.com/wtf-is-a-knowledge-graph-a16603a1a25f) on Hackernoon does a good job explaining the basics.

Knowledge graphs are very flexible. Unlike conventional spreadsheets and databases setups, they can be used to declare any arbitrary number of properties. This is great for situations where the data has a lot of variety.

There's a lot of overlapping terminology in this area. Knowledge graphs as described here are also known as [semantic networks](https://en.wikipedia.org/wiki/Semantic_network). The data format can be considered to be what is called [linked data](https://en.wikipedia.org/wiki/Linked_data).

## Related Technologies

### [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page)

Wikidata may currently be the largest and most accessible public knowledge base. It has over 50 Million facts with a moderation policy similar to that of Wikipedia. All data on Wikidata is available on the [CCO License](https://creativecommons.org/publicdomain/zero/1.0/). Wikidata data is very similar in structure to that of Ken, so data should be pretty simple to be transferred between them. Ken low-level bases use much of the same terminology as Wikidata.

### [Wikibase](http://wikiba.se)

Wikibase is the software platform that Wikidata runs on. It's primarily made to support Wikidata, but could be used to set up private knowledge bases. It may be possible to eventually use Wikibase to store information originally in the Ken Standard format. However, it has a few differences from the Ken approach. Wikibase uses a database instead of static storage, and has a built-in moderation system. With Ken the primary storage is static, and moderation is handled with tools like Github pull requests.

### [Google Knowledge Graph](https://en.wikipedia.org/wiki/Knowledge_Graph)

The Google Knowledge Graph may be the largest knowledge graph to date. It's mostly all private, including most implementation details.

### [Schema.org](https://schema.org)

Schema.org is a project aimed at creating open schemas for structured web data, specifically targeting web developers for use for search engine optimization and similar. It has a fairly extensive set of schemas that are mostly focussed on things relevant to websites. Schemas are set up by a [W3C Web Schemas group](https://www.w3.org/wiki/WebSchemas), and it may have the most well structured public schemas for the items it does cover. Ken low-level bases try to stay close to Schema.org schemas, when is relevant.

### [The Resource Description Framework (RDF)](https://en.wikipedia.org/wiki/Resource_Description_Framework)

RDF is a family of specifications that used for making statements using the "subject-predicate-object" format, which can be used for knowledge graphs. RDF data typically focusses on web resources. There are several serialization formats for RDF, including [Turtle](<https://en.wikipedia.org/wiki/Turtle_(syntax)>), [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD), and [N3](https://en.wikipedia.org/wiki/Notation3).

Ken is very much inspired by RDF, but is focussed more on simplicity and human editing, and less on internet resources and machine readability. Ken knowledge graphs should be able to be translated into RDF knowledge graphs, and the ecosystems of both should eventually be able to compliment each other.

### [Graph Databases](https://en.wikipedia.org/wiki/Graph_database)

Graph databases are a specific kind of database that uses graph structures optimized for queries about graph relationships. These may eventually be used to store and query Ken knowledge graphs.
