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
           baseId: id.baseId,
           idIsPublic: id.isPublic,
           thingType: PrimaryGraph.Item,
         }: PrimaryGraph.thing
       )
     );

let run = (facts: SimpleFactList.graph): PrimaryGraph.graph => {
  bases:
    facts
    |> listThings
    |> List.map((r: PrimaryGraph.thing) => r.baseId)
    |> Rationale.RList.uniq,
  things:
    facts
    |> listThings
    |> List.map((r: PrimaryGraph.thing) => (r.thingId, r))
    |> Js.Dict.fromList,
  facts:
    facts
    |> listFacts
    |> List.map((r: PrimaryGraph.fact) => (r.thingId, r))
    |> Js.Dict.fromList,
};