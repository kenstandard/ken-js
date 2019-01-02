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
               | String(str) => Graph_T.T.String(str)
               | Id(id) =>
                 Graph_T.T.ThingId(
                   id.updatedId |> Rationale.Option.toExn("Error"),
                 )
               },
           },
         }: SimpleFactList.fact
       )
     );