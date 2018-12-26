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
    baseId: string,
    resourceId: string,
    v: value,
  };

  type thing = {
    id: string,
    facts: array(fact),
    templates: array(string),
  };

  let factDecoder = (p, json, baseId, resourceId) =>
    switch (json |> Js.Json.classify) {
    | JSONString(_) => {
        p,
        v: String(json |> Json.Decode.string),
        id: None,
        baseId,
        resourceId,
      }
    | JSONObject(_) => {
        p,
        v: String(json |> Json.Decode.field("value", Json.Decode.string)),
        id: Some("sddf"),
        baseId,
        resourceId,
      }
    | JSONArray(rs) => {
        p,
        v: Array(rs |> Array.map(Json.Decode.string)),
        id: None,
        baseId,
        resourceId,
      }
    | _ => {p, id: None, v: String("Couldn't find"), baseId, resourceId}
    };

  let filterArray = (filter, ar) =>
    ar |> Array.to_list |> filter |> Array.of_list;

  let propertyDecoder = (json, baseId, resourceId) => {
    let filteredFactKeys = ["templates"];

    let thing0 =
      Js.Json.decodeObject(json) |> Rationale.Option.toExn("Parse Error");

    let toFact = id => {
      let _value =
        Js.Dict.get(thing0, id) |> Rationale.Option.toExn("Parse Error");
      factDecoder(id, _value, baseId, resourceId);
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

  let decodeBase = json => {
    let filteredFactKeys = ["baseId", "resourceId"];

    let entries =
      json
      |> Js.Json.decodeObject
      |> Rationale.Option.toExn("Parse Error")
      |> Js.Dict.entries
      |> Array.to_list;
    open Json.Decode;
    let baseId = json |> field("baseId", string);
    let resourceId = json |> field("baseId", string);
    let things =
      entries
      |> removeIfInList(filteredFactKeys, ((k, _)) => k)
      |> List.map(((key, value)) =>
           {
             id: key,
             facts: propertyDecoder(value, baseId, resourceId),
             templates: [||],
           }
         );
    things |> Array.of_list;
  };

  let decode = json =>
    Json.Decode.(
      json |> Json.Decode.array(decodeBase) |> Belt.Array.concatMany
    );
};

let toGraph = (things: array(Importer1.thing)) => {
  let valueToValues = (v: Importer1.value) =>
    switch (v) {
    | String(s) => [|s|]
    | Array(r) => r
    };

  let things =
    things
    |> Array.to_list
    |> List.map((thing: Importer1.thing) =>
         thing.facts
         |> Array.map((fact: Importer1.fact) =>
              fact.v
              |> valueToValues
              |> Array.map((value: string) =>
                   (
                     {
                       id:
                         fact.id
                         |> Rationale.Option.default(
                              SecureRandomString.genSync(
                                ~length=8,
                                ~alphaNumeric=true,
                                (),
                              ),
                            ),
                       subjectId: thing.id,
                       propertyId: fact.p,
                       value: Base.String(value),
                       idIsPublic:
                         fact.id |> Rationale.Option.isSome ? true : false,
                       baseId: fact.baseId,
                       resourceId: fact.resourceId,
                     }: Base.fact
                   )
                 )
            )
       )
    |> Array.of_list
    |> Belt.Array.concatMany
    |> Belt.Array.concatMany
    |> Array.to_list;

  Graph.from_facts(things);
};

let value =
  Json.parseOrRaise(
    {|
      [{
        "resourceId": "111",
        "baseId":"1",
        "n-fred": {
          "p-name": "Fred",
          "p-test": ["sdf", "sdfsdf", "sdfsdf"],
          "p-description": {"id": "sdf", "value": "sdffsd"}
        }
      },
      {
        "resourceId": "111",
        "baseId":"2",
        "n-george": {
          "p-name": "George",
          "p-test": ["sdf", "sdfsdf", "sdfsdf"],
          "p-description": {"id": "sdf", "value": "sdffsd"}
        },
        "n-jeremy": {
          "p-name": "George",
          "p-test": ["sdf", "sdfsdf", "sdfsdf"],
          "p-description": {"id": "sdf", "value": "sdffsd"}
        }
      }]
   |},
  );

describe("#to_json", () =>
  test("works", () => {
    let foo = value |> Importer1.decode |> toGraph |> Graph.to_json;
    Js.log(foo);
    expect(true) |> toEqual(true);
  })
);