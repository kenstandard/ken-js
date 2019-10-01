// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Compiler_Run$BsKen = require("../../Compiler/Compiler_Run.bs.js");
var Function$Rationale = require("rationale/src/Function.js");
var SimpleFactList_T$BsKen = require("../../AlternativeGraphFormats/SimpleFactList_T.bs.js");

function valueToArray(value) {
  if (value.tag) {
    return value[0];
  } else {
    return /* array */[value[0]];
  }
}

function flattenValues(g) {
  return $$Array.map((function ($$package) {
                return /* record */[
                        /* things */$$Array.map((function (r) {
                                return /* record */[
                                        /* id */r[/* id */0],
                                        /* facts */Belt_Array.concatMany($$Array.map((function (f) {
                                                    return $$Array.map((function (value) {
                                                                  return /* record */[
                                                                          /* id */f[/* id */0],
                                                                          /* property */f[/* property */1],
                                                                          /* isInversed */f[/* isInversed */2],
                                                                          /* value : String */Block.__(0, [value])
                                                                        ];
                                                                }), valueToArray(f[/* value */3]));
                                                  }), r[/* facts */1]))
                                      ];
                              }), $$package[/* things */0]),
                        /* baseId */$$package[/* baseId */1],
                        /* resourceId */$$package[/* resourceId */2],
                        /* aliases */$$package[/* aliases */3]
                      ];
              }), g);
}

function allPackageFacts(p) {
  return $$Array.to_list(Belt_Array.concatMany($$Array.map((function (thing) {
                        return $$Array.map((function (fact) {
                                      var match = fact[/* value */3];
                                      var tmp;
                                      tmp = match.tag ? "ERROR" : match[0];
                                      return /* record */[
                                              /* thingId */Compiler_Run$BsKen.makeThingId(fact[/* id */0]),
                                              /* subjectId */Compiler_Run$BsKen.makeThingId(thing[/* id */0]),
                                              /* propertyId */Compiler_Run$BsKen.makeThingId(fact[/* property */1]),
                                              /* isInversed */fact[/* isInversed */2],
                                              /* value : String */Block.__(0, [tmp])
                                            ];
                                    }), thing[/* facts */1]);
                      }), p[/* things */0])));
}

function formattedAliases(d) {
  return Js_dict.fromArray($$Array.map((function (param) {
                    var v = param[1];
                    return /* tuple */[
                            param[0],
                            /* record */[
                              /* rawId */v,
                              /* tag */undefined,
                              /* thingIdType *//* NONFACT */1,
                              /* updatedId */v
                            ]
                          ];
                  }), Js_dict.entries(d)));
}

function shape(g) {
  return $$Array.to_list($$Array.map((function ($$package) {
                    return /* record */[
                            /* facts */allPackageFacts($$package),
                            /* baseId */$$package[/* baseId */1],
                            /* resourceId */$$package[/* resourceId */2],
                            /* aliases */formattedAliases($$package[/* aliases */3])
                          ];
                  }), g));
}

function combinePackages(packages) {
  var partial_arg = Function$Rationale.Infix[/* ||> */1];
  return SimpleFactList_T$BsKen.combine(List.map((function (param) {
                    return partial_arg(Compiler_Run$BsKen.run, Compiler_Run$BsKen.toSimple, param);
                  }), packages));
}

var partial_arg = Function$Rationale.Infix[/* ||> */1];

function partial_arg$1(param) {
  return partial_arg(flattenValues, shape, param);
}

var partial_arg$2 = Function$Rationale.Infix[/* ||> */1];

function run(param) {
  return partial_arg$2(partial_arg$1, combinePackages, param);
}

exports.valueToArray = valueToArray;
exports.flattenValues = flattenValues;
exports.allPackageFacts = allPackageFacts;
exports.formattedAliases = formattedAliases;
exports.shape = shape;
exports.combinePackages = combinePackages;
exports.run = run;
/* Compiler_Run-BsKen Not a pure module */
