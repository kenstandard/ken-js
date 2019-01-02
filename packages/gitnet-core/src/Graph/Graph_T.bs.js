// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
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

function things(g) {
  return g[/* things */0];
}

function findThing(id, t) {
  return Js_dict.get(t[/* things */0], id);
}

function facts(g) {
  return g[/* facts */1];
}

var partial_arg = Function$Rationale.Infix[/* ||> */1];

function partial_arg$1(param) {
  return partial_arg(facts, Js_dict.values, param);
}

var partial_arg$2 = Function$Rationale.Infix[/* ||> */1];

function factList(param) {
  return partial_arg$2(partial_arg$1, $$Array.to_list, param);
}

function showFacts(g) {
  return $$Array.map(factToJs, Js_dict.values(g[/* facts */1]));
}

function showThings(g) {
  return $$Array.map(thingToJs, Js_dict.values(g[/* things */0]));
}

function showValues(g) {
  return $$Array.map(valueToJs, $$Array.map((function (f) {
                    return f[/* value */3];
                  }), Js_dict.values(g[/* facts */1])));
}

var F = /* module */[
  /* things */things,
  /* findThing */findThing,
  /* facts */facts,
  /* factList */factList,
  /* showFacts */showFacts,
  /* showThings */showThings,
  /* showValues */showValues
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
exports.F = F;
exports.Thing = Thing;
/* No side effect */