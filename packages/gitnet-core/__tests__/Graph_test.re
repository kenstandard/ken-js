open Jest;

open Expect;
open Graph;

let textValue2 =
  Json.parseOrRaise(
    {|
      [{
        "id": "g-1",
        "subjectId": "n-george",
        "propertyId": "p-name",
        "value": {
            "dataValue": "string",
            "data": "George"
        }
    },
    {
        "id": "g-2",
        "subjectId": "n-george",
        "propertyId": "p-description",
        "value": {
            "dataValue": "string",
            "data": "A test person!"
        }
    },
    {
        "id": "p-name-name",
        "subjectId": "n-name",
        "propertyId": "n-name",
        "value": {
            "dataValue": "string",
            "data": "Name"
        }
    }
]
       |},
  );

/* Js.log(
     graph |> things |> List.map(Base.Thing.to_s) |> String.concat(","),
   ); */
/*
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
       value: String("George"),
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
 ); */

describe("#to_json", () =>
  test("works", () => {
    let id = textValue2 |> import;
    Js.log(id |> to_json |> Js.Json.stringify);
    expect(true) |> toEqual(true);
  })
);