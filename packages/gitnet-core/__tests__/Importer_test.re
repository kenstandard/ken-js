open Jest;

open Expect;

module Importer1 = {
  type longVal = {
    id: option(string),
    value: option(string),
    json: option(Js.Json.t),
  };

  type value =
    | String(string)
    | Array(array(string))
    | Json(longVal);

  type fact = {
    p: string,
    v: value,
  };

  type thing = {
    id: string,
    facts: array(fact),
    templates: array(string),
  };

  let valueJsonDecoder = json =>
    Json.Decode.{
      id: json |> optional(field("id", string)),
      value: json |> optional(field("value", string)),
      json: None,
    };

  let valueDecoder = json =>
    switch (json |> Js.Json.classify) {
    | JSONString(_) => String(json |> Json.Decode.string)
    | JSONObject(_) => Json(json |> valueJsonDecoder)
    | JSONArray(rs) => Array(rs |> Array.map(Json.Decode.string))
    | _ => String("Couldn't find")
    };
  /* json |>  Json.Decode.dict(Json.Decode.string) */

  let propertyDecoder = json => {
    let banned = ["templates"];

    let thing0 =
      Js.Json.decodeObject(json) |> Rationale.Option.toExn("Parse Error");

    let toFact = id => {
      let _value =
        Js.Dict.get(thing0, id) |> Rationale.Option.toExn("Parse Error");
      {p: id, v: _value |> valueDecoder};
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
    | Json(l) => [|"sdfsdf"|]
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
                     id: "sdfsdf",
                     subjectId: thing.id,
                     propertyId: fact.p,
                     value: Base.String(value),
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
        "p-description": "George"
      }
    }
   |},
  );

describe("#to_json", () =>
  test("works", () => {
    /* js.log(id |> to_json |> js.json.stringify); */
    let foo =
      value
      |> Importer1.decode
      |> toFacts
      |> Array.to_list
      |> Graph.from_facts
      |> Graph.to_json;
    Js.log("SUCCSS");
    Js.log(foo);
    /* let bar = value |> propertyDecoder; */
    expect(true) |> toEqual(true);
  })
);