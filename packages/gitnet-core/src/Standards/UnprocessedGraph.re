type value =
  | String(string)
  | Array(array(string));

/* Note that the thing ID is not in the fact. */
/* Change import area. */
[@bs.deriving jsConverter]
type fact = {
  id: option(string),
  property: string,
  baseId: string,
  resourceId: string,
  value,
};

[@bs.deriving jsConverter]
type thing = {
  id: string,
  baseId: string,
  resourceId: string,
  facts: array(fact),
  templates: array(string),
};

type graph = array(thing);

let showFacts = (g: graph) =>
  g |> Array.map(r => r.facts) |> Belt.Array.concatMany |> Array.map(factToJs);