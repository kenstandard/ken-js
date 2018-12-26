open Jest;

open Expect;

/*
 TODO:
 - Random Local Ids
 - Templates
 */

module Importer1 = {
  type value =
    | String(string)
    | Array(array(string));

  type fact = {
    id: option(string),
    p: string,
    v: value,
  };

  type thing = {
    id: string,
    facts: array(fact),
    templates: array(string),
  };

  type graph = {
    things: array(thing),
    bases: list(Base.base),
  };

  let factDecoder = (p, json) =>
    switch (json |> Js.Json.classify) {
    | JSONString(_) => {p, v: String(json |> Json.Decode.string), id: None}
    | JSONObject(_) => {
        p,
        v: String(json |> Json.Decode.field("value", Json.Decode.string)),
        id: Some("sddf"),
      }
    | JSONArray(rs) => {
        p,
        v: Array(rs |> Array.map(Json.Decode.string)),
        id: None,
      }
    | _ => {p, id: None, v: String("Couldn't find")}
    };

  let filterArray = (filter, ar) =>
    ar |> Array.to_list |> filter |> Array.of_list;

  let propertyDecoder = json => {
    let filteredFactKeys = ["templates"];

    let thing0 =
      Js.Json.decodeObject(json) |> Rationale.Option.toExn("Parse Error");

    let toFact = id => {
      let _value =
        Js.Dict.get(thing0, id) |> Rationale.Option.toExn("Parse Error");
      factDecoder(id, _value);
    };

    let nonTemplateKeys =
      thing0
      |> Js.Dict.keys
      |> filterArray(Rationale.RList.without(filteredFactKeys));

    let facts = nonTemplateKeys |> Array.map(toFact);
    facts;
  };

  let removeIfInList = (list, fn) =>
    List.filter(e =>
      e |> fn |> Rationale.RList.contains(_, list) |> (e => !e)
    );

  let decode = json => {
    let filteredFactKeys = ["meta"];

    let entries =
      json
      |> Js.Json.decodeObject
      |> Rationale.Option.toExn("Parse Error")
      |> Js.Dict.entries
      |> Array.to_list;
    open Json.Decode;
    let baseId = json |> field("meta", field("base", field("id", string)));
    let things =
      entries
      |> removeIfInList(filteredFactKeys, ((k, _)) => k)
      |> List.map(((key, value)) =>
           {id: key, facts: propertyDecoder(value), templates: [||]}
         );
    {
      things: things |> Array.of_list,
      bases: [{id: baseId, parentBaseId: None}],
    };
  };
};

let toGraph = (graph: Importer1.graph) => {
  let valueToValues = (v: Importer1.value) =>
    switch (v) {
    | String(s) => [|s|]
    | Array(r) => r
    };

  let things =
    graph.things
    |> Array.to_list
    |> List.map((thing: Importer1.thing) =>
         thing.facts
         |> Array.map((fact: Importer1.fact) =>
              fact.v
              |> valueToValues
              |> Array.map((value: string) =>
                   (
                     {
                       id: fact.id |> Rationale.Option.default("null-id"),
                       subjectId: thing.id,
                       propertyId: fact.p,
                       value: Base.String(value),
                       idIsPublic: false,
                       baseId:
                         graph.bases
                         |> Belt.List.get(_, 0)
                         |> Rationale.Option.toExn(
                              "Needs at least one graph base",
                            )
                         |> ((b: Base.base) => b.id),
                     }: Base.fact
                   )
                 )
            )
       )
    |> Array.of_list
    |> Belt.Array.concatMany
    |> Belt.Array.concatMany
    |> Array.to_list;

  Graph.from_facts(things, graph.bases);
};

let value =
  Json.parseOrRaise(
    {|
      {
    "meta": {
        "base":{
          "id": "my-cool-base"
        }
      },
        "n-fred": {
          "p-name": "Fred",
          "p-test": ["sdf", "sdfsdf", "sdfsdf"],
          "p-description": {"id": "sdf", "value": "sdffsd"}
        }
    }
   |},
  );

describe("#to_json", () =>
  test("works", () => {
    let foo = value |> Importer1.decode |> toGraph |> Graph.to_json;
    Js.log(foo);
    expect(true) |> toEqual(true);
  })
);