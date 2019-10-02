// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var Config$BsKen = require("../Config.bs.js");
var Graph_Value$BsKen = require("./Graph_Value.bs.js");

function subjectId(t) {
  return t[/* subjectId */1];
}

function propertyId(t) {
  return t[/* propertyId */2];
}

function edgeId(edge) {
  var match = edge === /* SUBJECT */0;
  if (match) {
    return subjectId;
  } else {
    return propertyId;
  }
}

function value(t) {
  return t[/* value */3];
}

function id(t) {
  return t[/* thingIdString */0];
}

function to_json(t) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                Config$BsKen.FactJson[/* Fields */1][/* id */0],
                t[/* thingIdString */0]
              ],
              /* :: */[
                /* tuple */[
                  Config$BsKen.FactJson[/* Fields */1][/* subjectId */1],
                  t[/* subjectId */1]
                ],
                /* :: */[
                  /* tuple */[
                    Config$BsKen.FactJson[/* Fields */1][/* propertyId */2],
                    t[/* propertyId */2]
                  ],
                  /* :: */[
                    /* tuple */[
                      Config$BsKen.FactJson[/* Fields */1][/* value */3],
                      Graph_Value$BsKen.to_json(t[/* value */3])
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

function from_json(t) {
  return /* record */[
          /* thingIdString */Json_decode.field(Config$BsKen.FactJson[/* Fields */1][/* id */0], Json_decode.string, t),
          /* subjectId */Json_decode.field(Config$BsKen.FactJson[/* Fields */1][/* subjectId */1], Json_decode.string, t),
          /* propertyId */Json_decode.field(Config$BsKen.FactJson[/* Fields */1][/* propertyId */2], Json_decode.string, t),
          /* value : record */[/* valueType */Json_decode.field(Config$BsKen.FactJson[/* Fields */1][/* value */3], Graph_Value$BsKen.from_json, t)]
        ];
}

exports.subjectId = subjectId;
exports.propertyId = propertyId;
exports.edgeId = edgeId;
exports.value = value;
exports.id = id;
exports.to_json = to_json;
exports.from_json = from_json;
/* No side effect */
