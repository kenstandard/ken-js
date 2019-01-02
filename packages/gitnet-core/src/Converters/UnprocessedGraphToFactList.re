type unprocessedGraph = UnprocessedGraph.graph;

let convertId = (id, resourceId, baseId) => {
  let idd = id |> Rationale.Option.default("random-id");
  baseId ++ "/" ++ resourceId ++ "/" ++ idd;
};

let generateFactId = thingId =>
  thingId
  ++ "/"
  ++ "_f/"
  ++ SecureRandomString.genSync(~length=12, ~alphaNumeric=true, ());

/* Step 1: Make graph of Ids: properties and values
   Step 2: Mutate ids of subjects
   Step 3: Mutate ids of facts */

let convertIds = (g: unprocessedGraph): unprocessedGraph =>
  UnprocessedGraph.(
    g
    |> Array.map(r =>
         {
           ...r,
           id: convertId(Some(r.id), r.resourceId, r.baseId),
           facts:
             r.facts
             |> Array.map((f: fact) =>
                  {
                    ...f,
                    id:
                      Some(
                        generateFactId(
                          convertId(Some(r.id), r.resourceId, r.baseId),
                        ),
                      ),
                    property:
                      convertId(Some(f.property), f.resourceId, f.baseId),
                  }
                ),
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

let shape = (g: unprocessedGraph): SimpleFactList.graph =>
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
                    Graph_T.T.String(
                      switch (fact.value) {
                      | String(str) => str
                      | _ => "ERROR"
                      },
                    ),
                },
                id: {
                  id: fact.id |> Rationale.Option.toExn("ERROR"),
                  baseId: fact.baseId,
                  isPublic: false,
                },
              }: SimpleFactList.fact
            )
          )
     )
  |> Belt.Array.concatMany
  |> Array.to_list;

let run = Rationale.Function.Infix.(flattenValues ||> convertIds ||> shape);