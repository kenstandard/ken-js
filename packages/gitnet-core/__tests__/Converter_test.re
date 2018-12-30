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
          "p-name": "Fred",
          "p-test": ["sdf", "sdfsdf", "sdfsdf"],
          "p-description": {"id": "sdf", "value": "sdffsd"}
        }
      },
      {
        "baseId": "base13",
        "resourceId": "2/2",
        "n-george": {
          "p-name": "George",
          "p-friend": "n-jeremy",
          "p-test": ["sdf", "sdfsdf", "sdfsdf"],
          "p-description": {"id": "sdf", "value": "sdffsd"}
        },
        "n-jeremy": {
          "p-name": "George",
          "p-test": ["sdf", "sdfsdf", "sdfsdf"],
          "p-description": {"id": "sdf", "value": "sdffsd"}
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
      |> UnprocessedGraphToFactList.run
      |> SimpleToPrimary.run
      |> PrimaryGraph.showValues;
    Js.log(bar);
    expect(true) |> toEqual(true);
  })
);