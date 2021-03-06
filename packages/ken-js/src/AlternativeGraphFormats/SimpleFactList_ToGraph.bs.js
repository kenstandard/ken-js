// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
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
                return a.id;
              }), List.flatten(List.map((function (e) {
                        return /* :: */[
                                e.id,
                                /* :: */[
                                  e.subjectId,
                                  /* :: */[
                                    e.propertyId,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }), facts)));
}

function findType(id, facts) {
  var id$1 = id.id;
  if (List.exists((function (f) {
            return f.id.id === id$1;
          }), facts)) {
    return /* FACT */0;
  } else {
    return /* ITEM */2;
  }
}

function listFacts(graph) {
  return List.map((function (f) {
                return {
                        thingIdString: f.id.id,
                        subjectId: f.subjectId.id,
                        propertyId: f.propertyId.id,
                        value: f.value
                      };
              }), graph);
}

function possiblyConvertValueTypesToThing(graph, value) {
  var match = value.valueType;
  switch (match.tag | 0) {
    case /* String */0 :
        var s = match[0];
        var __x = graph.things;
        var match$1 = Option$Rationale.isSome(Js_dict.get(__x, s));
        if (match$1) {
          return /* ThingId */Block.__(1, [s]);
        } else {
          return /* String */Block.__(0, [s]);
        }
    case /* ThingId */1 :
    case /* JSON */2 :
        return value.valueType;
    
  }
}

function connectValuesToFacts(graph) {
  return {
          things: graph.things,
          facts: Js_dict.fromList(List.map((function (r) {
                      return /* tuple */[
                              r.thingIdString,
                              r
                            ];
                    }), $$Array.to_list($$Array.map((function (f) {
                              return {
                                      thingIdString: f.thingIdString,
                                      subjectId: f.subjectId,
                                      propertyId: f.propertyId,
                                      value: {
                                        valueType: possiblyConvertValueTypesToThing(graph, f.value)
                                      }
                                    };
                            }), Js_dict.values(graph.facts))))),
          bases: graph.bases,
          directories: graph.directories
        };
}

function listThings(facts) {
  return List.map((function (id) {
                return {
                        thingId: {
                          thingIdString: id.id,
                          isPublic: id.isPublic,
                          baseId: "FIXIME TODO"
                        },
                        thingType: /* Item */0
                      };
              }), uniqueIds(facts));
}

function run(facts) {
  return Graph_Dirs$BsKen.makeDirs({
              things: Js_dict.fromList(List.map((function (r) {
                          return /* tuple */[
                                  r.thingId.thingIdString,
                                  r
                                ];
                        }), listThings(facts))),
              facts: Js_dict.fromList(List.map((function (r) {
                          return /* tuple */[
                                  r.thingIdString,
                                  r
                                ];
                        }), listFacts(facts))),
              bases: RList$Rationale.uniq(List.map((function (r) {
                          return r.thingId.baseId;
                        }), listThings(facts))),
              directories: /* [] */0
            });
}

exports.uniqueIds = uniqueIds;
exports.findType = findType;
exports.listFacts = listFacts;
exports.possiblyConvertValueTypesToThing = possiblyConvertValueTypesToThing;
exports.connectValuesToFacts = connectValuesToFacts;
exports.listThings = listThings;
exports.run = run;
/* RList-Rationale Not a pure module */
