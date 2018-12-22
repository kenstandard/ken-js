// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

function find(a, id) {
  return Caml_array.caml_array_get(Belt_Array.keep(a, (function (e) {
                    return e[/* id */0] === id;
                  })), 0);
}

function buildGraph(param) {
  var _facts = /* array */[
    /* tuple */[
      "1",
      "2",
      "sdfsdf"
    ],
    /* tuple */[
      "1",
      "3",
      "bar"
    ]
  ];
  var nodes = /* array */[
    "1",
    "2",
    "3"
  ];
  var empty_000 = /* facts : array */[];
  var empty_001 = /* things : array */[];
  var empty = /* record */[
    empty_000,
    empty_001
  ];
  var things = Belt_Array.map(nodes, (function (e) {
          return /* record */[
                  /* id */e,
                  /* graph */empty
                ];
        }));
  var facts = Belt_Array.map(_facts, (function (param) {
          return /* record */[
                  /* subject */find(things, param[0]),
                  /* property */find(things, param[1]),
                  /* value */param[2],
                  /* graph */empty
                ];
        }));
  var graph = /* record */[
    /* facts */facts,
    /* things */things
  ];
  for(var x = 0 ,x_finish = facts.length; x <= x_finish; ++x){
    Caml_array.caml_array_get(facts, x)[/* graph */3] = graph;
  }
  for(var x$1 = 0 ,x_finish$1 = things.length; x$1 <= x_finish$1; ++x$1){
    Caml_array.caml_array_get(things, x$1)[/* graph */1] = graph;
  }
  return graph;
}

exports.find = find;
exports.buildGraph = buildGraph;
/* No side effect */
