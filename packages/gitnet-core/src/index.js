let foo = "bar";
import {Thing_to_json, Thing_to_jsonr} from "./Graph/Base.gen"
import * as baseLib from "./Graph/Base.gen"
import * as graphLib from "./Graph/Graph.gen"
import * as thingLib from "./Graph/ThingG.gen"
import * as factLib from "./Graph/Fact.gen"
import * as converters from "./Converters.gen"
// import 

let data =
      [{
        "id": "g-1",
        "subjectId": "n-george",
        "propertyId": "p-name",
        "value": {
            "dataValue": "string",
            "data": "George"
        }
    },
    {
        "id": "g-2",
        "subjectId": "n-george",
        "propertyId": "p-description",
        "value": {
            "dataValue": "string",
            "data": "A test person!"
        }
    },
    {
        "id": "p-0",
        "subjectId": "p-name",
        "propertyId": "p-name",
        "value": {
            "dataValue": "string",
            "data": "Name"
        }
    },
    {
        "id": "p-1",
        "subjectId": "p-description",
        "propertyId": "p-name",
        "value": {
            "dataValue": "string",
            "data": "Description"
        }
    }
]

export class Value {
    constructor(value, fact, db){
        this.value = value;
        this.fact = fact;
        this.db = db;
        return this;
    }
    json() {
        return factLib.Value_to_json(this.value);
    }
}

export class Fact {
    constructor(fact, db){
        this.fact = fact;
        this.db = db;
        return this;
    }
    json() {
        return factLib.T_to_json(this.fact)
    }
    property(){
      let thing = graphLib.findThingFromFact(this.db.graph, baseLib.PROPERTY, this.fact);
      return new Thing(thing, this);
    }
    subject(){
      let thing = graphLib.findThingFromFact(this.db.graph, baseLib.SUBJECT, this.fact);
      return new Thing(thing, this);
    }
    value(){
        return new Value(factLib.T_value(this.fact), this, this.db);
    }
}

export class Thing {
    constructor(thing, db){
        this.thing = thing;
        this.db = db;
        return this;
    }
    json(){
        return Thing_to_json(this.thing)
    }
    propertyValues(id){
        let tt = thingLib;
        let ps = converters.list_to_array(thingLib.propertyValues(id, this.thing));
        return ps.map(e => factLib.Value_to_json(e))
    }
    connectedPropertyThings(){
        let ps = converters.list_to_array(thingLib.filterFactsAndSelectThings(baseLib.SUBJECT, baseLib.PROPERTY, this.thing))
        return ps.map(e => new Thing(e, this.db))
    }
    isSubjectForFacts(){
        let ps = converters.list_to_array(thingLib.isSubjectForFacts(this.thing))
        return ps.map(e => new Fact(e, this.db))
    }
    isPropertyForFacts(){
        let ps = converters.list_to_array(thingLib.isPropertyForFacts(this.thing))
        return ps.map(e => new Fact(e, this.db))
    }
}

export class Database {
    constructor(graph){
        this.graph = graphLib.load(data);
        return this;
    }
    findThing(id){
      let thing = graphLib.findThing(id, this.graph);
      return new Thing(thing, this);
    }
    json(){
        return graphLib.to_json(this.graph)
    }
}

export function main(){
    // console.log("HI!", start, testData, to_json(start))
    return new Database();
}
