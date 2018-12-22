type nonfact = {
  id: string,
  mutable graph,
}
and fact = {
  id: string,
  subjectId: string,
  propertyId: string,
  value: string,
  mutable graph,
}
and thing =
  | Fact(fact)
  | Nonfact(nonfact)
and graph = {things: list(thing)};

let getId = thing =>
  switch (thing) {
  | Fact(f) => f.id
  | Nonfact(f) => f.id
  };

let find = (a, id) => List.find(e => getId(e) == id, a);

let buildGraph = () => {
  let ffacts = [("0", "1", "2", "sdfsdf"), ("8", "1", "3", "bar")];
  let nodes = ["1", "2", "3"];
  let empty = {things: []};
  let nonfacts = nodes |> List.map(e => {id: e, graph: empty});
  let facts =
    ffacts
    |> List.map(((a, b, c, d)) =>
         {id: a, subjectId: b, propertyId: c, value: d, graph: empty}
       );
  let graph = {
    things:
      List.append(
        facts |> List.map(e => Fact(e)),
        nonfacts |> List.map(e => Nonfact(e)),
      ),
  };
  for (x in 0 to List.length(nonfacts)) {
    List.nth(nonfacts, x).graph = graph;
  };
  for (x in 0 to List.length(facts)) {
    List.nth(facts, x).graph = graph;
  };
  graph;
};