type thingId = string;

type baseId = string;

type base = {id: string};

type valueType =
  | String(string)
  | Thing(thingId)
  | JSON(Js.Json.t);

[@bs.deriving jsConverter]
type value = {valueType};

[@bs.deriving jsConverter]
type fact = {
  thingId,
  subjectId: thingId,
  propertyId: thingId,
  value,
};

type thingTypes =
  | FACT
  | BASE
  | ITEM;

type thingType =
  | Fact(fact)
  | Item;

[@bs.deriving jsConverter]
type thing = {
  thingId,
  idIsPublic: bool,
  baseId,
  thingType,
};

type graph = {
  things: Js.Dict.t(thing),
  facts: Js.Dict.t(fact),
  bases: list(thingId),
};

let showFacts = (g: graph) =>
  g.facts |> Js.Dict.values |> Array.map(factToJs);

let showThings = (g: graph) =>
  g.things |> Js.Dict.values |> Array.map(thingToJs);

let showValues = (g: graph) =>
  g.facts |> Js.Dict.values |> Array.map(f => f.value) |> Array.map(valueToJs);