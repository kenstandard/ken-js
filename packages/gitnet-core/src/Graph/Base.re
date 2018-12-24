open Rationale.Function.Infix;
open Rationale;

type valueType =
  | THING_ID
  | STRING
  | JSON;

type value =
  | ThingId(string)
  | String(string)
  | JSON(Js.Json.t);

[@genType.opaque]
type fact = {
  id: string,
  subjectId: string,
  propertyId: string,
  value,
};

[@genType.opaque]
type thing = {
  id: string,
  mutable graph,
}
and graph = {
  facts: list(fact),
  things: list(thing),
};

type edge =
  | SUBJECT
  | PROPERTY;

let isEqual = (a, b) => a == b;

let isNotEqual = (a, b) => a != b;

module Thing = {
  type t = thing;
  let id = e => e.id;
  let graph = e => e.graph;
  [@genType]
  let find = (id, t: list(t)) => t |> RList.find((e: thing) => e.id == id);
  let to_s = e => "[ID: " ++ e.id ++ "]";
  [@genType]
  let to_json = (t: t) => Json.Encode.(object_([("id", string(t.id))]));
};