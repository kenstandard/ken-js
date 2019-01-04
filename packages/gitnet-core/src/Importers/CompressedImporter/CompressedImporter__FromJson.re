open CompressedImporter__T;

let factDecoder = (property, json) =>
  switch (json |> Js.Json.classify) {
  | JSONString(_) => {
      value: String(json |> Json.Decode.string),
      property,
      id: None,
    }
  | JSONObject(_) => {
      property,
      value: String(json |> Json.Decode.field("value", Json.Decode.string)),
      id: Some("json-values-TODO"),
    }
  | JSONArray(rs) => {
      property,
      value: Array(rs |> Array.map(Json.Decode.string)),
      id: None,
    }
  | _ => {property, id: None, value: String("Couldn't find")}
  };

let filterArray = (filter, ar) =>
  ar |> Array.to_list |> filter |> Array.of_list;

let propertyDecoder = json => {
  let filteredFactKeys = ["templates", "config"];

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
  List.filter(e => e |> fn |> Rationale.RList.contains(_, list) |> (e => !e));

let decodeBase = json => {
  let filteredFactKeys = ["baseId", "resourceId", "config"];

  let entries =
    json
    |> Js.Json.decodeObject
    |> Rationale.Option.toExn("Parse Error")
    |> Js.Dict.entries
    |> Array.to_list;
  open Json.Decode;
  let baseId = json |> field("config", field("baseId", string));
  let resourceId = json |> field("config", field("resourceId", string));
  let aliases =
    json |> field("config", field("aliases", Json.Decode.dict(string)));
  let things =
    entries
    |> removeIfInList(filteredFactKeys, ((k, _)) => k)
    |> List.map(((key, value)) =>
         {id: key, facts: propertyDecoder(value), templates: [||]}
       );
  {things: things |> Array.of_list, baseId, resourceId, aliases};
};

let run = json: graph => Json.Decode.(json |> Json.Decode.array(decodeBase));