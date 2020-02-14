// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';


function thingIdToJs(param) {
  return {
          rawId: param.rawId,
          tag: param.tag,
          thingIdType: param.thingIdType,
          updatedId: param.updatedId
        };
}

function thingIdFromJs(param) {
  return {
          rawId: param.rawId,
          tag: param.tag,
          thingIdType: param.thingIdType,
          updatedId: param.updatedId
        };
}

function factToJs(param) {
  return {
          thingId: param.thingId,
          subjectId: param.subjectId,
          propertyId: param.propertyId,
          isInversed: param.isInversed,
          value: param.value
        };
}

function factFromJs(param) {
  return {
          thingId: param.thingId,
          subjectId: param.subjectId,
          propertyId: param.propertyId,
          isInversed: param.isInversed,
          value: param.value
        };
}

exports.thingIdToJs = thingIdToJs;
exports.thingIdFromJs = thingIdFromJs;
exports.factToJs = factToJs;
exports.factFromJs = factFromJs;
/* No side effect */
