// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Graph_T$Reason = require("./Graph_T.bs.js");
var Option$Rationale = require("rationale/src/Option.js");
var Graph_Graph$Reason = require("./Graph_Graph.bs.js");
var Graph_Fact_Filters$Reason = require("./Graph_Fact_Filters.bs.js");

function init(g, t) {
  return /* record */[
          /* graph */g,
          /* list */Curry._1(Graph_T$Reason.F[/* factList */5], g),
          /* thing */t
        ];
}

function findFromList(id, t) {
  return List.find((function (e) {
                return e[/* thingId */0][/* thingIdString */0] === id;
              }), t);
}

function unpackOptionList(e) {
  return List.map((function (param) {
                return Option$Rationale.toExn("mistake", param);
              }), List.filter(Option$Rationale.isSome)(e));
}

function filterFacts(filter, t) {
  return /* record */[
          /* graph */t[/* graph */0],
          /* list */Curry._2(filter, Graph_T$Reason.Thing[/* id */0](t[/* thing */2]), t[/* list */1]),
          /* thing */t[/* thing */2]
        ];
}

function facts(param) {
  return filterFacts(Graph_Fact_Filters$Reason.withIdAsAnyEdge, param);
}

function isEdgeForFacts(edge) {
  return (function (param) {
      return filterFacts((function (param) {
                    return Graph_Fact_Filters$Reason.withEdge(edge, param);
                  }), param);
    });
}

function filterFactsAndSelectThings(fromEdge, toEdge, t) {
  var partial_arg = t[/* graph */0];
  return unpackOptionList(List.map((function (param) {
                    return Graph_Graph$Reason.findThingFromFact(partial_arg, toEdge, param);
                  }), filterFacts((function (param) {
                          return Graph_Fact_Filters$Reason.withEdge(fromEdge, param);
                        }), t)[/* list */1]));
}

function connectedPropertyThings(param) {
  return filterFactsAndSelectThings(/* SUBJECT */0, /* PROPERTY */1, param);
}

function connectedSubjectThings(param) {
  return filterFactsAndSelectThings(/* PROPERTY */1, /* SUBJECT */0, param);
}

function connectedPropertyWithId(id, t) {
  return findFromList(id, filterFactsAndSelectThings(/* SUBJECT */0, /* PROPERTY */1, t));
}

function connectedSubjectWithId(id, t) {
  return findFromList(id, filterFactsAndSelectThings(/* PROPERTY */1, /* SUBJECT */0, t));
}

var Internal = /* module */[
  /* findFromList */findFromList,
  /* unpackOptionList */unpackOptionList,
  /* filterFacts */filterFacts,
  /* facts */facts,
  /* isEdgeForFacts */isEdgeForFacts,
  /* filterFactsAndSelectThings */filterFactsAndSelectThings,
  /* connectedPropertyThings */connectedPropertyThings,
  /* connectedSubjectThings */connectedSubjectThings,
  /* connectedPropertyWithId */connectedPropertyWithId,
  /* connectedSubjectWithId */connectedSubjectWithId
];

exports.init = init;
exports.Internal = Internal;
/* Option-Rationale Not a pure module */
