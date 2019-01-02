[@genType]
let run =
  Rationale.Function.Infix.(
    JsonToUnprocessed.run
    ||> UncompressedToAST.run
    ||> ADT.run
    ||> ADTToSimple.run
    ||> SimpleToPrimary.run
  );