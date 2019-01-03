open Rationale.Function.Infix;

module T = {
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

  type t = {
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
};

module F = {
  let things = (g: T.t) => g.things;
  let thingArray = (g: T.t) => g.things |> Js.Dict.values;
  let findThing = (id: T.thingIdString, t: T.t) =>
    Js.Dict.get(t |> things, id);

  let facts = (g: T.t) => g.facts;
  let factArray = facts ||> Js.Dict.values;
  let factList = facts ||> Js.Dict.values ||> Array.to_list;

  let factsJs = (g: T.t) =>
    g.facts |> Js.Dict.values |> Array.map(T.factToJs);

  let thingsJs = (g: T.t) =>
    g.things |> Js.Dict.values |> Array.map(T.thingToJs);

  let valuesJs = (g: T.t) =>
    g.facts
    |> Js.Dict.values
    |> Array.map((f: T.fact) => f.value)
    |> Array.map(T.valueToJs);
};

module Thing = {
  open T;
  type t = T.thing;
  let id = e => e.thingId.thingIdString;

  [@genType]
  let to_s = e => "[ID: " ++ (e |> id) ++ "]";

  [@genType]
  let to_json = (t: t) => Json.Encode.(object_([("id", string(id(t)))]));
};