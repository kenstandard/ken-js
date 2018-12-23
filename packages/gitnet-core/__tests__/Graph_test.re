open Jest;

open Expect;
open Index;
open Graph;

let testData = [
  ("0", "n-george", "p-name", "George"),
  ("1", "n-cindy", "p-name", "Cindy"),
  ("2", "p-name", "p-name", "Name of Item"),
];

let graph = build(testData);

/* Js.log(
     graph |> things |> List.map(Base.Thing.to_s) |> String.concat(","),
   ); */

describe("#build", () => {
  test("creates correct number of things", () =>
    expect(graph |> things |> List.length) |> toEqual(6)
  );

  test("creates correct number of facts", () =>
    expect(graph |> facts |> List.length) |> toEqual(3)
  );
});

describe("#findFact", () =>
  test("finds correct fact", () => {
    let fact = graph |> findFact("0");
    let expected: Reason.Base.fact = {
      id: "0",
      subjectId: "n-george",
      propertyId: "p-name",
      value: "George",
    };
    expect(fact) |> toEqual(Some(expected));
  })
);

describe("#findThing", () =>
  test("finds correct thing", () => {
    let id =
      graph |> findThing("n-george") |> Rationale.Option.fmap(Base.Thing.id);
    expect(id) |> toEqual(Some("n-george"));
  })
);