open Rationale.Function.Infix;
open Rationale;
open Base;

type t = graph;
type importStatement = (string, string, string, Js.Json.t);

[@genType]
let toJs = (s: option('a)) => Option.isSome(s) ? "TRUE" : "FALSE";
[@genType]
let toJs2 = (s: option('a)) => Js.Nullable.fromOption(s);

[@genType]
let things = g => g.things;
[@genType]
let facts = g => g.facts;
let findFact = id => facts ||> (e => Js.Dict.get(e, id));
[@genType]
let findThing = (id: string, g: graph): option(Thing.t) =>
  g |> things |> Thing.find(id);
[@genType]
let findThingFromFact = (g: graph, edge: edge, f: fact) =>
  f |> Fact.T.edgeId(edge) |> findThing(_, g);
let from_json = Json.Decode.list(Fact.T.from_json);
[@genType]
let to_json = (t: t) => {
  let facts = t.facts |> Js.Dict.values |> Array.map(Fact.T.to_json);
  let things = t.things |> Js.Dict.values |> Array.map(Thing.to_json);
  Json.Encode.(
    object_([
      (Config.JsonKeys.facts, jsonArray(facts)),
      (Config.JsonKeys.things, jsonArray(things)),
    ])
  );
};

/* let from_facts = (facts: list(fact)) => {
     let nodes =
       facts
       |> List.map((e: fact) => [e.thingIdString, e.subjectId, e.propertyId])
       |> List.flatten
       |> Rationale.RList.uniq;
     let empty = {things: Js.Dict.empty(), facts: Js.Dict.empty(), bases: []};
     let things =
       nodes
       |> List.map(e =>
            {
              thingId: {
                thingIdString: e,
                isPublic: true,
                baseId: "TODO: REPLACE_ME",
              },
              graph: empty,
              thingType: None,
            }
          );
     let graph = {facts, things, bases: []};
     for (x in 0 to List.length(things) - 1) {
       List.nth(things, x).graph = graph;
     };
     graph;
   }; */

/* let withThingIds = (g: t) => {
     let facts =
       g.facts
       |> List.map(f => {
            let value =
              switch (f.value) {
              | String(f) =>
                findThing(f, g) |> Rationale.Option.isSome ?
                  ThingId(f) : String(f)
              | _ => f.value
              };
            {...f, value};
          });
     {things: g.things, facts, bases: []};
   }; */

/* let withCorrectThingTypes = (g: t) => {
   } */

/* [@genType]
   let load = v => v |> from_json |> from_facts |> withThingIds; */