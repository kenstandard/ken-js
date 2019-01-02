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
  [@genType]
  let things = (g: T.t) => g.things;
  let findThing = (id: T.thingIdString, t: T.t) =>
    Js.Dict.get(t |> things, id);

  [@genType]
  let facts = (g: T.t) => g.facts;

  let showFacts = (g: T.t) =>
    g.facts |> Js.Dict.values |> Array.map(T.factToJs);

  let showThings = (g: T.t) =>
    g.things |> Js.Dict.values |> Array.map(T.thingToJs);

  let showValues = (g: T.t) =>
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