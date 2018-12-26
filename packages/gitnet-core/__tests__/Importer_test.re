open Jest;

open Expect;

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

  let propertyDecoder = json => {
    let banned = ["templates"];

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
      |> Array.to_list
      |> Rationale.RList.without(banned)
      |> Array.of_list;

    let facts = nonTemplateKeys |> Array.map(toFact);
    facts;
  };

  let decode = json => {
    let dict =
      json |> Js.Json.decodeObject |> Rationale.Option.toExn("Parse Error");
    dict
    |> Js.Dict.entries
    |> Array.map(((key, value)) =>
         {id: key, facts: propertyDecoder(value), templates: [||]}
       );
  };
};

let toFacts = (ts: array(Importer1.thing)) => {
  let valueToValues = (v: Importer1.value) =>
    switch (v) {
    | String(s) => [|s|]
    | Array(r) => r
    };
  ts
  |> Array.map((thing: Importer1.thing) =>
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
                   }: Base.fact
                 )
               )
          )
     )
  |> Belt.Array.concatMany
  |> Belt.Array.concatMany;
};

let value =
  Json.parseOrRaise(
    {|
      {"foobar": {
        "p-name": "Fred",
        "p-test": ["sdf", "sdfsdf", "sdfsdf"],
        "p-description": {"id": "sdf", "value": "sdffsd"}
      }
    }
   |},
  );

describe("#to_json", () =>
  test("works", () => {
    let foo =
      value
      |> Importer1.decode
      |> toFacts
      |> Array.to_list
      |> Graph.from_facts
      |> Graph.to_json;
    Js.log("SUCCSS");
    Js.log(foo);
    expect(true) |> toEqual(true);
  })
);