type unprocessedGraph = CompressedImporter__T.graph;

let valueToArray = value =>
  switch (value) {
  | CompressedImporter__T.String(str) => [|str|]
  | CompressedImporter__T.Array(strs) => strs
  };

let flattenValues = (g: unprocessedGraph): unprocessedGraph =>
  CompressedImporter__T.(
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

let shape = (g: unprocessedGraph): Compiler_AST.graph =>
  g
  |> Array.map((thing: CompressedImporter__T.thing) =>
       thing.facts
       |> Array.map((fact: CompressedImporter__T.fact) =>
            (
              {
                thingId:
                  Compiler_Run.makeThingId(
                    fact.id,
                    fact.baseId,
                    fact.resourceId,
                  ),
                subjectId:
                  Compiler_Run.makeThingId(
                    Some(thing.id),
                    thing.baseId,
                    thing.resourceId,
                  ),
                propertyId:
                  Compiler_Run.makeThingId(
                    Some(fact.property),
                    fact.baseId,
                    fact.resourceId,
                  ),
                value:
                  Compiler_AST.String(
                    switch (fact.value) {
                    | String(str) => str
                    | _ => "ERROR"
                    },
                  ),
              }: Compiler_AST.fact
            )
          )
     )
  |> Belt.Array.concatMany
  |> Array.to_list;

let run = Rationale.Function.Infix.(flattenValues ||> shape);