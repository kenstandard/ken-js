// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Function$Rationale = require("rationale/src/Function.js");
var Compiler_Run$Reason = require("../../Compiler/Compiler_Run.bs.js");
var SimpleFactList_T$Reason = require("../../AlternativeGraphFormats/SimpleFactList_T.bs.js");

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
                                                                          /* value : String */Block.__(0, [value])
                                                                        ];
                                                                }), valueToArray(f[/* value */2]));
                                                  }), r[/* facts */1])),
                                        /* templates */r[/* templates */2]
                                      ];
                              }), $$package[/* things */0]),
                        /* baseId */$$package[/* baseId */1],
                        /* resourceId */$$package[/* resourceId */2]
                      ];
              }), g);
}

function shape(g) {
  return $$Array.to_list(Belt_Array.concatMany($$Array.map((function ($$package) {
                        return $$Array.map((function (thing) {
                                      var fs = $$Array.map((function (fact) {
                                              var match = fact[/* value */2];
                                              var tmp;
                                              tmp = match.tag ? "ERROR" : match[0];
                                              return /* record */[
                                                      /* thingId */Compiler_Run$Reason.makeThingId(fact[/* id */0], $$package[/* baseId */1], $$package[/* resourceId */2]),
                                                      /* subjectId */Compiler_Run$Reason.makeThingId(thing[/* id */0], $$package[/* baseId */1], $$package[/* resourceId */2]),
                                                      /* propertyId */Compiler_Run$Reason.makeThingId(fact[/* property */1], $$package[/* baseId */1], $$package[/* resourceId */2]),
                                                      /* value : String */Block.__(0, [tmp])
                                                    ];
                                            }), thing[/* facts */1]);
                                      return /* record */[
                                              /* facts */$$Array.to_list(fs),
                                              /* baseId */$$package[/* baseId */1],
                                              /* resourceId */$$package[/* resourceId */2]
                                            ];
                                    }), $$package[/* things */0]);
                      }), g)));
}

function combinePackages(packages) {
  var partial_arg = Function$Rationale.Infix[/* ||> */1];
  return SimpleFactList_T$Reason.combine(List.map((function (param) {
                    return partial_arg(Compiler_Run$Reason.run, Compiler_Run$Reason.toSimple, param);
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
exports.shape = shape;
exports.combinePackages = combinePackages;
exports.run = run;
/* Compiler_Run-Reason Not a pure module */
