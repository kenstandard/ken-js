type thingId = string;

type valueType =
  | Thing(thingId)
  | String(string)
  | JSON(Js.Json.t);

type value = {valueType};

type id = {
  id: string,
  isPublic: bool,
};

type fact = {
  id,
  subjectId: id,
  propertyId: id,
  baseId: id,
  value,
};

type graph = list(fact);