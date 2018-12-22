// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var RList$Rationale = require("rationale/src/RList.js");
var Option$Rationale = require("rationale/src/Option.js");
var Function$Rationale = require("rationale/src/Function.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function getId(thing) {
  return thing[0][/* id */0];
}

var isEqual = Caml_obj.caml_equal;

function subjectId(t) {
  return t[/* subjectId */1];
}

function propertyId(t) {
  return t[/* propertyId */2];
}

var partial_arg = Function$Rationale.Infix[/* ||> */1];

function hasSubjectId(param) {
  return partial_arg(subjectId, isEqual, param);
}

var partial_arg$1 = Function$Rationale.Infix[/* ||> */1];

function hasPropertyId(param) {
  return partial_arg$1(propertyId, isEqual, param);
}

function value(t) {
  return t[/* value */3];
}

function id(t) {
  return t[/* id */0];
}

function graph(t) {
  return t[/* graph */4];
}

var Fact = /* module */[
  /* subjectId */subjectId,
  /* propertyId */propertyId,
  /* hasSubjectId */hasSubjectId,
  /* hasPropertyId */hasPropertyId,
  /* value */value,
  /* id */id,
  /* graph */graph
];

function id$1(t) {
  return t[/* id */0];
}

function graph$1(t) {
  return t[/* graph */1];
}

var Nonfact = /* module */[
  /* id */id$1,
  /* graph */graph$1
];

function isFact(t) {
  if (t.tag) {
    return false;
  } else {
    return true;
  }
}

var partial_arg$2 = Function$Rationale.Infix[/* ||> */1];

function isNonfact(param) {
  return partial_arg$2(isFact, (function (e) {
                return !e;
              }), param);
}

function toFactExt(t) {
  if (t.tag) {
    throw [
          Caml_builtin_exceptions.failure,
          "Assumed nonfact was fact"
        ];
  } else {
    return t[0];
  }
}

function toNonFactExt(t) {
  if (t.tag) {
    return t[0];
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "Assumed fact was nonfact"
        ];
  }
}

function bimap(fn1, fn2, t) {
  var match = isFact(t);
  if (match) {
    return Curry._1(fn1, toFactExt(t));
  } else {
    return Curry._1(fn2, toNonFactExt(t));
  }
}

function id$2(param) {
  return bimap(id, id$1, param);
}

function graph$2(param) {
  return bimap(graph, graph$1, param);
}

var Thing = /* module */[
  /* isFact */isFact,
  /* isNonfact */isNonfact,
  /* toFactExt */toFactExt,
  /* toNonFactExt */toNonFactExt,
  /* bimap */bimap,
  /* id */id$2,
  /* graph */graph$2
];

function build(param) {
  var empty = /* record */[/* things : [] */0];
  var nonfacts = List.map((function (e) {
          return /* record */[
                  /* id */e,
                  /* graph */empty
                ];
        }), /* :: */[
        "1",
        /* :: */[
          "2",
          /* :: */[
            "3",
            /* [] */0
          ]
        ]
      ]);
  var facts = List.map((function (param) {
          return /* record */[
                  /* id */param[0],
                  /* subjectId */param[1],
                  /* propertyId */param[2],
                  /* value */param[3],
                  /* graph */empty
                ];
        }), /* :: */[
        /* tuple */[
          "0",
          "1",
          "2",
          "sdfsdf"
        ],
        /* :: */[
          /* tuple */[
            "8",
            "1",
            "3",
            "bar"
          ],
          /* [] */0
        ]
      ]);
  var graph = /* record */[/* things */List.append(List.map((function (e) {
                return /* Fact */Block.__(0, [e]);
              }), facts), List.map((function (e) {
                return /* Nonfact */Block.__(1, [e]);
              }), nonfacts))];
  for(var x = 0 ,x_finish = List.length(nonfacts); x <= x_finish; ++x){
    List.nth(nonfacts, x)[/* graph */1] = graph;
  }
  for(var x$1 = 0 ,x_finish$1 = List.length(facts); x$1 <= x_finish$1; ++x$1){
    List.nth(facts, x$1)[/* graph */4] = graph;
  }
  return graph;
}

function things(g) {
  return g[/* things */0];
}

var partial_arg$3 = List.filter(isFact);

var partial_arg$4 = Function$Rationale.Infix[/* ||> */1];

function partial_arg$5(param) {
  return partial_arg$4(things, partial_arg$3, param);
}

var partial_arg$6 = Function$Rationale.Infix[/* ||> */1];

function facts(param) {
  return partial_arg$6(partial_arg$5, (function (param) {
                return List.map(toFactExt, param);
              }), param);
}

var partial_arg$7 = List.filter(isNonfact);

