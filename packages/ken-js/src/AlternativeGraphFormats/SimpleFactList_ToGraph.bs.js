// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var RList$Rationale = require("rationale/src/RList.js");
var Graph_Dirs$BsKen = require("../Graph/Graph_Dirs.bs.js");
var Option$Rationale = require("rationale/src/Option.js");

function uniqueIds(facts) {
  return RList$Rationale.uniqBy((function (a) {
                return a[/* id */0];
              }), List.flatten(List.map((function (e) {
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
}

function findType(id, facts) {
  var id$1 = id[/* id */0];
  if (List.exists((function (f) {
            return f[/* id */0][/* id */0] === id$1;
          }), facts)) {
    return /* FACT */0;
  } else {
    return /* ITEM */2;
  }
}

function listFacts(graph) {
  return List.map((function (f) {
                return /* record */[
                        /* thingIdString */f[/* id */0][/* id */0],
                        /* subjectId */f[/* subjectId */1][/* id */0],
                        /* propertyId */f[/* propertyId */2][/* id */0],
                        /* value */f[/* value */3]
                      ];
              }), graph);
}

function possiblyConvertValueTypesToThing(graph, value) {
  var match = value[/* valueType */0];
  switch (match.tag | 0) {
    case 0 : 
        var s = match[0];
        var __x = graph[/* things */0];
        var match$1 = Option$Rationale.isSome(Js_dict.get(__x, s));
        if (match$1) {
          return /* ThingId */Block.__(1, [s]);
        } else {
          return /* String */Block.__(0, [s]);
        }
    case 1 : 
    case 2 : 
        return value[/* valueType */0];
    
  }
}

function connectValuesToFacts(graph) {
  return /* record */[
          /* things */graph[/* things */0],
          /* facts */Js_dict.fromList(List.map((function (r) {
                      return /* tuple */[
                              r[/* thingIdString */0],
                              r
                            ];
                    }), $$Array.to_list($$Array.map((function (f) {
                              return /* record */[
                                      /* thingIdString */f[/* thingIdString */0],
                                      /* subjectId */f[/* subjectId */1],
                                      /* propertyId */f[/* propertyId */2],
                                      /* value : record */[/* valueType */possiblyConvertValueTypesToThing(graph, f[/* value */3])]
                                    ];
                            }), Js_dict.values(graph[/* facts */1]))))),
          /* bases */graph[/* bases */2],
          /* directories */graph[/* directories */3]
        ];
}

function listThings(facts) {
  return List.map((function (id) {
                return /* record */[
                        /* thingId : record */[
                          /* thingIdString */id[/* id */0],
                          /* isPublic */id[/* isPublic */1],
                          /* baseId */"FIXIME TODO"
                        ],
                        /* thingType : Item */0
                      ];
              }), uniqueIds(facts));
}

function run(facts) {
  return Graph_Dirs$BsKen.makeDirs(/* record */[
              /* things */Js_dict.fromList(List.map((function (r) {
                          return /* tuple */[
                                  r[/* thingId */0][/* thingIdString */0],
                                  r
                                ];
                        }), listThings(facts))),
              /* facts */Js_dict.fromList(List.map((function (r) {
                          return /* tuple */[
                                  r[/* thingIdString */0],
                                  r
                                ];
                        }), listFacts(facts))),
              /* bases */RList$Rationale.uniq(List.map((function (r) {
                          return r[/* thingId */0][/* baseId */2];
                        }), listThings(facts))),
              /* directories : [] */0
            ]);
}

exports.uniqueIds = uniqueIds;
exports.findType = findType;
exports.listFacts = listFacts;
exports.possiblyConvertValueTypesToThing = possiblyConvertValueTypesToThing;
exports.connectValuesToFacts = connectValuesToFacts;
exports.listThings = listThings;
exports.run = run;
/* RList-Rationale Not a pure module */
