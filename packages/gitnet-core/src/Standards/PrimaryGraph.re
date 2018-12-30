type thingId = string;

type baseId = string;

type base = {id: string};

type valueType =
  | Thing(thingId)
  | String(string)
  | JSON(Js.Json.t);

type value = {valueType};

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