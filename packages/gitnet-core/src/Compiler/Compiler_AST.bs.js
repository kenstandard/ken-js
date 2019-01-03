// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';


function thingIdToJs(param) {
  return {
          rawId: param[/* rawId */0],
          tag: param[/* tag */1],
          thingIdType: param[/* thingIdType */2],
          updatedId: param[/* updatedId */3]
        };
}

function thingIdFromJs(param) {
  return /* record */[
          /* rawId */param.rawId,
          /* tag */param.tag,
          /* thingIdType */param.thingIdType,
          /* updatedId */param.updatedId
        ];
}

function factToJs(param) {
  return {
          thingId: param[/* thingId */0],
          subjectId: param[/* subjectId */1],
          propertyId: param[/* propertyId */2],
          value: param[/* value */3]
        };
}

function factFromJs(param) {
  return /* record */[
          /* thingId */param.thingId,
          /* subjectId */param.subjectId,
          /* propertyId */param.propertyId,
          /* value */param.value
        ];
}

exports.thingIdToJs = thingIdToJs;
exports.thingIdFromJs = thingIdFromJs;
exports.factToJs = factToJs;
exports.factFromJs = factFromJs;
/* No side effect */
