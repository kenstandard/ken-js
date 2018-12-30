type thingId = string;
type valueType = PrimaryGraph.valueType;
type value = PrimaryGraph.value;

type id = {
  id: string,
  baseId: string,
  isPublic: bool,
};

[@bs.deriving jsConverter]
type fact = {
  id,
  subjectId: id,
  propertyId: id,
  value,
};

type graph = list(fact);

let showFacts = (g: graph) => g |> Array.of_list |> Array.map(factToJs);