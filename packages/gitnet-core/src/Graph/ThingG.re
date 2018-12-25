open Rationale.Function.Infix;
open Rationale;
open Base;
open Thing;

type t = thing;

let unpackOptionList = (e: list(option('a))) =>
  e |> List.filter(Option.isSome) |> List.map(Option.toExn("mistake"));

let allFacts = graph ||> Graph.facts;
let filterFacts = (f: (string, list(fact)) => list(fact), t: t) =>
  f(id(t), allFacts(t));

let facts = filterFacts(Fact.Filters.withIdAsAnyEdge);
let isEdgeForFacts = edge => filterFacts(Fact.Filters.withEdge(edge));

[@genType]
let isSubjectForFacts = filterFacts(Fact.Filters.withEdge(SUBJECT));
[@genType]
let isPropertyForFacts = filterFacts(Fact.Filters.withEdge(PROPERTY));
[@genType]
let isValueForFacts = filterFacts(Fact.Filters.withEdge(VALUE));
[@genType]
[@genType]
/* let  = filterFacts(Fact.Filters.withEdge(VALUE)); */
/* This doesn't apply if this thing is the value! */
let filterFactsAndSelectThings = (fromEdge, toEdge, t: t) =>
  t
  |> filterFacts(Fact.Filters.withEdge(fromEdge))
  |> List.map(Graph.findThingFromFact(t.graph, toEdge))
  |> unpackOptionList;

let connectedPropertyThings = filterFactsAndSelectThings(SUBJECT, PROPERTY);
let connectedSubjectThings = filterFactsAndSelectThings(PROPERTY, SUBJECT);

let connectedPropertyWithId = (id: string, t: t) =>
  connectedPropertyThings(t) |> Thing.find(id);

let connectedSubjectWithId = (id: string, t: t) =>
  connectedSubjectThings(t) |> Thing.find(id);

[@genType]
let propertyValues = (propertyId: string, t: t) =>
  t
  |> isSubjectForFacts
  |> Fact.Filters.withProperty(propertyId)
  |> List.map(Fact.T.value);