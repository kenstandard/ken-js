let convertId = (f: ADT.Graph.thingId): SimpleFactList.id => {
  id: f.updatedId |> Rationale.Option.toExn(""),
  baseId: f.baseId |> Rationale.Option.toExn(""),
  isPublic: false,
};

let run = (g: ADT.Graph.graph): SimpleFactList.graph =>
  g
  |> List.map((f: ADT.Graph.fact) =>
       (
         {
           id: convertId(f.thingId),
           subjectId: convertId(f.subjectId),
           propertyId: convertId(f.propertyId),
           value: {
             valueType:
               switch (f.value) {
               | String(str) => PrimaryGraph.String(str)
               | Id(id) =>
                 PrimaryGraph.Thing(
                   id.updatedId |> Rationale.Option.toExn("Error"),
                 )
               },
           },
         }: SimpleFactList.fact
       )
     );