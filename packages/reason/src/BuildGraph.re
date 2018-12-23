open Rationale.Function.Infix;
open Rationale;

type thing = {
  id: string,
  mutable graph,
}
and fact = {
  id: string,
  subjectId: string,
  propertyId: string,
  value: string,
}
and graph = {
  facts: list(fact),
  things: list(thing),
};

type edge =
  | SUBJECT
  | PROPERTY;

let isEqual = (a, b) => a == b;
let isNotEqual = (a, b) => a != b;

module Fact = {
  type t = fact;
  let subjectId = t => t.subjectId;
  let propertyId = t => t.propertyId;
  let edgeId = edge => edge == SUBJECT ? subjectId : propertyId;
  let hasSubjectId = subjectId ||> isEqual;
  let hasPropertyId = propertyId ||> isEqual;
  let value = t => t.value;
  let id = (t: t) => t.id;
};

module Thing = {
  type t = thing;
  let id = e => e.id;
  let graph = e => e.graph;
};

module Query = {
  type condition =
    | IS
    | IS_NOT;

  type t = {
    edge,
    id: string,
    q: condition,
  };

  let run = (q: t, f: fact) => {
    let equality = q.q == IS ? isEqual(q.id) : isNotEqual(q.id);
    switch (q.edge) {
    | SUBJECT => equality(f.subjectId)
    | PROPERTY => equality(f.propertyId)
    };
  };

  let qOr = (q1: t, q2: t, f: fact) => run(q1, f) || run(q2, f);
  let qAnd = (q1: t, q2: t, f: fact) => run(q1, f) && run(q2, f);
};

module FactFilters = {
  type t = list(fact);
  let query = (q: Query.t, t) => t |> List.filter(Query.run(q));
  let find = (id, t) => t |> RList.find((e: fact) => e.id == id);
  let filter = List.filter;

  let withEdge = (edge, id) => filter(Query.run({edge, q: Query.IS, id}));

  let withoutEdge = (edge, id) =>
    filter(Query.run({edge, q: Query.IS_NOT, id}));

  let withSubject = id =>
    filter(Query.run({edge: SUBJECT, q: Query.IS, id}));

  let withoutSubject = id =>
    filter(Query.run({edge: SUBJECT, q: Query.IS_NOT, id}));

  let withProperty = id =>
    filter(Query.run({edge: PROPERTY, q: Query.IS, id}));

  let withoutProperty = id =>
    filter(Query.run({edge: PROPERTY, q: Query.IS_NOT, id}));

  let withIdAsAnyEdge = id =>
    filter(
      Query.qOr(
        {edge: PROPERTY, q: Query.IS, id},
        {edge: PROPERTY, q: Query.IS, id},
      ),
    );

  let withIdAsNoEdge = id =>
    filter(
      Query.qOr(
        {edge: PROPERTY, q: Query.IS_NOT, id},
        {edge: PROPERTY, q: Query.IS_NOT, id},
      ),
    );
};

module ThingFilters = {
  type t = list(thing);
  let find = (id, t) => t |> RList.find((e: thing) => e.id == id);
};

module Graph = {
  type t = graph;
  let build = () => {
    let ffacts = [("0", "1", "2", "sdfsdf"), ("8", "1", "3", "bar")];
    let nodes = ["1", "2", "3"];
    let empty = {things: [], facts: []};
    let things = nodes |> List.map(e => {id: e, graph: empty});
    let facts =
      ffacts
      |> List.map(((a, b, c, d)) =>
           {id: a, subjectId: b, propertyId: c, value: d}
         );
    let graph = {facts, things};
    for (x in 0 to List.length(things)) {
      List.nth(things, x).graph = graph;
    };
    graph;
  };

  let things = g => g.things;
  let facts = g => g.facts;
  let findFact = id => facts ||> FactFilters.find(id);
  let findThing = id => things ||> ThingFilters.find(id);
};

module FactG = {
  type t = fact;
  let findThing = (g: graph, edge: edge, t: t): option(thing) =>
    t |> Fact.edgeId(edge) |> Graph.findThing(_, g);
  /* let query = (g:graph, edge: edge): option(thing) =>
     t |> Fact.edgeId */
};

let unpackOptionList = (e: list(option('a))) =>
  e |> List.filter(Option.isSome) |> List.map(Option.toExn("mistake"));

module ThingG = {
  open Thing;
  type t = thing;
  let allFacts = graph ||> Graph.facts;
  let filterFacts = (f: (string, list(fact)) => list(fact), t: t) =>
    f(id(t), allFacts(t));

  let isEdgeForFacts = edge => filterFacts(FactFilters.withEdge(edge));
  let isSubjectForFacts = filterFacts(FactFilters.withEdge(SUBJECT));
  let isPropertyForFacts = filterFacts(FactFilters.withEdge(PROPERTY));
  let facts = filterFacts(FactFilters.withIdAsAnyEdge);

  /* This doesn't apply if this thing is the value! */
  let filterFactsAndSelectThings = (fromEdge, toEdge, t: t) =>
    t
    |> filterFacts(FactFilters.withEdge(fromEdge))
    |> List.map(FactG.findThing(t.graph, toEdge))
    |> unpackOptionList;

  let connectedPropertyThings = filterFactsAndSelectThings(SUBJECT, PROPERTY);
  let connectedSubjectThings = filterFactsAndSelectThings(PROPERTY, SUBJECT);

  let connectedPropertyWithId = (id: string, t: t) =>
    connectedPropertyThings(t) |> ThingFilters.find(id);

  let connectedSubjectWithId = (id: string, t: t) =>
    connectedSubjectThings(t) |> ThingFilters.find(id);
};