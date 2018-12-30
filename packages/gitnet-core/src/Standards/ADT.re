/* Algebraic Data Type */
type thingIdType =
  | FACT
  | NONFACT;

type thingId = {
  rawId: option(string),
  baseId: option(string),
  resourceId: option(string),
  mutable updatedId: option(string),
  mutable isExternal: option(bool),
  mutable thingIdType: option(thingIdType),
};

type value =
  | String(string)
  | Id(thingId);

type fact = {
  thingId,
  subjectId: thingId,
  propertyId: thingId,
  mutable value,
};

/* ADT ENDS HERE */
let makeThingId = (id, baseId, resourceId) => {
  rawId: id,
  updatedId: None,
  baseId: Some(baseId),
  resourceId: Some(resourceId),
  isExternal: None,
  thingIdType: None,
};

type graph = list(fact);

let thingIdKey = (e: thingId) => (e.rawId, e.baseId, e.resourceId);

let allPrimaryIds = (g: graph): list(thingId) =>
  g |> List.map(r => [r.thingId, r.subjectId, r.propertyId]) |> List.flatten;

let findUniqueIds = (g: graph): list(thingId) =>
  g |> allPrimaryIds |> Rationale.RList.uniqBy(thingIdKey);

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

let handleThingTypes = (g: graph) => {
  let ids = g |> allPrimaryIds;
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
/* |> List.map(r =>
        {
          ...r,
          thingId: {
            ...r.thingId,
            thingIdType: Some(FACT),
          },
        }
      )
   |> List.map(r =>
        {
          ...r,
          subjectId: {
            ...r.subjectId,
            thingIdType:
              switch (r.thingId.thingIdType) {
              | Some(FACT) => Some(FACT)
              | _ => Some(NONFACT)
              },
          },
        }
      ); */
/* let run =
   Rationale.Function.Infix.(
     useUniqueThingIds
     ||> handleThingTypes
     ||> handleIsExternal
     ||> handleUpdatedIds
   ); */