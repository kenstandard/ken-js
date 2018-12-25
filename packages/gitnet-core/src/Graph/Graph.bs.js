// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Base$Reason = require("./Base.bs.js");
var Fact$Reason = require("./Fact.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var Config$Reason = require("./Config.bs.js");
var RList$Rationale = require("rationale/src/RList.js");
var Option$Rationale = require("rationale/src/Option.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");
var Function$Rationale = require("rationale/src/Function.js");

function from_facts(facts) {
  var nodes = RList$Rationale.uniq(List.flatten(List.map((function (e) {
                  return /* :: */[
                          e[/* id */0],
                          /* :: */[
                            e[/* subjectId */1],
                            /* :: */[
                              e[/* propertyId */2],
                              /* [] */0
                            ]
                          ]
                        ];
                }), facts)));
  var things = List.map((function (e) {
          return /* record */[
                  /* id */e,
                  /* graph : record */[
                    /* facts : [] */0,
                    /* things : [] */0
                  ]
                ];
        }), nodes);
  var graph = /* record */[
    /* facts */facts,
    /* things */things
  ];
  for(var x = 0 ,x_finish = List.length(things) - 1 | 0; x <= x_finish; ++x){
    List.nth(things, x)[/* graph */1] = graph;
  }
  return graph;
}

function toJs(s) {
  var match = Option$Rationale.isSome(s);
  if (match) {
    return "TRUE";
  } else {
    return "FALSE";
  }
}

var toJs2 = Js_null_undefined.fromOption;

function things(g) {
  return g[/* things */1];
}

function facts(g) {
  return g[/* facts */0];
}

function findFact(id) {
  var partial_arg = Fact$Reason.Filters[/* find */1];
  var partial_arg$1 = function (param) {
    return partial_arg(id, param);
  };
  var partial_arg$2 = Function$Rationale.Infix[/* ||> */1];
  return (function (param) {
      return partial_arg$2(facts, partial_arg$1, param);
    });
}

function findThing(id, g) {
  return Base$Reason.Thing[/* find */2](id, g[/* things */1]);
}

function findThingFromFact(g, edge, f) {
  return findThing(Fact$Reason.T[/* edgeId */2](edge)(f), g);
}

var partial_arg = Fact$Reason.T[/* from_json */6];

function from_json(param) {
  return Json_decode.list(partial_arg, param);
}

function to_json(t) {
  var facts = $$Array.map(Fact$Reason.T[/* to_json */5], $$Array.of_list(t[/* facts */0]));
  var things = $$Array.map(Base$Reason.Thing[/* to_json */4], $$Array.of_list(t[/* things */1]));
  return Json_encode.object_(/* :: */[
              /* tuple */[
                Config$Reason.JsonKeys[/* facts */0],
                facts
              ],
              /* :: */[
                /* tuple */[
                  Config$Reason.JsonKeys[/* things */1],
                  things
                ],
                /* [] */0
              ]
            ]);
}

function load(v) {
  return from_facts(from_json(v));
}

exports.from_facts = from_facts;
exports.toJs = toJs;
exports.toJs2 = toJs2;
exports.things = things;
exports.facts = facts;
exports.findFact = findFact;
exports.findThing = findThing;
exports.findThingFromFact = findThingFromFact;
exports.from_json = from_json;
exports.to_json = to_json;
exports.load = load;
/* Base-Reason Not a pure module */
