type thingIdString = string;

type baseId = string;

type valueType =
  | String(string)
  | ThingId(thingIdString)
  | JSON(Js.Json.t);

[@bs.deriving jsConverter]
type value = {valueType};

[@bs.deriving jsConverter]
type fact = {
  thingIdString,
  subjectId: thingIdString,
  propertyId: thingIdString,
  value,
};

type thingTypes =
  | FACT
  | BASE
  | ITEM;

type thingType =
  | Fact(fact)
  | Item;

type thingId = {
  thingIdString,
  isPublic: bool,
  baseId,
};

[@bs.deriving jsConverter]
type thing = {
  thingId,
  thingType,
};

type graph = {
  things: Js.Dict.t(thing),
  facts: Js.Dict.t(fact),
  bases: list(thingIdString),
};

type things = Js.Dict.t(thing);
type facts = Js.Dict.t(fact);

[@genType]
type edge =
  | SUBJECT
  | PROPERTY
  | VALUE;

let showFacts = (g: graph) =>
  g.facts |> Js.Dict.values |> Array.map(factToJs);

let showThings = (g: graph) =>
  g.things |> Js.Dict.values |> Array.map(thingToJs);

let showValues = (g: graph) =>
  g.facts |> Js.Dict.values |> Array.map(f => f.value) |> Array.map(valueToJs);

let isEqual = (a, b) => a == b;

let isNotEqual = (a, b) => a != b;

module Thing = {
  type t = thing;
  let id = e => e.thingId.thingIdString;

  [@genType]
  let find = (id: thingIdString, t: things) => Js.Dict.get(t, id);
  let to_s = e => "[ID: " ++ (e |> id) ++ "]";

  [@genType]
  let to_json = (t: t) => Json.Encode.(object_([("id", string(id(t)))]));
};