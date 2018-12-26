open Rationale.Function.Infix;
open Rationale;
open Base;
open Config;

module Value = {
  open FactJson.Value;
  [@genType]
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
  [@genType]
  let value = t => t.value;
  let id = (t: t) => t.id;
  [@genType]
  let to_json = (t: t) =>
    Json.Encode.(
      object_([
        (FactJson.Fields.id, string(t.id)),
        (FactJson.Fields.subjectId, string(t.subjectId)),
        (FactJson.Fields.propertyId, string(t.propertyId)),
        (FactJson.Fields.value, Value.to_json(t.value)),
        (FactJson.Fields.baseId, string(t.baseId)),
      ])
    );

  let from_json = (t: Js.Json.t) =>
    Json.Decode.{
      baseId: t |> field(FactJson.Fields.baseId, string),
      id: t |> field(FactJson.Fields.id, string),
      subjectId: t |> field(FactJson.Fields.subjectId, string),
      propertyId: t |> field(FactJson.Fields.propertyId, string),
      value: t |> field(FactJson.Fields.value, Value.from_json),
      idIsPublic: true,
    };
};

module Query = {
  [@genType.opaque]
  type condition =
    | IS
    | IS_NOT;

  [@genType.opaque]
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
    | VALUE =>
      switch (f.value) {
      | ThingId(id) => equality(id)
      | _ => q.q != IS
      }
    };
  };

  let qOr = (qs: list(t), f: fact) => List.exists(q => run(q, f), qs);
  let qAnd = (qs: list(t), f: fact) => List.for_all(q => run(q, f), qs);

  let item_from_json = i => {
    open Json.Decode;
    let id = i |> field("id", string);
    let _q = i |> field("q", string);
    let _edge = i |> field("edge", string);
    {
      id,
      q:
        switch (_q) {
        | "IS_NOT" => IS_NOT
        | _ => IS
        },
      edge:
        switch (_edge) {
        | "VALUE" => VALUE
        | "PROPERTY" => PROPERTY
        | _ => SUBJECT
        },
    };
  };
  [@genType]
  let fromJson = (t: Js.Json.t) => t |> item_from_json;
};

module Filters = {
  [@genType.opaque]
  type t = list(fact);

  [@genType]
  let query = (q: Query.t, t) => t |> List.filter(Query.run(q));

  let find = (id, t) => t |> RList.find((e: fact) => e.id == id);
  let filter = List.filter;

  [@genType]
  let withQuery = query => filter(Query.run(query));
  let withEdge = (edge, id) => withQuery({edge, q: Query.IS, id});
  let withoutEdge = (edge, id) => withQuery({edge, q: Query.IS_NOT, id});
  let withSubject = id => withQuery({edge: SUBJECT, q: Query.IS, id});
  let withoutSubject = id => withQuery({edge: SUBJECT, q: Query.IS_NOT, id});
  let withProperty = id => withQuery({edge: PROPERTY, q: Query.IS, id});
  let withoutProperty = id =>
    withQuery({edge: PROPERTY, q: Query.IS_NOT, id});
  let withValue = id => withQuery({edge: VALUE, q: Query.IS, id});
  let withoutValue = id => withQuery({edge: VALUE, q: Query.IS_NOT, id});

  let withIdAsAnyEdge = id =>
    filter(
      Query.qOr([
        {edge: SUBJECT, q: Query.IS, id},
        {edge: PROPERTY, q: Query.IS, id},
        {edge: VALUE, q: Query.IS, id},
      ]),
    );

  let withIdAsNoEdge = id =>
    filter(
      Query.qAnd([
        {edge: SUBJECT, q: Query.IS_NOT, id},
        {edge: PROPERTY, q: Query.IS_NOT, id},
        {edge: VALUE, q: Query.IS_NOT, id},
      ]),
    );
};

[@genType]
let c = () => {a: "sdf", b: "sdfsdf"};