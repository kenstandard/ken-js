type thingId = string;
type valueType = PrimaryGraph.valueType;
type value = PrimaryGraph.value;

type id = {
  id: string,
  baseId: string,
  isPublic: bool,
};

type fact = {
  id,
  subjectId: id,
  propertyId: id,
  value,
};

type graph = list(fact);