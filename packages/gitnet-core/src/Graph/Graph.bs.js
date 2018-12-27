// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Base$Reason = require("./Base.bs.js");
var Fact$Reason = require("./Fact.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var Config$Reason = require("./Config.bs.js");
var RList$Rationale = require("rationale/src/RList.js");
var Option$Rationale = require("rationale/src/Option.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");
var Function$Rationale = require("rationale/src/Function.js");

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

function from_facts(facts) {
  var nodes = RList$Rationale.uniq(List.flatten(List.map((function (e) {
                  return /* :: */[
                          e[/* id */0],
                          /* :: */[
                            e[/* subjectId */1],
                            /* :: */[
                              e[/* propertyId */2],
                              /* :: */[
                                e[/* baseId */5],
                                /* :: */[
                                  e[/* resourceId */6],
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ];
                }), facts)));
  var things = List.map((function (e) {
          return /* record */[
                  /* id */e,
                  /* thingType */undefined,
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
    List.nth(things, x)[/* graph */2] = graph;
  }
  return graph;
}

function withThingIds(g) {
  var facts = List.map((function (f) {
          var match = f[/* value */3];
          var value;
          switch (match.tag | 0) {
            case 1 : 
                var f$1 = match[0];
                var match$1 = Option$Rationale.isSome(findThing(f$1, g));
                value = match$1 ? /* ThingId */Block.__(0, [f$1]) : /* String */Block.__(1, [f$1]);
                break;
            case 0 : 
            case 2 : 
                value = f[/* value */3];
                break;
            
          }
          return /* record */[
                  /* id */f[/* id */0],
                  /* subjectId */f[/* subjectId */1],
                  /* propertyId */f[/* propertyId */2],
                  /* value */value,
                  /* idIsPublic */f[/* idIsPublic */4],
                  /* baseId */f[/* baseId */5],
                  /* resourceId */f[/* resourceId */6]
                ];
        }), g[/* facts */0]);
  return /* record */[
          /* facts */facts,
          /* things */g[/* things */1]
        ];
}

function load(v) {
  return withThingIds(from_facts(from_json(v)));
}

exports.toJs = toJs;
exports.toJs2 = toJs2;
exports.things = things;
exports.facts = facts;
exports.findFact = findFact;
exports.findThing = findThing;
exports.findThingFromFact = findThingFromFact;
exports.from_json = from_json;
exports.to_json = to_json;
exports.from_facts = from_facts;
exports.withThingIds = withThingIds;
exports.load = load;
/* Base-Reason Not a pure module */
