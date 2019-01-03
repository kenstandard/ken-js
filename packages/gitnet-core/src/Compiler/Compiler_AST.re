type thingIdType =
  | FACT
  | NONFACT;

[@bs.deriving jsConverter]
type thingId = {
  rawId: option(string),
  mutable tag: option(string),
  mutable thingIdType: option(thingIdType),
  mutable updatedId: option(string),
};

type value =
  | String(string)
  | Id(thingId);

[@bs.deriving jsConverter]
type fact = {
  thingId,
  subjectId: thingId,
  propertyId: thingId,
  mutable value,
};

type package = {
  facts: list(fact),
  baseId: string,
  resourceId: string,
  aliases: Js.Dict.t(string),
};
/* type graph = list(fact); */