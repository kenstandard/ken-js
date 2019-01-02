open Jest;

open Expect;

let value =
  Json.parseOrRaise(
    {|
      [
        {
        "baseId": "base12",
        "resourceId": "2/1",
        "n-fred": {
          "@p-name": "Fred"
        }
      },
      {
        "baseId": "base13",
        "resourceId": "2/2",
        "n-george": {
          "p-name": ["GEORGIE!!", "GEORGEOO", "sfdsdf"],
          "@foo/p-friend": "n-jeremy"
        },
        "n-jeremy": {
          "p-name": "George"
        }
      }]
   |},
  );

describe("#to_json", () =>
  test("works", () => {
    /* let foo = value |> JsonToUnprocessed.run |> UnprocessedGraph.showFacts; */
    let bar =
      value
      |> JsonToUnprocessed.run
      |> UncompressedToAST.run
      |> ADT.run
      |> ADTToSimple.run
      |> SimpleToPrimary.run;
    /* |> Js.log; */
    /* |> PrimaryGraph.toBase */
    /* |> Graph.to_json */
    expect(true) |> toEqual(true);
  })
);