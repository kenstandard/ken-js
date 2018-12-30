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
           thingId: f.id.id,
           subjectId: f.subjectId.id,
           propertyId: f.propertyId.id,
           value: f.value,
         }: PrimaryGraph.fact
       )
     );

let listThings = (facts: SimpleFactList.graph): list(PrimaryGraph.thing) =>
  facts
  |> uniqueIds
  |> List.map((id: SimpleFactList.id) =>
       (
         {
           thingId: id.id,
           idIsPublic: id.isPublic,
           thingType: PrimaryGraph.Item,
         }: PrimaryGraph.thing
       )
     );