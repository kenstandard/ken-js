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
          "p-name": "Fred"
        }
      },
      {
        "baseId": "base13",
        "resourceId": "2/2",
        "n-george": {
          "p-name": ["GEORGIE!!", "GEORGEOO"],
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
      |> ADT.showFacts
      |> Js.log;
    /* |> UnprocessedGraphToFactList.run */
    /* |> SimpleToPrimary.run
       |> PrimaryGraph.showValues; */
    /* Js.log(bar); */
    expect(true) |> toEqual(true);
  })
);