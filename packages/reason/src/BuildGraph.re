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

let isEqual = (a, b) => a == b;
let isNotEqual = (a, b) => a != b;

type edge =
  | SUBJECT
  | PROPERTY;

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
};

let unpackOptionList = (e: list(option('a))) =>
  e |> List.filter(Option.isSome) |> List.map(Option.toExn("mistake"));

module ThingG = {
  open Thing;
  type t = thing;
  let allFacts = graph ||> Graph.facts;
  let filterFacts = (f: (string, list(fact)) => list(fact), t: t) =>
    f(id(t), allFacts(t));

  let isSubjectForFacts = filterFacts(FactFilters.withSubject);
  let isPropertyForFacts = filterFacts(FactFilters.withProperty);
  let facts = filterFacts(FactFilters.withIdAsAnyEdge);

  /* This doesn't apply if this thing is the value! */
  let connectedPropertyThings = (t: t) =>
    t
    |> filterFacts(FactFilters.withSubject)
    |> List.map(FactG.findThing(t.graph, PROPERTY))
    |> unpackOptionList;

  let connectedSubjectThings = (t: t) =>
    t
    |> filterFacts(FactFilters.withProperty)
    |> List.map(FactG.findThing(t.graph, SUBJECT))
    |> unpackOptionList;

  let connectedPropertyWithId = (id: string, t: t) =>
    connectedPropertyThings(t) |> ThingFilters.find(id);

  let connectedSubjectWithId = (id: string, t: t) =>
    connectedSubjectThings(t) |> ThingFilters.find(id);
  /* let isSubjectForPropertyId = id =>
     isSubjectForFacts ||> List.filter(Fact.hasSubjectId(_, id)); */
};