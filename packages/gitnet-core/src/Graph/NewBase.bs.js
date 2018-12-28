// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var RList$Rationale = require("rationale/src/RList.js");
var Option$Rationale = require("rationale/src/Option.js");
var Function$Rationale = require("rationale/src/Function.js");

function uniqueBases(t) {
  return List.map((function (e) {
                return /* record */[/* baseId */e[/* baseId */0]];
              }), RList$Rationale.uniqBy((function (e) {
                    return e[/* baseId */0];
                  }), t));
}

function doubleId(baseId, resourceId) {
  return /* tuple */[
          baseId,
          resourceId
        ];
}

function trippleId(baseId, resourceId, itemId) {
  return /* tuple */[
          baseId,
          resourceId,
          itemId
        ];
}

function uniqueresources(t) {
  return List.map((function (e) {
                return /* record */[
                        /* baseId */e[/* baseId */0],
                        /* resourceId */e[/* resourceId */1]
                      ];
              }), RList$Rationale.uniqBy((function (e) {
                    return /* tuple */[
                            e[/* baseId */0],
                            e[/* resourceId */1]
                          ];
                  }), t));
}

function uniqueIds(t) {
  return RList$Rationale.uniqBy((function (e) {
                return /* tuple */[
                        e[/* baseId */0],
                        e[/* resourceId */1],
                        e[/* thingId */2]
                      ];
              }), t);
}

function array_to_tripple(r) {
  if (r.length !== 3) {
    return undefined;
  } else {
    var a = r[0];
    var b = r[1];
    var c = r[2];
    return /* record */[
            /* baseId */a,
            /* resourceId */b,
            /* thingId */c
          ];
  }
}

var partial_arg = Function$Rationale.Infix[/* ||> */1];

function string_to_thingId(param) {
  return partial_arg((function (param) {
                return param.split(".");
              }), array_to_tripple, param);
}

var ThingId = /* module */[
  /* uniqueBases */uniqueBases,
  /* doubleId */doubleId,
  /* trippleId */trippleId,
  /* uniqueresources */uniqueresources,
  /* uniqueIds */uniqueIds,
  /* array_to_tripple */array_to_tripple,
  /* string_to_thingId */string_to_thingId
];

var cmp = Caml_obj.caml_compare;

var ThingTrippleComparable = Belt_Id.MakeComparable(/* module */[/* cmp */cmp]);

var thingSet = Belt_Set.make(ThingTrippleComparable);

var Things = /* module */[];

var Graph = /* module */[
  /* ThingTrippleComparable */ThingTrippleComparable,
  /* thingSet */thingSet,
  /* Things */Things
];

var SimpleFacts = /* module */[];

function array_to_tripple$1(isPublic, r) {
  if (r.length !== 3) {
    return undefined;
  } else {
    var a = r[0];
    var b = r[1];
    var c = r[2];
    return /* record */[
            /* baseId */a,
            /* resourceId */b,
            /* itemId */c,
            /* isPublic */isPublic
          ];
  }
}

function parse(isPublic) {
  var partial_arg = Function$Rationale.Infix[/* ||> */1];
  return (function (param) {
      return partial_arg((function (param) {
                    return param.split(".");
                  }), (function (param) {
                    return array_to_tripple$1(isPublic, param);
                  }), param);
    });
}

var IdParser = /* module */[
  /* array_to_tripple */array_to_tripple$1,
  /* parse */parse
];

function converter(fs) {
  uniqueIds(List.map((function (param) {
              return Option$Rationale.toExn("", param);
            }), List.filter(Option$Rationale.isSome)(List.map((function (r) {
                      return Curry._1(string_to_thingId, r[/* id */0]);
                    }), List.concat(List.map((function (r) {
                              return /* :: */[
                                      r[/* id */0],
                                      /* :: */[
                                        r[/* subjectId */1],
                                        /* :: */[
                                          r[/* propertyId */2],
                                          /* [] */0
                                        ]
                                      ]
                                    ];
                            }), fs))))));
  List.map((function (r) {
          return 3;
        }), fs);
  return /* () */0;
}

exports.ThingId = ThingId;
exports.Graph = Graph;
exports.SimpleFacts = SimpleFacts;
exports.IdParser = IdParser;
exports.converter = converter;
/* ThingTrippleComparable Not a pure module */
