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
         {id: a, subjectId: b, propertyId: c, value: String("sdfs")}
       );
  let graph = {facts, things};
  for (x in 0 to List.length(things) - 1) {
    List.nth(things, x).graph = graph;
  };
  graph;
};

[@genType]
let testData = [|
  ("g-0", "n-george", "p-name", "George"),
  ("g-1", "n-george", "p-description", "The person named Goerge"),
  ("1", "n-cindy", "p-name", "Cindy"),
  ("2", "p-name", "p-name", "Name of Item"),
  ("3", "p-name", "p-description", "The name of something"),
  ("4", "2", "p-name", "The 2nd fact"),
|];

[@genType]
let start = build(testData |> Array.to_list);

let things = g => g.things;
let facts = g => g.facts;
let findFact = id => facts ||> Fact.Filters.find(id);
[@genType]
let findThing = id => things ||> Thing.find(id);
let findThingFromFact = (g: graph, edge: edge, f: fact) =>
  f |> Fact.T.edgeId(edge) |> findThing(_, g);
[@genType]
let to_json = (t: t) => {
  let facts = t.facts |> Array.of_list |> Array.map(Fact.T.to_json);
  let things = t.things |> Array.of_list |> Array.map(Thing.to_json);
  Json.Encode.(
    object_([
      ("facts", Json.Encode.jsonArray(facts)),
      ("things", Json.Encode.jsonArray(things)),
    ])
  );
};