// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var RList$Rationale = require("rationale/src/RList.js");
var Option$Rationale = require("rationale/src/Option.js");

function getPropertyId(p) {
  var isInversed = Caml_string.get(p, 0) === /* "\\" */92;
  if (isInversed) {
    return /* tuple */[
            true,
            p.slice(1)
          ];
  } else {
    return /* tuple */[
            false,
            p
          ];
  }
}

function factDecoder(propertyId, json) {
  var match = getPropertyId(propertyId);
  var property = match[1];
  var isInversed = match[0];
  var match$1 = Js_json.classify(json);
  if (typeof match$1 === "number") {
    return /* record */[
            /* id */undefined,
            /* property */property,
            /* isInversed */false,
            /* value : String */Block.__(0, ["Couldn't find"])
          ];
  } else {
    switch (match$1.tag | 0) {
      case 0 : 
          return /* record */[
                  /* id */undefined,
                  /* property */property,
                  /* isInversed */isInversed,
                  /* value : String */Block.__(0, [Json_decode.string(json)])
                ];
      case 2 : 
          return /* record */[
                  /* id */undefined,
                  /* property */property,
                  /* isInversed */isInversed,
                  /* value : String */Block.__(0, [Json_decode.field("value", Json_decode.string, json)])
                ];
      case 3 : 
          return /* record */[
                  /* id */undefined,
                  /* property */property,
                  /* isInversed */isInversed,
                  /* value : Array */Block.__(1, [$$Array.map(Json_decode.string, match$1[0])])
                ];
      default:
        return /* record */[
                /* id */undefined,
                /* property */property,
                /* isInversed */false,
                /* value : String */Block.__(0, ["Couldn't find"])
              ];
    }
  }
}

function filterArray(filter, ar) {
  return $$Array.of_list(Curry._1(filter, $$Array.to_list(ar)));
}

var filteredFactKeys = /* :: */[
  "config",
  /* [] */0
];

function propertyDecoder(json) {
  var thing0 = Option$Rationale.toExn("Parse Error", Js_json.decodeObject(json));
  var toFact = function (id) {
    var _value = Option$Rationale.toExn("Parse Error", Js_dict.get(thing0, id));
    return factDecoder(id, _value);
  };
  var ar = Object.keys(thing0);
  var param = $$Array.to_list(ar);
  var nonTemplateKeys = $$Array.of_list(RList$Rationale.without(filteredFactKeys, param));
  return $$Array.map(toFact, nonTemplateKeys);
}

function removeIfInList(list, fn) {
  return List.filter((function (e) {
                return !RList$Rationale.contains(Curry._1(fn, e))(list);
              }));
}

function decodeBase(json) {
  var entries = $$Array.to_list(Js_dict.entries(Option$Rationale.toExn("Parse Error", Js_json.decodeObject(json))));
  var baseId = Json_decode.field("config", (function (param) {
          return Json_decode.field("baseId", Json_decode.string, param);
        }), json);
  var resourceId = Json_decode.field("config", (function (param) {
          return Json_decode.field("resourceId", Json_decode.string, param);
        }), json);
  var aliases = Json_decode.field("config", (function (param) {
          return Json_decode.field("aliases", (function (param) {
                        return Json_decode.dict(Json_decode.string, param);
                      }), param);
        }), json);
  var things = List.map((function (param) {
          return /* record */[
                  /* id */param[0],
                  /* facts */propertyDecoder(param[1])
                ];
        }), removeIfInList(filteredFactKeys, (function (param) {
                return param[0];
              }))(entries));
  console.log("things", things);
  return /* record */[
          /* things */$$Array.of_list(things),
          /* baseId */baseId,
          /* resourceId */resourceId,
          /* aliases */aliases
        ];
}

function run(json) {
  return Json_decode.array(decodeBase, json);
}

exports.getPropertyId = getPropertyId;
exports.factDecoder = factDecoder;
exports.filterArray = filterArray;
exports.filteredFactKeys = filteredFactKeys;
exports.propertyDecoder = propertyDecoder;
exports.removeIfInList = removeIfInList;
exports.decodeBase = decodeBase;
exports.run = run;
/* RList-Rationale Not a pure module */
