// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Utility$Reason = require("../Utility.bs.js");

function run(q, f) {
  var match = q[/* q */2] === /* IS */0;
  var equality;
  if (match) {
    var partial_arg = q[/* id */1];
    equality = (function (param) {
        return Utility$Reason.isEqual(partial_arg, param);
      });
  } else {
    var partial_arg$1 = q[/* id */1];
    equality = (function (param) {
        return Utility$Reason.isNotEqual(partial_arg$1, param);
      });
  }
  var match$1 = q[/* edge */0];
  switch (match$1) {
    case 0 : 
        return Curry._1(equality, f[/* subjectId */1]);
    case 1 : 
        return Curry._1(equality, f[/* propertyId */2]);
    case 2 : 
        var match$2 = f[/* value */3][/* valueType */0];
        switch (match$2.tag | 0) {
          case 1 : 
              return Curry._1(equality, match$2[0]);
          case 0 : 
          case 2 : 
              return q[/* q */2] !== /* IS */0;
          
        }
    
  }
}

function qOr(qs, f) {
  return List.exists((function (q) {
                return run(q, f);
              }), qs);
}

function qAnd(qs, f) {
  return List.for_all((function (q) {
                return run(q, f);
              }), qs);
}

function item_from_json(i) {
  var id = Json_decode.field("id", Json_decode.string, i);
  var _q = Json_decode.field("q", Json_decode.string, i);
  var _edge = Json_decode.field("edge", Json_decode.string, i);
  var tmp;
  switch (_edge) {
    case "PROPERTY" : 
        tmp = /* PROPERTY */1;
        break;
    case "VALUE" : 
        tmp = /* VALUE */2;
        break;
    default:
      tmp = /* SUBJECT */0;
  }
  var tmp$1 = _q === "IS_NOT" ? /* IS_NOT */1 : /* IS */0;
  return /* record */[
          /* edge */tmp,
          /* id */id,
          /* q */tmp$1
        ];
}

var fromJson = item_from_json;

var Query = /* module */[
  /* run */run,
  /* qOr */qOr,
  /* qAnd */qAnd,
  /* item_from_json */item_from_json,
  /* fromJson */fromJson
];

exports.Query = Query;
/* No side effect */
