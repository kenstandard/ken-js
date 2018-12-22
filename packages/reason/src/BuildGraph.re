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

  let id = bimap(e => e.id, e => e.id);
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

  let findFactWithSubject = id =>
    facts ||> RList.find(Fact.subjectId ||> isEqual(id));

  let findFactWithProperty = id =>
    facts ||> RList.find(Fact.propertyId ||> isEqual(id));

  let findThingWithId = id =>
    things ||> RList.find(Thing.id ||> isEqual(id));
};

module Nonfact = {
  type t = nonfact;
  let facts = t => t.graph.things;
};

module FactWithGraph = {
  type t = fact;
  let findFactWithSubject = (a: t) => Graph.findFactWithSubject(_, a.graph);
  let findFactWithProperty = (a: t) =>
    Graph.findFactWithProperty(_, a.graph);
  let findThingWithId = (a: t) => Graph.findThingWithId(_, a.graph);

  /* Property Must not be a Fact */
  let findProperty = (t: t): option(nonfact) =>
    Option.Infix.(
      t |> Fact.propertyId |> findThingWithId(t) <$> Thing.toNonFactExt
    );

  let findSubject = (t: t): option(thing) =>
    t |> Fact.subjectId |> findThingWithId(t);
};

module ThingWithGraph = {
  type t = thing;
};