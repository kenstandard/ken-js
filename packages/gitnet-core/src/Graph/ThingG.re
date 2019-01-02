open Rationale.Function.Infix;
open Rationale;
open PrimaryGraph;
open Thing;

type t = thing;

let findFromList = (id, t) =>
  t |> List.find(e => e.thingId.thingIdString == id);

let unpackOptionList = (e: list(option('a))) =>
  e |> List.filter(Option.isSome) |> List.map(Option.toExn("mistake"));

let allFacts = Graph.facts;
let allFactsList = allFacts ||> Js.Dict.values ||> Array.to_list;

let filterFacts =
    (g: PrimaryGraph.graph, f: (string, list(fact)) => list(fact), t: t) =>
  f(id(t), allFactsList(g));

let facts = g => filterFacts(g, Fact.Filters.withIdAsAnyEdge);

let isEdgeForFacts = (g, edge) =>
  filterFacts(g, Fact.Filters.withEdge(edge));

let filterFactsAndSelectThings = (g, fromEdge, toEdge, t: t) =>
  t
  |> filterFacts(g, Fact.Filters.withEdge(fromEdge))
  |> List.map(Graph.findThingFromFact(g, toEdge))
  |> unpackOptionList;

let connectedPropertyThings = g =>
  filterFactsAndSelectThings(g, SUBJECT, PROPERTY);

let connectedSubjectThings = g =>
  filterFactsAndSelectThings(g, PROPERTY, SUBJECT);

let connectedPropertyWithId = (g, id: string, t: t) =>
  connectedPropertyThings(g, t) |> findFromList(id);

let connectedSubjectWithId = (g, id: string, t: t) =>
  connectedSubjectThings(g, t) |> findFromList(id);