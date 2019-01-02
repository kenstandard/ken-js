open Rationale.Function.Infix;
open Rationale;

type thingIdString = string;
type baseId = string;

type valueType =
  | THING_ID
  | STRING
  | JSON;

type value =
  | ThingId(thingIdString)
  | String(string)
  | JSON(Js.Json.t);

[@genType.opaque]
type fact = {
  thingIdString,
  subjectId: thingIdString,
  propertyId: thingIdString,
  value,
};

type thingId = {
  thingIdString,
  isPublic: bool,
  baseId,
};

type thingType =
  | Fact(fact)
  | Item;

[@genType.opaque]
type thing = {
  thingId,
  thingType,
}
and graph = {
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

let isEqual = (a, b) => a == b;

let isNotEqual = (a, b) => a != b;

module Thing = {
  type t = thing;
  let id = e => e.thingId.thingIdString;
  [@genType]
  let find = (id: thingIdString, t: things) => Js.Dict.get(t, id);
  let to_s = e => "[ID: " ++ (e |> id) ++ "]";

  /* TODO: Remove this, seems useless */
  [@genType]
  let to_json = (t: t) => Json.Encode.(object_([("id", string(id(t)))]));
};