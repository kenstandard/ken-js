/* Algebraic Data Type */
module Graph = {
  type thingIdType =
    | FACT
    | NONFACT;

  [@bs.deriving jsConverter]
  type thingId = {
    rawId: option(string),
    baseId: option(string),
    resourceId: option(string),
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

  type graph = list(fact);
};

open Graph;

let makeThingId = (id, baseId, resourceId) => {
  rawId: id,
  updatedId: None,
  baseId: Some(baseId),
  resourceId: Some(resourceId),
  thingIdType: None,
  tag: None,
};

let thingIdKey = (e: thingId) => (e.rawId, e.baseId, e.resourceId, e.tag);

let allPrimaryIds = (g: graph): list(thingId) =>
  g |> List.map(r => [r.thingId, r.subjectId, r.propertyId]) |> List.flatten;

let findUniqueIds = (g: graph): list(thingId) =>
  g |> allPrimaryIds |> Rationale.RList.uniqBy(thingIdKey);

/* Make sure that all thing Ids are only represented once. */
/* Don't do this for facts! */
let tagFacts = g: graph => {
  g
  |> List.iter(fact =>
       fact.thingId.tag =
         Some(SecureRandomString.genSync(~length=12, ~alphaNumeric=true, ()))
     );
  g;
};

let useUniqueThingIds = g: graph => {
  let uniqueIds = findUniqueIds(g);
  let findId = thingId =>
    uniqueIds |> List.find(e => thingIdKey(e) == thingIdKey(thingId));
  g
  |> List.map(r =>
       {
         ...r,
         thingId: findId(r.thingId),
         subjectId: findId(r.subjectId),
         propertyId: findId(r.propertyId),
       }
     );
};

/* Mutate thing types to correct formats */
let handleThingTypes = (g: graph) => {
  let propertyOrSubjectType = (id: thingId) =>
    switch (id.thingIdType) {
    | Some(FACT) => Some(FACT)
    | _ => Some(NONFACT)
    };
  g
  |> List.iter(r => {
       let id = r.thingId;
       id.thingIdType = Some(FACT);
     });
  g
  |> List.iter(r => {
       let propertyId = r.propertyId;
       propertyId.thingIdType = propertyOrSubjectType(propertyId);
       let subjectId = r.subjectId;
       subjectId.thingIdType = propertyOrSubjectType(subjectId);
     });
  g;
};

let findId = (uniqueIds, thingId) =>
  uniqueIds |> List.find(e => thingIdKey(e) == thingIdKey(thingId));

/* TODO: Improve this with more logic. For one, it should check if the value thingId is external*/
let _convertValue = (uniqueIds, fact) =>
  switch (fact.value) {
  | Id(id) => Id(id)
  | String(str) =>
    uniqueIds
    |> Belt.List.getBy(_, e =>
         thingIdKey(e)
         == (Some(str), fact.thingId.baseId, fact.thingId.resourceId, None)
       )
    |> (
      e =>
        switch (e) {
        | Some(id) => Id(id)
        | _ => String(str)
        }
    )
  };

let linkValues = g: graph => {
  let uniqueIds = findUniqueIds(g);
  g |> List.iter(fact => fact.value = _convertValue(uniqueIds, fact));
  g;
};

let convertId = thingId => {
  open Rationale.Option;
  let rawId = thingId.rawId |> default("CHANGE_ME_SHOULD_BE_RANDOM");
  if (rawId |> String.get(_, 0) == "@".[0]) {
    Some(rawId);
  } else {
    "@"
    ++ (thingId.baseId |> toExn("BASE_ID_ERROR_89sjdf"))
    ++ "/"
    ++ (thingId.resourceId |> toExn("RESOURCE_ID_ERROR_89sjdf"))
    ++ "/"
    ++ rawId
    |> Rationale.Option.some;
  };
};

let generateFactId = (thingId, subjectId) =>
  (
    subjectId.updatedId
    |> Rationale.Option.toExn(
         "Subject ThingID expected to have updatedID by this point of pipeline",
       )
  )
  ++ "/_f/"
  ++ (thingId.tag |> Rationale.Option.default("ERROR"));

let handleUpdatedIds = g: graph => {
  let uniqueIds = findUniqueIds(g);
  uniqueIds
  |> List.iter(id =>
       switch (id.thingIdType) {
       | Some(NONFACT) => id.updatedId = convertId(id)
       | _ => ()
       }
     );

  g
  |> List.iter(fact =>
       fact.thingId.updatedId =
         Some(generateFactId(fact.thingId, fact.subjectId))
     );
  g;
};

let showFacts = (g: graph) => g |> Array.of_list |> Array.map(factToJs);
let showIds = (g: graph) =>
  g |> findUniqueIds |> Array.of_list |> Array.map(thingIdToJs);

let run =
  Rationale.Function.Infix.(
    tagFacts
    ||> useUniqueThingIds
    ||> handleThingTypes
    ||> linkValues
    ||> handleUpdatedIds
  );