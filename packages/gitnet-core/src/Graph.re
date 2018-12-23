open Rationale.Function.Infix;
open Rationale;
open Base;

type t = graph;
type importStatement = (string, string, string, string);
let build = (fs: list(importStatement)) => {
  let nodes =
    fs
    |> List.map(((id1, id2, id3, _)) => [id1, id2, id3])
    |> List.flatten
    |> Rationale.RList.uniq;
  let empty = {things: [], facts: []};
  let things = nodes |> List.map(e => {id: e, graph: empty});
  let facts =
    fs
    |> List.map(((a, b, c, d)) =>
         {id: a, subjectId: b, propertyId: c, value: d}
       );
  let graph = {facts, things};
  for (x in 0 to List.length(things) - 1) {
    List.nth(things, x).graph = graph;
  };
  graph;
};

let things = g => g.things;
let facts = g => g.facts;
let findFact = id => facts ||> Fact.Filters.find(id);
let findThing = id => things ||> Thing.find(id);
let findThingFromFact = (g: graph, edge: edge, f: fact) =>
  f |> Fact.T.edgeId(edge) |> findThing(_, g);