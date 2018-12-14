import _ from "lodash";

class Thing {
    constructor(id, db){
        this.id = id;
        this.db = db;
        return this;
    }
    statements(){
        return _.filter(this.db.statements, e => (e.thingId == this.id));
    }
    inverseStatements(){
        return _.filter(this.db.statements, e => (e.value == this.id));
    }
    formattedValues(propertyId){
        return this.statements().filter(s => s.propertyId == propertyId).map(r => r.formatValue())
    }
    formattedValue(propertyId){
        let values = this.formattedValues(propertyId);
        return (values.length && values[0]) || {};
    }
    textValues(propertyId){
        return this.statements().filter(s => s.propertyId == propertyId).map(r => r.value)
    }
    textValue(propertyId){
        let values = this.textValues(propertyId);
        return (values.length && values[0]) || "";
    }
    toGraphql(){
        return Object.assign({}, this.toJSON(), {
            statements: this.statements().map(s => s.toJSON()),
            inverseStatements: this.inverseStatements().map(s => s.toJSON())
        })
    }
    toJSON(){
        return {
        id: this.id,
        name: this.textValue("p-name")
        }
    }
}

class Statement {
    constructor(statement, db){
        this.thingId = statement.thingId;
        this.propertyId = statement.propertyId;
        this.value = statement.value;
        this.db = db;
        return this;
    }
    thing(){
        return this.db.findThing(this.thingId)
    }
    property(){
        return this.db.findThing(this.propertyId)
    }
    valueThing(){
        return this.db.findThing(this.value)
    }
    formatValue(){
        if (this.property().textValue("p-data-type") === "d-noun"){
            return {thing: this.db.findThing(this.value).toJSON()};
        } else {
            return {text: this.value};
        }
    }
    toJSON(){
        return {
            thingId: this.thingId,
            propertyId: this.propertyId,
            thing: this.thing().toJSON(),
            value: this.formatValue(),
            property: this.property().toJSON()
        }
    }
}

export class Database {
    constructor(data){
        let statements = data.map(e => new Statement(e, this));
        this.statements = statements;
        this.things = _.uniq(this.statements.map(e => e.thingId)).map(id => new Thing(id, this))
        return this;
    }
    findThing(id){
        return _.find(this.things, e => e.id == id);
    }
}