var partial_arg$8 = Function$Rationale.Infix[/* ||> */1];

function partial_arg$9(param) {
  return partial_arg$8(things, partial_arg$7, param);
}

var partial_arg$10 = Function$Rationale.Infix[/* ||> */1];

function nonfacts(param) {
  return partial_arg$10(partial_arg$9, (function (param) {
                return List.map(toNonFactExt, param);
              }), param);
}

function findFact(g, id) {
  return RList$Rationale.find((function (e) {
                return e[/* id */0] === id;
              }), Curry._1(facts, g));
}

function findNonfact(g, id) {
  return RList$Rationale.find((function (e) {
                return e[/* id */0] === id;
              }), Curry._1(nonfacts, g));
}

function findFactsWithSubject(id) {
  var partial_arg = Function$Rationale.Infix[/* ||> */1];
  var partial_arg$1 = List.filter((function (param) {
          return partial_arg(subjectId, (function (param) {
                        return Caml_obj.caml_equal(id, param);
                      }), param);
        }));
  var partial_arg$2 = Function$Rationale.Infix[/* ||> */1];
  return (function (param) {
      return partial_arg$2(facts, partial_arg$1, param);
    });
}

function findFactsWithProperty(id) {
  var partial_arg = Function$Rationale.Infix[/* ||> */1];
  var partial_arg$1 = List.filter((function (param) {
          return partial_arg(propertyId, (function (param) {
                        return Caml_obj.caml_equal(id, param);
                      }), param);
        }));
  var partial_arg$2 = Function$Rationale.Infix[/* ||> */1];
  return (function (param) {
      return partial_arg$2(facts, partial_arg$1, param);
    });
}

function findThingWithId(id$3) {
  var partial_arg = Function$Rationale.Infix[/* ||> */1];
  var partial_arg$1 = function (param) {
    return partial_arg(id$2, (function (param) {
                  return Caml_obj.caml_equal(id$3, param);
                }), param);
  };
  var partial_arg$2 = function (param) {
    return RList$Rationale.find(partial_arg$1, param);
  };
  var partial_arg$3 = Function$Rationale.Infix[/* ||> */1];
  return (function (param) {
      return partial_arg$3(things, partial_arg$2, param);
    });
}

var Graph = /* module */[
  /* build */build,
  /* things */things,
  /* facts */facts,
  /* nonfacts */nonfacts,
  /* findFact */findFact,
  /* findNonfact */findNonfact,
  /* findFactsWithSubject */findFactsWithSubject,
  /* findFactsWithProperty */findFactsWithProperty,
  /* findThingWithId */findThingWithId
];

function findFactsWithSubject$1(a, __x) {
  return findFactsWithSubject(__x)(a[/* graph */4]);
}

function findFactsWithProperty$1(a, __x) {
  return findFactsWithProperty(__x)(a[/* graph */4]);
}

function findThingWithId$1(a, __x) {
  return findThingWithId(__x)(a[/* graph */4]);
}

function findProperty(t) {
  return Curry._2(Option$Rationale.Infix[/* <$> */1], findThingWithId$1(t, t[/* propertyId */2]), toNonFactExt);
}

function findSubject(t) {
  return findThingWithId$1(t, t[/* subjectId */1]);
}

var FactWithGraph = /* module */[
  /* findFactsWithSubject */findFactsWithSubject$1,
  /* findFactsWithProperty */findFactsWithProperty$1,
  /* findThingWithId */findThingWithId$1,
  /* findProperty */findProperty,
  /* findSubject */findSubject
];

function unpackOptionList(e) {
  return List.map((function (param) {
                return Option$Rationale.toExn("mistake", param);
              }), List.filter(Option$Rationale.isSome)(e));
}

function isSubjectForFacts(t) {
  var __x = bimap(id, id$1, t);
  return findFactsWithSubject(__x)(bimap(graph, graph$1, t));
}

function isPropertyForFacts(t) {
  var __x = bimap(id, id$1, t);
  return findFactsWithProperty(__x)(bimap(graph, graph$1, t));
}

function propertyNonfacts(t) {
  return unpackOptionList(List.map(findProperty, isSubjectForFacts(t)));
}

var ThingWithGraph = /* module */[
  /* isSubjectForFacts */isSubjectForFacts,
  /* isPropertyForFacts */isPropertyForFacts,
  /* propertyNonfacts */propertyNonfacts
];

exports.getId = getId;
exports.isEqual = isEqual;
exports.Fact = Fact;
exports.Nonfact = Nonfact;
exports.Thing = Thing;
exports.Graph = Graph;
exports.FactWithGraph = FactWithGraph;
exports.unpackOptionList = unpackOptionList;
exports.ThingWithGraph = ThingWithGraph;
/* partial_arg Not a pure module */
