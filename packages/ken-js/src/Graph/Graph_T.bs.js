// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var Utility$BsKen = require("../Utility.bs.js");
var RList$Rationale = require("rationale/src/RList.js");

function valueToJs(param) {
  return {
          valueType: param.valueType
        };
}

function valueFromJs(param) {
  return {
          valueType: param.valueType
        };
}

function factToJs(param) {
  return {
          thingIdString: param.thingIdString,
          subjectId: param.subjectId,
          propertyId: param.propertyId,
          value: param.value
        };
}

function factFromJs(param) {
  return {
          thingIdString: param.thingIdString,
          subjectId: param.subjectId,
          propertyId: param.propertyId,
          value: param.value
        };
}

function thingToJs(param) {
  return {
          thingId: param.thingId,
          thingType: param.thingType
        };
}

function thingFromJs(param) {
  return {
          thingId: param.thingId,
          thingType: param.thingType
        };
}

var T = {
  valueToJs: valueToJs,
  valueFromJs: valueFromJs,
  factToJs: factToJs,
  factFromJs: factFromJs,
  thingToJs: thingToJs,
  thingFromJs: thingFromJs
};

function listCombinations(param) {
  return Utility$BsKen.accumulator(/* [] */0, /* [] */0, (function (accum, head) {
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

function to_list(e) {
  return $$Array.to_list(e.split("/"));
}

function from_list(e) {
  return $$Array.of_list(e).join("/");
}

function isRoot(e) {
  return e.split("/").length === 1;
}

function root(e) {
  return Caml_array.caml_array_get(e.split("/"), 0);
}

function isFactDirectory(e) {
  var e$1 = $$Array.to_list(e.split("/"));
  return Caml_obj.caml_equal(RList$Rationale.last(e$1), "_f");
}

function allSubdirectories(e) {
  return List.map(from_list, listCombinations($$Array.to_list(e.split("/"))));
}

function removeLastNDirs(n, e) {
  var e$1 = RList$Rationale.dropLast(n, $$Array.to_list(e.split("/")));
  return $$Array.of_list(e$1).join("/");
}

function parent(param) {
  return removeLastNDirs(1, param);
}

var Directory = {
  from_array: from_array,
  to_array: to_array,
  to_list: to_list,
  from_list: from_list,
  isRoot: isRoot,
  root: root,
  isFactDirectory: isFactDirectory,
  allSubdirectories: allSubdirectories,
  removeLastNDirs: removeLastNDirs,
  parent: parent
};

function things(g) {
  return g.things;
}

function thingArray(g) {
  return Js_dict.values(g.things);
}

function findThing(id, t) {
  return Js_dict.get(t.things, id);
}

function facts(g) {
  return g.facts;
}

function factArray(v) {
  return Js_dict.values(v.facts);
}

function factList(v) {
  return $$Array.to_list(Js_dict.values(v.facts));
}

function directories(g) {
  return g.directories;
}

function rootDirectories(g) {
  return List.filter(isRoot)(g.directories);
}

function childDirectories(g, s) {
  return List.filter((function (e) {
                  return removeLastNDirs(1, e) === s;
                }))(g.directories);
}

function factsJs(g) {
  return $$Array.map(factToJs, Js_dict.values(g.facts));
}

function thingsJs(g) {
  return $$Array.map(thingToJs, Js_dict.values(g.things));
}

function valuesJs(g) {
  return $$Array.map(valueToJs, $$Array.map((function (f) {
                    return f.value;
                  }), Js_dict.values(g.facts)));
}

var F = {
  things: things,
  thingArray: thingArray,
  findThing: findThing,
  facts: facts,
  factArray: factArray,
  factList: factList,
  directories: directories,
  rootDirectories: rootDirectories,
  childDirectories: childDirectories,
  factsJs: factsJs,
  thingsJs: thingsJs,
  valuesJs: valuesJs
};

function id(e) {
  return e.thingId.thingIdString;
}

function to_s(e) {
  return "[ID: " + (e.thingId.thingIdString + "]");
}

function to_json(t) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "id",
                t.thingId.thingIdString
              ],
              /* [] */0
            ]);
}

var Thing = {
  id: id,
  to_s: to_s,
  to_json: to_json
};

exports.T = T;
exports.listCombinations = listCombinations;
exports.Directory = Directory;
exports.F = F;
exports.Thing = Thing;
/* RList-Rationale Not a pure module */
