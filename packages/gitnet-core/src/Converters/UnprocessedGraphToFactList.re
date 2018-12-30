type unprocessedGraph = UnprocessedGraph.graph;

let convertId = (id, resourceId, baseId) => {
  let idd = id |> Rationale.Option.default("random-id");
  baseId ++ "/" ++ resourceId ++ "/" ++ idd;
};

let convertIds = (g: unprocessedGraph): unprocessedGraph =>
  UnprocessedGraph.(
    g
    |> Array.map(r =>
         {
           ...r,
           id: convertId(Some(r.id), r.resourceId, r.baseId),
           facts: r.facts |> Array.map((f: fact) => {...f, id: f.id}),
         }
       )
  );

let valueToArray = value =>
  switch (value) {
  | UnprocessedGraph.String(str) => [|str|]
  | UnprocessedGraph.Array(strs) => strs
  };

let flattenValues = (g: unprocessedGraph): unprocessedGraph =>
  UnprocessedGraph.(
    g
    |> Array.map(r =>
         {
           ...r,
           facts:
             r.facts
             |> Array.map((f: fact) =>
                  f.value
                  |> valueToArray
                  |> Array.map(value => {...f, value: String(value)})
                )
             |> Belt.Array.concatMany,
         }
       )
  );

let lastStepConvert = (g: unprocessedGraph): SimpleFactList.graph =>
  g
  |> Array.map((thing: UnprocessedGraph.thing) =>
       thing.facts
       |> Array.map((fact: UnprocessedGraph.fact) =>
            (
              {
                subjectId: {
                  id: thing.id,
                  baseId: thing.baseId,
                  isPublic: true,
                },
                propertyId: {
                  id: fact.property,
                  baseId: fact.baseId,
                  isPublic: true,
                },
                value: {
                  valueType:
                    PrimaryGraph.String(
                      switch (fact.value) {
                      | String(str) => str
                      | _ => "ERROR"
                      },
                    ),
                },
                id: {
                  id: "fact-id-implement-me!",
                  baseId: fact.baseId,
                  isPublic: false,
                },
              }: SimpleFactList.fact
            )
          )
     )
  |> Belt.Array.concatMany
  |> Array.to_list;

let run =
  Rationale.Function.Infix.(convertIds ||> flattenValues ||> lastStepConvert);