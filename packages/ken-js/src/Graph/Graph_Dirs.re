open Graph_T.T;
open Graph_T;

type t = Graph_T.T.t;

let bases = t => t.bases;

let makeDirs = (t: t): t => {
  let allThingIdStrings =
    t.things
    |> Js.Dict.values
    |> Array.to_list
    |> List.map(e => e.thingId.thingIdString);

  let possibleUniqueIds =
    Rationale.Function.Infix.(
      List.map(Directory.parent)
      ||> List.filter(e => !Directory.isFactDirectory(e))
      ||> List.map(Directory.allSubdirectories)
      ||> List.concat
      ||> Rationale.RList.uniq
    );

  let directories = allThingIdStrings |> possibleUniqueIds;

  {...t, directories};
};