[@genType]
let run =
  Rationale.Function.Infix.(
    CompressedImporter__FromJson.run
    ||> CompressedImporter__ToAST.run
    ||> SimpleFactList_ToGraph.run
  );