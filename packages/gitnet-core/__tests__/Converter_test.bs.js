// Generated by BUCKLESCRIPT VERSION 4.0.14, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Json = require("@glennsl/bs-json/src/Json.bs.js");
var ADT$Reason = require("../src/Standards/ADT.bs.js");
var JsonToUnprocessed$Reason = require("../src/Converters/JsonToUnprocessed.bs.js");
var UncompressedToAST$Reason = require("../src/Converters/UncompressedToAST.bs.js");

var value = Json.parseOrRaise("\n      [\n        {\n        \"baseId\": \"base12\",\n        \"resourceId\": \"2/1\",\n        \"n-fred\": {\n          \"p-name\": \"Fred\",\n          \"p-test\": [\"sdf\", \"sdfsdf\", \"sdfsdf\"],\n          \"p-description\": {\"id\": \"sdf\", \"value\": \"sdffsd\"}\n        }\n      },\n      {\n        \"baseId\": \"base13\",\n        \"resourceId\": \"2/2\",\n        \"n-george\": {\n          \"p-name\": \"George\",\n          \"p-friend\": \"n-jeremy\",\n          \"p-test\": [\"sdf\", \"sdfsdf\", \"sdfsdf\"],\n          \"p-description\": {\"id\": \"sdf\", \"value\": \"sdffsd\"}\n        },\n        \"n-jeremy\": {\n          \"p-name\": \"George\",\n          \"p-test\": [\"sdf\", \"sdfsdf\", \"sdfsdf\"],\n          \"p-description\": {\"id\": \"sdf\", \"value\": \"sdffsd\"}\n        }\n      }]\n   ");

describe("#to_json", (function () {
        return Jest.test("works", (function (param) {
                      console.log(ADT$Reason.showFacts(ADT$Reason.run(UncompressedToAST$Reason.run(JsonToUnprocessed$Reason.run(value)))));
                      return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](true));
                    }));
      }));

exports.value = value;
/* value Not a pure module */
