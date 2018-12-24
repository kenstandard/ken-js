open Rationale.Function.Infix;
open Rationale;
open Base;

type t = graph;
type importStatement = (string, string, string, Js.Json.t);

let build = (facts: list(fact)) => {
  let nodes =
    facts
    |> List.map((e: fact) => [e.id, e.subjectId, e.propertyId])
    |> List.flatten
    |> Rationale.RList.uniq;
  let empty = {things: [], facts: []};
  let things = nodes |> List.map(e => {id: e, graph: empty});
  let graph = {facts, things};
  for (x in 0 to List.length(things) - 1) {
    List.nth(things, x).graph = graph;
  };
  graph;
};

let textValue2 =
  Json.parseOrRaise(
    {|
[{
        "id": "g-1",
        "subject": "n-george",
        "property": "p-name",
        "value": {
            "dataValue": "string",
            "data": "George"
        }
    },
    {
        "id": "g-2",
        "subject": "n-george",
        "property": "p-description",
        "value": {
            "dataValue": "string",
            "data": "A test person!"
        }
    },
    {
        "id": "p-name-name",
        "subject": "n-name",
        "property": "n-name",
        "value": {
            "dataValue": "string",
            "data": "Name"
        }
    }
]
       |},
  );

let decode = Json.Decode.list(Thing.decode);

[@genType]
let start = build(textValue2 |> decode);

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