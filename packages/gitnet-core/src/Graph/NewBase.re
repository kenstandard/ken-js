module ThingId = {
  open Rationale.Function.Infix;

  type thingId = string;
  type baseId = string;
  type resourceId = string;
  type doubleId = (string, string);
  type trippleId = (string, string, string);

  /* Not Unique */
  type baseSingle = {baseId};

  /* Not Unique */
  type resourceDouble = {
    baseId,
    resourceId,
  };

  /* Not Unique */
  type thingTripple = {
    baseId,
    resourceId,
    thingId,
  };

  let uniqueBases = (t: list(thingTripple)): list(baseSingle) =>
    t
    |> Rationale.RList.uniqBy(e => e.baseId)
    |> List.map(e => ({baseId: e.baseId}: baseSingle));

  let doubleId = (baseId, resourceId) => (baseId, resourceId);

  let trippleId = (baseId, resourceId, itemId) => (
    baseId,
    resourceId,
    itemId,
  );

  let uniqueresources = (t: list(thingTripple)): list(resourceDouble) =>
    t
    |> Rationale.RList.uniqBy(e => (e.baseId, e.resourceId))
    |> List.map(e =>
         ({baseId: e.baseId, resourceId: e.resourceId}: resourceDouble)
       );

  let uniqueIds = t =>
    t |> Rationale.RList.uniqBy(e => (e.baseId, e.resourceId, e.thingId));

  let array_to_tripple = r =>
    switch (r) {
    | [|a, b, c|] => Some({baseId: a, resourceId: b, thingId: c})
    | _ => None
    };

  let string_to_thingId = Js.String.split(".") ||> array_to_tripple;
};

module Graph = {
  open ThingId;

  type value =
    | Thing(trippleId)
    | String(string)
    | JSON(Js.Json.t);

  type fact = {
    subject: trippleId,
    property: trippleId,
    value,
  };

  type thingType =
    | Fact(fact)
    | Base(baseSingle)
    | Resource(resourceDouble)
    | None;

  type thing = {
    thingId: thingTripple,
    idIsPublic: bool,
    thingType,
  };

  module ThingTrippleComparable =
    Belt.Id.MakeComparable({
      type t = thingTripple;
      let cmp: (t, t) => int = Pervasives.compare;
    });

  let thingSet = Belt.Set.make(~id=(module ThingTrippleComparable));

  type thingMap =
    Belt.Map.t(
      ThingTrippleComparable.t,
      thing,
      ThingTrippleComparable.identity,
    );

  module Things = {};

  type graph = {
    things: thingMap,
    bases: list(baseSingle),
    resources: list(resourceDouble),
  };
};

module SimpleFacts = {
  open ThingId;

  type trippleId = {
    id: string,
    isPublic: bool,
  };

  type value =
    | String(string)
    | JSON(Js.Json.t);

  type fact = {
    id: trippleId,
    subjectId: trippleId,
    propertyId: trippleId,
    value,
  };
};

module IdParser = {
  open Rationale.Function.Infix;
  type tripple = {
    baseId: string,
    resourceId: string,
    itemId: string,
    isPublic: bool,
  };

  let array_to_tripple = (isPublic, r) =>
    switch (r) {
    | [|a, b, c|] => Some({baseId: a, resourceId: b, itemId: c, isPublic})
    | _ => None
    };

  let parse = isPublic =>
    Js.String.split(".") ||> array_to_tripple(isPublic);
};

let converter = (fs: list(SimpleFacts.fact)) => {
  open Rationale.Option;
  open Rationale.RList;
  open IdParser;

  let thingIds =
    fs
    |> List.map((r: SimpleFacts.fact) => [r.id, r.subjectId, r.propertyId])
    |> List.concat
    |> List.map((r: SimpleFacts.trippleId) =>
         ThingId.string_to_thingId(r.id)
       )
    |> List.filter(isSome)
    |> List.map(toExn(""))
    |> ThingId.uniqueIds;

  let facts = fs |> List.map(r => 3);
  ();
};
/* let foo = Str.split(regexp ",", "fff,sdfsdf,sdfsdf") */