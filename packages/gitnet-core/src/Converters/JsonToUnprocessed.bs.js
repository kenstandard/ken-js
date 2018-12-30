// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var RList$Rationale = require("rationale/src/RList.js");
var Option$Rationale = require("rationale/src/Option.js");

function factDecoder(property, json, baseId, resourceId) {
  var match = Js_json.classify(json);
  if (typeof match === "number") {
    return /* record */[
            /* id */undefined,
            /* property */property,
            /* baseId */baseId,
            /* resourceId */resourceId,
            /* value : String */Block.__(0, ["Couldn't find"])
          ];
  } else {
    switch (match.tag | 0) {
      case 0 : 
          return /* record */[
                  /* id */undefined,
                  /* property */property,
                  /* baseId */baseId,
                  /* resourceId */resourceId,
                  /* value : String */Block.__(0, [Json_decode.string(json)])
                ];
      case 2 : 
          return /* record */[
                  /* id */"json-values-TODO",
                  /* property */property,
                  /* baseId */baseId,
                  /* resourceId */resourceId,
                  /* value : String */Block.__(0, [Json_decode.field("value", Json_decode.string, json)])
                ];
      case 3 : 
          return /* record */[
                  /* id */undefined,
                  /* property */property,
                  /* baseId */baseId,
                  /* resourceId */resourceId,
                  /* value : Array */Block.__(1, [$$Array.map(Json_decode.string, match[0])])
                ];
      default:
        return /* record */[
                /* id */undefined,
                /* property */property,
                /* baseId */baseId,
                /* resourceId */resourceId,
                /* value : String */Block.__(0, ["Couldn't find"])
              ];
    }
  }
}

function filterArray(filter, ar) {
  return $$Array.of_list(Curry._1(filter, $$Array.to_list(ar)));
}

function propertyDecoder(json, baseId, resourceId) {
  var filteredFactKeys = /* :: */[
    "templates",
    /* [] */0
  ];
  var thing0 = Option$Rationale.toExn("Parse Error", Js_json.decodeObject(json));
  var toFact = function (id) {
    var _value = Option$Rationale.toExn("Parse Error", Js_dict.get(thing0, id));
    return factDecoder(id, _value, baseId, resourceId);
  };
  var ar = Object.keys(thing0);
  var param = $$Array.to_list(ar);
  var nonTemplateKeys = $$Array.of_list(RList$Rationale.without(filteredFactKeys, param));
  return $$Array.map(toFact, nonTemplateKeys);
}

function removeIfInList(list, fn) {
  return List.filter((function (e) {
                var __x = Curry._1(fn, e);
                return !RList$Rationale.contains(__x)(list);
              }));
}

function decodeBase(json) {
  var entries = $$Array.to_list(Js_dict.entries(Option$Rationale.toExn("Parse Error", Js_json.decodeObject(json))));
  var baseId = Json_decode.field("baseId", Json_decode.string, json);
  var resourceId = Json_decode.field("resourceId", Json_decode.string, json);
  return $$Array.of_list(List.map((function (param) {
                    return /* record */[
                            /* id */param[0],
                            /* baseId */baseId,
                            /* resourceId */resourceId,
                            /* facts */propertyDecoder(param[1], baseId, resourceId),
                            /* templates : array */[]
                          ];
                  }), removeIfInList(/* :: */[
                        "baseId",
                        /* :: */[
                          "resourceId",
                          /* [] */0
                        ]
                      ], (function (param) {
                          return param[0];
                        }))(entries)));
}

function run(json) {
  return Belt_Array.concatMany(Json_decode.array(decodeBase, json));
}

exports.factDecoder = factDecoder;
exports.filterArray = filterArray;
exports.propertyDecoder = propertyDecoder;
exports.removeIfInList = removeIfInList;
exports.decodeBase = decodeBase;
exports.run = run;
/* RList-Rationale Not a pure module */
