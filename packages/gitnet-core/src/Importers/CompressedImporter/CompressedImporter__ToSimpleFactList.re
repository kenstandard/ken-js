type unprocessedGraph = CompressedImporter__T.graph;

let valueToArray = value =>
  switch (value) {
  | CompressedImporter__T.String(str) => [|str|]
  | CompressedImporter__T.Array(strs) => strs
  };

let flattenValues = (g: unprocessedGraph): unprocessedGraph =>
  CompressedImporter__T.(
    g
    |> Array.map((package: CompressedImporter__T.package) =>
         {
           ...package,
           things:
             package.things
             |> Array.map(r =>
                  {
                    ...r,
                    facts:
                      r.facts
                      |> Array.map((f: fact) =>
                           f.value
                           |> valueToArray
                           |> Array.map(value =>
                                {...f, value: String(value)}
                              )
                         )
                      |> Belt.Array.concatMany,
                  }
                ),
         }
       )
  );

let shape = (g: unprocessedGraph): list(Compiler_AST.package) =>
  g
  |> Array.map((package: CompressedImporter__T.package) =>
       package.things
       |> Array.map((thing: CompressedImporter__T.thing) =>
            (
              {
                let fs =
                  thing.facts
                  |> Array.map((fact: CompressedImporter__T.fact) =>
                       (
                         {
                           thingId: Compiler_Run.makeThingId(fact.id),
                           subjectId:
                             Compiler_Run.makeThingId(Some(thing.id)),
                           propertyId:
                             Compiler_Run.makeThingId(Some(fact.property)),
                           value:
                             Compiler_AST.String(
                               switch (fact.value) {
                               | String(str) => str
                               | _ => "ERROR"
                               },
                             ),
                         }: Compiler_AST.fact
                       )
                     );
                {
                  facts: fs |> Array.to_list,
                  baseId: package.baseId,
                  resourceId: package.resourceId,
                  aliases: package.aliases,
                };
              }: Compiler_AST.package
            )
          )
     )
  |> Belt.Array.concatMany
  |> Array.to_list;

let combinePackages =
    (packages: list(Compiler_AST.package)): SimpleFactList_T.graph =>
  Rationale.Function.Infix.(
    packages
    |> List.map(Compiler_Run.run ||> Compiler_Run.toSimple)
    |> SimpleFactList_T.combine
  );

let run =
  Rationale.Function.Infix.(flattenValues ||> shape ||> combinePackages);