open Rationale;
open Graph_T.T;
open Graph_T;

type factList = Graph_Fact_Filters.t;

type t = {
  graph: Graph_T.T.t,
  list: factList,
  thing,
};

let init = (g: Graph_T.T.t, t: Graph_T.T.thing): t => {
  graph: g,
  list: g |> Graph_T.F.factList,
  thing: t,
};

module Internal = {
  let findFromList = (id, t) =>
    t |> List.find(e => e.thingId.thingIdString == id);

  let unpackOptionList = (e: list(option('a))) =>
    e |> List.filter(Option.isSome) |> List.map(Option.toExn("mistake"));

  let filterFacts = (t: t, filter: (string, factList) => factList) => {
    ...t,
    list: filter(Thing.id(t.thing), t.list),
  };

  let facts = g => filterFacts(g, Graph_Fact_Filters.withIdAsAnyEdge);

  let isEdgeForFacts = (g, edge) =>
    filterFacts(g, Graph_Fact_Filters.withEdge(edge));

  let filterFactsAndSelectThings = (t: t, fromEdge, toEdge) =>
    filterFacts(t, Graph_Fact_Filters.withEdge(fromEdge))
    |> (e => e.list)
    |> List.map(Graph_Graph.findThingFromFact(t.graph, toEdge))
    |> unpackOptionList;
  let connectedPropertyThings = (t: t) =>
    filterFactsAndSelectThings(t, SUBJECT, PROPERTY);

  let connectedSubjectThings = (t: t) =>
    filterFactsAndSelectThings(t, PROPERTY, SUBJECT);

  let connectedPropertyWithId = (id: string, t: t) =>
    connectedPropertyThings(t) |> findFromList(id);

  let connectedSubjectWithId = (id: string, t: t) =>
    connectedSubjectThings(t) |> findFromList(id);
};