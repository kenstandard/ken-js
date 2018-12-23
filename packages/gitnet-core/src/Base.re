open Rationale.Function.Infix;
open Rationale;

type thing = {
  id: string,
  mutable graph,
}
and fact = {
  id: string,
  subjectId: string,
  propertyId: string,
  value: string,
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
  let find = (id, t: list(t)) => t |> RList.find((e: thing) => e.id == id);
  let to_s = e => "[ID: " ++ e.id ++ "]";
};