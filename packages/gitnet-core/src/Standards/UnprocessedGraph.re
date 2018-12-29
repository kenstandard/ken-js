type value =
  | String(string)
  | Array(array(string));

/* Note that the thing ID is not in the fact. */
type fact = {
  id: option(string),
  property: string,
  baseId: string,
  resourceId: string,
  value,
};

type thing = {
  id: string,
  baseId: string,
  resourceId: string,
  facts: array(fact),
  templates: array(string),
};

type graph = array(thing);