open Rationale.Function.Infix;
open Rationale;

type nonfact = {
  id: string,
  mutable graph,
}
and fact = {
  id: string,
  subjectId: string,
  propertyId: string,
  value: string,
  mutable graph,
}
and thing =
  | Fact(fact)
  | Nonfact(nonfact)
and graph = {things: list(thing)};

let getId = thing =>
  switch (thing) {
  | Fact(f) => f.id
  | Nonfact(f) => f.id
  };

let isEqual = (a, b) => a == b;

module Fact = {
  type t = fact;
  let subjectId = t => t.subjectId;
  let propertyId = t => t.propertyId;
  let hasSubjectId = subjectId ||> isEqual;
  let hasPropertyId = propertyId ||> isEqual;
  let value = t => t.value;
  let id = (t: t) => t.id;
  let graph = (t: t) => t.graph;
};

module Nonfact = {
  type t = nonfact;
  let id = t => t.id;
  let graph = t => t.graph;
};

module Thing = {
  type t = thing;

  let isFact = t =>
    switch (t) {
    | Fact(_) => true
    | _ => false
    };

  let isNonfact = isFact ||> (e => !e);

  let toFactExt = t =>
    switch (t) {
    | Fact(a) => a
    | _ => raise(Failure("Assumed nonfact was fact"))
    };

  let toNonFactExt = t =>
    switch (t) {
    | Nonfact(a) => a
    | _ => raise(Failure("Assumed fact was nonfact"))
    };

  let bimap = (fn1, fn2, t) =>
    isFact(t) ? t |> toFactExt |> fn1 : t |> toNonFactExt |> fn2;
  let id = bimap(Fact.id, Nonfact.id);
  let graph = bimap(Fact.graph, Nonfact.graph);
};

module Graph = {
  type t = graph;
  let build = () => {
    let ffacts = [("0", "1", "2", "sdfsdf"), ("8", "1", "3", "bar")];
    let nodes = ["1", "2", "3"];
    let empty = {things: []};
    let nonfacts = nodes |> List.map(e => {id: e, graph: empty});
    let facts =
      ffacts
      |> List.map(((a, b, c, d)) =>
           {id: a, subjectId: b, propertyId: c, value: d, graph: empty}
         );
    let graph = {
      things:
        List.append(
          facts |> List.map(e => Fact(e)),
          nonfacts |> List.map(e => Nonfact(e)),
        ),
    };
    for (x in 0 to List.length(nonfacts)) {
      List.nth(nonfacts, x).graph = graph;
    };
    for (x in 0 to List.length(facts)) {
      List.nth(facts, x).graph = graph;
    };
    graph;
  };

  let things = g => g.things;

  let facts =
    things ||> List.filter(Thing.isFact) ||> List.map(Thing.toFactExt);

  let nonfacts =
    things ||> List.filter(Thing.isNonfact) ||> List.map(Thing.toNonFactExt);

  let findFact = (g, id) => facts(g) |> RList.find((e: fact) => e.id == id);

  let findNonfact = (g, id) =>
    nonfacts(g) |> RList.find((e: nonfact) => e.id == id);

  let findFactsWithSubject = id =>
    facts ||> List.filter(Fact.subjectId ||> isEqual(id));

  let findFactsWithProperty = id =>
    facts ||> List.filter(Fact.propertyId ||> isEqual(id));

  let findThingWithId = id =>
    things ||> RList.find(Thing.id ||> isEqual(id));
};

module FactG = {
  type t = fact;
  let findFactsWithSubject = (a: t) =>
    Graph.findFactsWithSubject(_, a.graph);
  let findFactsWithProperty = (a: t) =>
    Graph.findFactsWithProperty(_, a.graph);
  let findThingWithId = (a: t) => Graph.findThingWithId(_, a.graph);

  /* Property Must not be a Fact */
  let findProperty = (t: t): option(nonfact) =>
    Option.Infix.(
      t |> Fact.propertyId |> findThingWithId(t) <$> Thing.toNonFactExt
    );

  let findSubject = (t: t): option(thing) =>
    t |> Fact.subjectId |> findThingWithId(t);
};

let unpackOptionList = (e: list(option('a))) =>
  e |> List.filter(Option.isSome) |> List.map(Option.toExn("mistake"));

type edge =
  | SUBJECT
  | PROPERTY
  | VALUE;

type relationship = (edge, edge);

module FactFilters = {
  type t = list(fact);
  let withSubject = (id, t) =>
    t |> List.filter(Fact.subjectId ||> isEqual(id));
  let withProperty = (id, t) =>
    t |> List.filter(Fact.propertyId ||> isEqual(id));
  let withSubjectAndProperty = (subjectId, propertyId, t) =>
    t |> withSubject(subjectId) |> withProperty(propertyId);
  let without = (id, t) => t |> List.filter(e => Fact.id(e) != id);
};

module ThingG = {
  open Thing;
  type t = thing;

  let allFacts = graph ||> Graph.facts;

  let isSubjectForFacts = (t: t) =>
    t |> allFacts |> FactFilters.withSubject(id(t));

  let isPropertyForFacts = (t: t) =>
    t |> allFacts |> FactFilters.withProperty(id(t));

  let facts = (t: t) =>
    List.append(isSubjectForFacts(t), isPropertyForFacts(t));

  /* This doesn't apply if this thing is the value! */
  let connectedPropertyNonfacts =
    facts ||> List.map(FactG.findProperty) ||> unpackOptionList;

  let connectedSubjectThings =
    facts ||> List.map(FactG.findSubject) ||> unpackOptionList;

  let connectedPropertyWithId = (id: string, t: t) =>
    t |> connectedPropertyNonfacts |> RList.find(Nonfact.id ||> isEqual(id));

  let connectedSubjectWithId = (id: string, t: t) =>
    t |> connectedSubjectThings |> RList.find(Thing.id ||> isEqual(id));

  let isSubjectForPropertyId = id =>
    isSubjectForFacts ||> List.filter(Fact.hasSubjectId(_, id));
};