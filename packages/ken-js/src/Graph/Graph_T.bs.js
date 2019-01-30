// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var Utility$Ken = require("../Utility.bs.js");
var RList$Rationale = require("rationale/src/RList.js");
var Function$Rationale = require("rationale/src/Function.js");

function valueToJs(param) {
  return {
          valueType: param[/* valueType */0]
        };
}

function valueFromJs(param) {
  return /* record */[/* valueType */param.valueType];
}

function factToJs(param) {
  return {
          thingIdString: param[/* thingIdString */0],
          subjectId: param[/* subjectId */1],
          propertyId: param[/* propertyId */2],
          value: param[/* value */3]
        };
}

function factFromJs(param) {
  return /* record */[
          /* thingIdString */param.thingIdString,
          /* subjectId */param.subjectId,
          /* propertyId */param.propertyId,
          /* value */param.value
        ];
}

function thingToJs(param) {
  return {
          thingId: param[/* thingId */0],
          thingType: param[/* thingType */1]
        };
}

function thingFromJs(param) {
  return /* record */[
          /* thingId */param.thingId,
          /* thingType */param.thingType
        ];
}

var T = /* module */[
  /* valueToJs */valueToJs,
  /* valueFromJs */valueFromJs,
  /* factToJs */factToJs,
  /* factFromJs */factFromJs,
  /* thingToJs */thingToJs,
  /* thingFromJs */thingFromJs
];

function listCombinations(param) {
  return Utility$Ken.accumulator(/* [] */0, /* [] */0, (function (accum, head) {
                return List.append(accum, /* :: */[
                            head,
                            /* [] */0
                          ]);
              }), param);
}

function from_array(param) {
  return param.join("/");
}

function to_array(param) {
  return param.split("/");
}

var partial_arg = Function$Rationale.Infix[/* ||> */1];

function to_list(param) {
  return partial_arg(to_array, $$Array.to_list, param);
}

var partial_arg$1 = Function$Rationale.Infix[/* ||> */1];

function from_list(param) {
  return partial_arg$1($$Array.of_list, from_array, param);
}

function isRoot(e) {
  return e.split("/").length === 1;
}

function root(e) {
  return Caml_array.caml_array_get(e.split("/"), 0);
}

function isFactDirectory(e) {
  var e$1 = Curry._1(to_list, e);
  console.log(RList$Rationale.last(e$1));
  return Caml_obj.caml_equal(RList$Rationale.last(e$1), "_f");
}

var partial_arg$2 = Function$Rationale.Infix[/* ||> */1];

function partial_arg$3(param) {
  return partial_arg$2(to_list, listCombinations, param);
}

var partial_arg$4 = Function$Rationale.Infix[/* ||> */1];

function allSubdirectories(param) {
  return partial_arg$4(partial_arg$3, (function (param) {
                return List.map(from_list, param);
              }), param);
}

function removeLastNDirs(n) {
  var partial_arg = Function$Rationale.Infix[/* ||> */1];
  var partial_arg$1 = function (param) {
    return partial_arg(to_list, (function (param) {
                  return RList$Rationale.dropLast(n, param);
                }), param);
  };
  var partial_arg$2 = Function$Rationale.Infix[/* ||> */1];
  return (function (param) {
      return partial_arg$2(partial_arg$1, from_list, param);
    });
}

var parent = removeLastNDirs(1);

var Directory = /* module */[
  /* from_array */from_array,
  /* to_array */to_array,
  /* to_list */to_list,
  /* from_list */from_list,
  /* isRoot */isRoot,
  /* root */root,
  /* isFactDirectory */isFactDirectory,
  /* allSubdirectories */allSubdirectories,
  /* removeLastNDirs */removeLastNDirs,
  /* parent */parent
];

function things(g) {
  return g[/* things */0];
}

function thingArray(g) {
  return Js_dict.values(g[/* things */0]);
}

function findThing(id, t) {
  return Js_dict.get(t[/* things */0], id);
}

function facts(g) {
  return g[/* facts */1];
}

var partial_arg$5 = Function$Rationale.Infix[/* ||> */1];

function factArray(param) {
  return partial_arg$5(facts, Js_dict.values, param);
}

var partial_arg$6 = Function$Rationale.Infix[/* ||> */1];

function partial_arg$7(param) {
  return partial_arg$6(facts, Js_dict.values, param);
}

var partial_arg$8 = Function$Rationale.Infix[/* ||> */1];

function factList(param) {
  return partial_arg$8(partial_arg$7, $$Array.to_list, param);
}

function directories(g) {
  return g[/* directories */3];
}

function rootDirectories(g) {
  return List.filter(isRoot)(g[/* directories */3]);
}

function childDirectories(g, s) {
  return List.filter((function (e) {
                  return Curry._1(parent, e) === s;
                }))(g[/* directories */3]);
}

function factsJs(g) {
  return $$Array.map(factToJs, Js_dict.values(g[/* facts */1]));
}

function thingsJs(g) {
  return $$Array.map(thingToJs, Js_dict.values(g[/* things */0]));
}

function valuesJs(g) {
  return $$Array.map(valueToJs, $$Array.map((function (f) {
                    return f[/* value */3];
                  }), Js_dict.values(g[/* facts */1])));
}

var F = /* module */[
  /* things */things,
  /* thingArray */thingArray,
  /* findThing */findThing,
  /* facts */facts,
  /* factArray */factArray,
  /* factList */factList,
  /* directories */directories,
  /* rootDirectories */rootDirectories,
  /* childDirectories */childDirectories,
  /* factsJs */factsJs,
  /* thingsJs */thingsJs,
  /* valuesJs */valuesJs
];

function id(e) {
  return e[/* thingId */0][/* thingIdString */0];
}

function to_s(e) {
  return "[ID: " + (e[/* thingId */0][/* thingIdString */0] + "]");
}

function to_json(t) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "id",
                t[/* thingId */0][/* thingIdString */0]
              ],
              /* [] */0
            ]);
}

var Thing = /* module */[
  /* id */id,
  /* to_s */to_s,
  /* to_json */to_json
];

exports.T = T;
exports.listCombinations = listCombinations;
exports.Directory = Directory;
exports.F = F;
exports.Thing = Thing;
/* parent Not a pure module */
