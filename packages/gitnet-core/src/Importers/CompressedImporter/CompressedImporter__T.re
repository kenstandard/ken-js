type value =
  | String(string)
  | Array(array(string));

/* Note that the thing ID is not in the fact. */
/* Change import area. */
[@bs.deriving jsConverter]
type fact = {
  id: option(string),
  property: string,
  value,
};

[@bs.deriving jsConverter]
type thing = {
  id: string,
  facts: array(fact),
  templates: array(string),
};

type package = {
  things: array(thing),
  baseId: string,
  resourceId: string,
};

type graph = array(package);