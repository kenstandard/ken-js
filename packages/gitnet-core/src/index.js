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
        "id": "g-3",
        "subjectId": "n-george",
        "propertyId": "p-best-friend",
        "value": {
            "dataValue": "thingId",
            "data": "n-geoff"
        }
    },
    {
        "id": "g-4",
        "subjectId": "n-geoff",
        "propertyId": "p-name",
        "value": {
            "dataValue": "string",
            "data": "Geoff"
        }
    },
    {
        "id": "g-5",
        "subjectId": "n-geoff",
        "propertyId": "p-description",
        "value": {
            "dataValue": "string",
            "data": "Geoff!!"
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
    },
    {
        "id": "p-2",
        "subjectId": "p-best-friend",
        "propertyId": "p-name",
        "value": {
            "dataValue": "string",
            "data": "Best Friend"
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

export class FactList {
    constructor(db, factList=[]){
        this.db = db;
        this.factList = factList;
        return this;
    }
    filter(query){
        if (this.factList.length == 0){
            this.factList = graphLib.facts(this.db.graph);
        }
        let _query = factLib.Query_fromJson(query);
        let list = factLib.Filters_query(_query,this.factList)
        return (new FactList(this.db, list))
    }
    facts(){
        let ps = converters.list_to_array(this.factList);
        return ps.map(e => new Fact(e, this.db))
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
    isEdge(edge){
        return (new FactList(this.db)).filter({id: this.json().id, edge, q: ""}).facts()
    }
    isSubjectForFacts(){
        return this.isEdge("SUBJECT")
    }
    isPropertyForFacts(){
        return this.isEdge("PROPERTY")
    }
    isValueForFacts(){
        return this.isEdge("VALUE")
    }
    connectedPropertyThings(){
        return this.isEdge("SUBJECT").map(f => f.property())
    }
    isSubjectForFactsByProperty(){
        let properties = this.connectedPropertyThings();
        let subjectFacts = (new FactList(this.db)).filter({id: this.json().id, edge: "SUBJECT", q: ""});
        let bunch = properties.map(property => ({
            property: property,
            facts: subjectFacts.filter({id: property.json().id, edge: "PROPERTY", q: ""}).facts()
        }))
        return bunch
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
