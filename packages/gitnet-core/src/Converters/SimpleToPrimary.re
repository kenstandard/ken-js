let uniqueIds = (facts: SimpleFactList.graph): list(SimpleFactList.id) =>
  facts
  |> List.map((e: SimpleFactList.fact) => [e.id, e.subjectId, e.propertyId])
  |> List.flatten
  |> Rationale.RList.uniqBy((a: SimpleFactList.id) => a.id);

let findType =
    (id: SimpleFactList.id, facts: SimpleFactList.graph)
    : PrimaryGraph.thingTypes =>
  switch (id) {
  | {id} when facts |> List.exists((f: SimpleFactList.fact) => f.id.id == id) =>
    FACT
  | _ => ITEM
  };

let listFacts = (graph: SimpleFactList.graph): list(PrimaryGraph.fact) =>
  graph
  |> List.map((f: SimpleFactList.fact) =>
       (
         {
           thingIdString: f.id.id,
           subjectId: f.subjectId.id,
           propertyId: f.propertyId.id,
           value: f.value,
         }: PrimaryGraph.fact
       )
     );

/* TODO: Possibly delete. */
let possiblyConvertValueTypesToThing =
    (graph: PrimaryGraph.graph, value: PrimaryGraph.value) =>
  switch (value.valueType) {
  | String(s) =>
    graph.things |> Js.Dict.get(_, s) |> Rationale.Option.isSome ?
      PrimaryGraph.ThingId(s) : PrimaryGraph.String(s)
  | _ => value.valueType
  };

let connectValuesToFacts = (graph: PrimaryGraph.graph): PrimaryGraph.graph => {
  ...graph,
  facts:
    graph.facts
    |> Js.Dict.values
    |> Array.map((f: PrimaryGraph.fact) =>
         {
           ...f,
           value: {
             valueType: possiblyConvertValueTypesToThing(graph, f.value),
           },
         }
       )
    |> Array.to_list
    |> List.map((r: PrimaryGraph.fact) => (r.thingIdString, r))
    |> Js.Dict.fromList,
};

let listThings = (facts: SimpleFactList.graph): list(PrimaryGraph.thing) =>
  facts
  |> uniqueIds
  |> List.map((id: SimpleFactList.id) =>
       (
         {
           thingId: {
             thingIdString: id.id,
             baseId: id.baseId,
             isPublic: id.isPublic,
           },
           thingType: PrimaryGraph.Item,
         }: PrimaryGraph.thing
       )
     );

let run = (facts: SimpleFactList.graph): PrimaryGraph.graph =>
  PrimaryGraph.(
    {
      bases:
        facts
        |> listThings
        |> List.map((r: PrimaryGraph.thing) => r.thingId.baseId)
        |> Rationale.RList.uniq,
      things:
        facts
        |> listThings
        |> List.map((r: PrimaryGraph.thing) => (r.thingId.thingIdString, r))
        |> Js.Dict.fromList,
      facts:
        facts
        |> listFacts
        |> List.map((r: PrimaryGraph.fact) => (r.thingIdString, r))
        |> Js.Dict.fromList,
    }
    |> connectValuesToFacts
  );