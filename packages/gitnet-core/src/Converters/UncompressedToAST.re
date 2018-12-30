type unprocessedGraph = UnprocessedGraph.graph;

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

let shape = (g: unprocessedGraph): ADT.graph =>
  g
  |> Array.map((thing: UnprocessedGraph.thing) =>
       thing.facts
       |> Array.map((fact: UnprocessedGraph.fact) =>
            (
              {
                thingId:
                  ADT.makeThingId(fact.id, fact.baseId, fact.resourceId),
                subjectId:
                  ADT.makeThingId(
                    Some(thing.id),
                    thing.baseId,
                    thing.resourceId,
                  ),
                propertyId:
                  ADT.makeThingId(
                    Some(fact.property),
                    fact.baseId,
                    fact.resourceId,
                  ),
                value:
                  ADT.String(
                    switch (fact.value) {
                    | String(str) => str
                    | _ => "ERROR"
                    },
                  ),
              }: ADT.fact
            )
          )
     )
  |> Belt.Array.concatMany
  |> Array.to_list;

let run = Rationale.Function.Infix.(flattenValues ||> shape);