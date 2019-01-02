[@genType]
let run =
  Rationale.Function.Infix.(
    CompressedImporter__FromJson.run
    ||> CompressedImporter__ToAST.run
    ||> Compiler_Run.run
    ||> Compiler_Run.toSimple
    ||> SimpleFactList_ToGraph.run
  );