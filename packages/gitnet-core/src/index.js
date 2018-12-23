let foo = "bar";
import {start, findThing, to_json} from "./Graph/Graph.gen"
import {Thing_to_json} from "./Graph/Base.gen"
// import 

export function graph(){
    start
}

export class Thing {
    constructor(thing, db){
        this.thing = item;
        this.db = db;
        return this;
    }
    json(){
        return Thing_to_json(this.thing)
    }
}

export class Database {
    constructor(graph){
        this.graph = start;
        return this;
    }
    findThing(id){
      return new Thing(findThing(id, this.graph), this);
    }
    json(){
        return to_json(this.graph)
    }
}

export default function main(){
    // console.log("HI!", start, testData, to_json(start))
    return new Database();
}
