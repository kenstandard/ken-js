let foo = "bar";
import * as graphLib from "./Graph/Graph.gen"
import {Thing_to_json, Thing_to_jsonr} from "./Graph/Base.gen"
import * as glib from "./Graph/Graph.gen"
import * as blib from "./Graph/Base.gen"
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
        "id": "p-name-name",
        "subjectId": "n-name",
        "propertyId": "n-name",
        "value": {
            "dataValue": "string",
            "data": "Name"
        }
    }
]

export class Thing {
    constructor(thing, db){
        this.thing = thing;
        this.db = db;
        return this;
    }
    json(){
        return Thing_to_json(this.thing)
    }
}

export class Database {
    constructor(graph){
        this.graph = glib.load(data);
        return this;
    }
    findThing(id){
      let thing = glib.findThing(id, this.graph);
      return new Thing(thing, this);
    }
    json(){
        return glib.to_json(this.graph)
    }
}

export function main(){
    // console.log("HI!", start, testData, to_json(start))
    return new Database();
}
