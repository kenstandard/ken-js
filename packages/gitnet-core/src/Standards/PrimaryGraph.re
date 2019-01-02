type thingIdString = string;

type baseId = string;

type valueType =
  | String(string)
  | ThingId(thingIdString)
  | JSON(Js.Json.t);

[@bs.deriving jsConverter]
type value = {valueType};

[@bs.deriving jsConverter]
type fact = {
  thingIdString,
  subjectId: thingIdString,
  propertyId: thingIdString,
  value,
};

type thingTypes =
  | FACT
  | BASE
  | ITEM;

type thingType =
  | Fact(fact)
  | Item;

type thingId = {
  thingIdString,
  isPublic: bool,
  baseId,
};

[@bs.deriving jsConverter]
type thing = {
  thingId,
  thingType,
};

type graph = {
  things: Js.Dict.t(thing),
  facts: Js.Dict.t(fact),
  bases: list(thingIdString),
};

let showFacts = (g: graph) =>
  g.facts |> Js.Dict.values |> Array.map(factToJs);

let showThings = (g: graph) =>
  g.things |> Js.Dict.values |> Array.map(thingToJs);

let showValues = (g: graph) =>
  g.facts |> Js.Dict.values |> Array.map(f => f.value) |> Array.map(valueToJs);

/* TODO: Fix baseId and resource if needed */
/* let toBase = (g: graph): Base.graph => {
     let empty: Base.graph = {
       things: Js.Dict.empty(),
       facts: Js.Dict.empty(),
       bases: [],
     };
     let facts: Base.facts =
       g.facts
       |> Js.Dict.values
       |> Array.map((f: fact) =>
            (
              f.thingIdString,
              {
                thingIdString: f.thingIdString,
                value:
                  switch (f.value.valueType) {
                  | String(str) => Base.String(str)
                  | ThingId(str) => Base.ThingId(str)
                  | JSON(r) => Base.JSON(r)
                  },
                subjectId: f.subjectId,
                propertyId: f.propertyId,
              }: Base.fact,
            )
          )
       |> Js.Dict.fromArray;
     let things: Base.things =
       g.things
       |> Js.Dict.values
       |> Array.map((f: thing) =>
            (
              f.thingId.thingIdString,
              {
                thingId: {
                  thingIdString: f.thingId.thingIdString,
                  isPublic: true,
                  baseId: "FALSSSE",
                },
                thingType: Item,
              }: Base.thing,
            )
          )
       |> Js.Dict.fromArray;
     {things, facts, bases: []};
   }; */