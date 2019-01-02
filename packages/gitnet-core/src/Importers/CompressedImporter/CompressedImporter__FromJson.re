open CompressedImporter__T;

let factDecoder = (property, json, baseId, resourceId) =>
  switch (json |> Js.Json.classify) {
  | JSONString(_) => {
      value: String(json |> Json.Decode.string),
      property,
      id: None,
      baseId,
      resourceId,
    }
  | JSONObject(_) => {
      property,
      value: String(json |> Json.Decode.field("value", Json.Decode.string)),
      id: Some("json-values-TODO"),
      baseId,
      resourceId,
    }
  | JSONArray(rs) => {
      property,
      value: Array(rs |> Array.map(Json.Decode.string)),
      id: None,
      baseId,
      resourceId,
    }
  | _ => {
      property,
      id: None,
      value: String("Couldn't find"),
      baseId,
      resourceId,
    }
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
  List.filter(e => e |> fn |> Rationale.RList.contains(_, list) |> (e => !e));

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
  let resourceId = json |> field("resourceId", string);
  let things =
    entries
    |> removeIfInList(filteredFactKeys, ((k, _)) => k)
    |> List.map(((key, value)) =>
         {
           id: key,
           facts: propertyDecoder(value, baseId, resourceId),
           baseId,
           resourceId,
           templates: [||],
         }
       );
  things |> Array.of_list;
};

let run = json: graph =>
  Json.Decode.(
    json |> Json.Decode.array(decodeBase) |> Belt.Array.concatMany
  );