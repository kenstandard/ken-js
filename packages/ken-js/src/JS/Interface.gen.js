/* Untyped file generated from Interface.re by genType. */

const $$toJS409478456 = {"0": "SUBJECT", "1": "PROPERTY", "2": "VALUE"};

const $$toRE409478456 = {"SUBJECT": 0, "PROPERTY": 1, "VALUE": 2};

import * as Curry from 'bs-platform/lib/es6/curry.js';

import * as InterfaceBS from './Interface.bs';

export const Graph_fromJson = InterfaceBS.Graph.fromJson;

export const Graph_things = InterfaceBS.Graph.things;

export const Graph_facts = InterfaceBS.Graph.facts;

export const Graph_factList = InterfaceBS.Graph.factList;

export const Graph_directoryArray = InterfaceBS.Graph.directoryArray;

export const Graph_childDirectories = function (Arg1, Arg2) {
  const result = Curry._2(InterfaceBS.Graph.childDirectories, Arg1, Arg2);
  return result
};

export const Graph_rootDirectories = InterfaceBS.Graph.rootDirectories;

export const Graph_findThing = function (Arg1, Arg2) {
  const result = Curry._2(InterfaceBS.Graph.findThing, Arg1, Arg2);
  return result
};

export const Graph_findThingFromFact = function (Arg1, Arg2, Arg3) {
  const result = Curry._3(InterfaceBS.Graph.findThingFromFact, Arg1, $$toRE409478456[Arg2], Arg3);
  return result
};

export const Graph_to_json = InterfaceBS.Graph.to_json;

export const Graph_EdgeTypes_property = $$toJS409478456[InterfaceBS.Graph.EdgeTypes.property];

export const Graph_EdgeTypes_subject = $$toJS409478456[InterfaceBS.Graph.EdgeTypes.subject];

export const Thing_to_json = InterfaceBS.Thing.to_json;

export const Directory_parent = InterfaceBS.Directory.parent;

export const Fact_to_json = InterfaceBS.Fact.to_json;

export const Fact_value = InterfaceBS.Fact.value;

export const Filter_query = function (Arg1, Arg2) {
  const result = Curry._2(InterfaceBS.Filter.query, Arg1, Arg2);
  return result
};

export const Query_from_json = InterfaceBS.Query.from_json;

export const Value_to_json = InterfaceBS.Value.to_json;

export const list_to_array = InterfaceBS.list_to_array;

export const Value = InterfaceBS.Value

export const Thing = InterfaceBS.Thing

export const Fact = InterfaceBS.Fact

export const Query = InterfaceBS.Query

export const Graph = InterfaceBS.Graph

export const Directory = InterfaceBS.Directory

export const Filter = InterfaceBS.Filter
