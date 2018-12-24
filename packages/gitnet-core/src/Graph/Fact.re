open Rationale.Function.Infix;
open Rationale;
open Base;
open Config;

module Value = {
  open FactJson.Value;
  let to_json = (v: value) =>
    Json.Encode.(
      switch (v) {
      | ThingId(s) =>
        object_([
          (dataTypeField, string(thingIdType)),
          (dataField, string(s)),
        ])
      | String(s) =>
        object_([
          (dataTypeField, string(stringType)),
          (dataField, string(s)),
        ])
      | JSON(s) =>
        object_([(dataTypeField, string(jsonType)), (dataField, s)])
      }
    );

  let from_json = (v: Js.Json.t) => {
    open Json.Decode;
    let _type = v |> field(dataTypeField, string);
    switch (_type) {
    | "string" => v |> field(dataField, string) |> (e => String(e))
    | "thingId" => v |> field(dataField, string) |> (e => ThingId(e))
    | _ => v |> field(dataField, string) |> (e => ThingId(e))
    };
  };
};

module T = {
  type t = fact;
  let subjectId = t => t.subjectId;
  let propertyId = t => t.propertyId;
  let edgeId = edge => edge == SUBJECT ? subjectId : propertyId;
  let hasSubjectId = subjectId ||> isEqual;
  let hasPropertyId = propertyId ||> isEqual;
  let value = t => t.value;
  let id = (t: t) => t.id;
  let to_json = (t: t) =>
    Json.Encode.(
      object_([
        (FactJson.Fields.id, string(t.id)),
        (FactJson.Fields.subjectId, string(t.subjectId)),
        (FactJson.Fields.propertyId, string(t.propertyId)),
        (FactJson.Fields.value, Value.to_json(t.value)),
      ])
    );

  let from_json = (t: Js.Json.t) =>
    Json.Decode.{
      id: t |> field(FactJson.Fields.id, string),
      subjectId: t |> field(FactJson.Fields.subjectId, string),
      propertyId: t |> field(FactJson.Fields.propertyId, string),
      value: t |> field(FactJson.Fields.value, Value.from_json),
    };
};

module Query = {
  type condition =
    | IS
    | IS_NOT;

  type t = {
    edge,
    id: string,
    q: condition,
  };

  let run = (q: t, f: fact) => {
    let equality = q.q == IS ? isEqual(q.id) : isNotEqual(q.id);
    switch (q.edge) {
    | SUBJECT => equality(f.subjectId)
    | PROPERTY => equality(f.propertyId)
    };
  };

  let qOr = (q1: t, q2: t, f: fact) => run(q1, f) || run(q2, f);
  let qAnd = (q1: t, q2: t, f: fact) => run(q1, f) && run(q2, f);
};

module Filters = {
  type t = list(fact);
  let query = (q: Query.t, t) => t |> List.filter(Query.run(q));
  let find = (id, t) => t |> RList.find((e: fact) => e.id == id);
  let filter = List.filter;

  let withEdge = (edge, id) => filter(Query.run({edge, q: Query.IS, id}));

  let withoutEdge = (edge, id) =>
    filter(Query.run({edge, q: Query.IS_NOT, id}));

  let withSubject = id =>
    filter(Query.run({edge: SUBJECT, q: Query.IS, id}));

  let withoutSubject = id =>
    filter(Query.run({edge: SUBJECT, q: Query.IS_NOT, id}));

  let withProperty = id =>
    filter(Query.run({edge: PROPERTY, q: Query.IS, id}));

  let withoutProperty = id =>
    filter(Query.run({edge: PROPERTY, q: Query.IS_NOT, id}));

  let withIdAsAnyEdge = id =>
    filter(
      Query.qOr(
        {edge: SUBJECT, q: Query.IS, id},
        {edge: PROPERTY, q: Query.IS, id},
      ),
    );

  let withIdAsNoEdge = id =>
    filter(
      Query.qOr(
        {edge: SUBJECT, q: Query.IS_NOT, id},
        {edge: PROPERTY, q: Query.IS_NOT, id},
      ),
    );
};

[@genType]
let c = () => {a: "sdf", b: "sdfsdf"};