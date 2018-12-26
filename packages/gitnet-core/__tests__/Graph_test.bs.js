// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Graph$Reason = require("../src/Graph/Graph.bs.js");

var textValue2 = Json.parseOrRaise("\n      [{\n        \"id\": \"g-1\",\n        \"baseId\": \"sdfs\",\n        \"subjectId\": \"n-george\",\n        \"propertyId\": \"p-name\",\n        \"value\": {\n            \"dataValue\": \"string\",\n            \"data\": \"George\"\n        }\n    },\n    {\n        \"id\": \"g-2\",\n        \"subjectId\": \"n-george\",\n        \"baseId\": \"sdfs\",\n        \"propertyId\": \"p-description\",\n        \"value\": {\n            \"dataValue\": \"string\",\n            \"data\": \"A test person!\"\n        }\n    },\n    {\n        \"id\": \"p-name-name\",\n        \"subjectId\": \"n-name\",\n        \"baseId\": \"sdfs\",\n        \"propertyId\": \"n-name\",\n        \"value\": {\n            \"dataValue\": \"string\",\n            \"data\": \"Name\"\n        }\n    }\n]\n       ");

describe("#to_json", (function () {
        return Jest.test("works", (function (param) {
                      Graph$Reason.load(textValue2);
                      console.log("HI");
                      return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](true));
                    }));
      }));

exports.textValue2 = textValue2;
/* textValue2 Not a pure module */
