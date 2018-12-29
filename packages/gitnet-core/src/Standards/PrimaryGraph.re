type thingId = string;
type baseId = string;

module Graph = {
  type base = {thingId};

  type valueType =
    | Thing(thingId)
    | String(string)
    | JSON(Js.Json.t);

  type value = {
    thingId,
    valueType,
  };

  type fact = {
    thingId,
    subject: thingId,
    property: thingId,
    value,
  };

  type thingType =
    | Fact(fact)
    | Value(value)
    | Base
    | Directory
    | Item;

  type thing = {
    thingId,
    idIsPublic: bool,
    thingType,
  };

  type graph = {
    things: Js.Dict.t(thing),
    bases: list(thingId),
  };
};