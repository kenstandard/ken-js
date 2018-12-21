import _ from "lodash";
import * as R from 'ramda';

class Thing {
    constructor(id, db){
        this.id = id;
        this.db = db;
        return this;
    }
    statements(){
        return _.filter(this.db.statements, e => (e.thingId == this.id));
    }
    properties(){
        const uniq = R.uniqWith(R.eqBy(e => e.id))
        return uniq(this.statements().map(s => s.property()))
    }
    inverseStatements(){
        return _.filter(this.db.statements, e => (e.value == this.id));
    }
    inverseProperties(){
        const uniq = R.uniqWith(R.eqBy(e => e.propertyId))
        return uniq(this.inverseStatements()).map(s => s.property())
    }
    propertyStatements(propertyId){
        return this.statements().filter(s => s.propertyId == propertyId)
    }
    propertyThing(propertyId){
        return this.propertyStatements(propertyId)[0].property();
    }
    formattedValues(propertyId){
        return this.propertyStatements((propertyId)).map(r => r.formatValue())
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
        this.db = db;
        this.thingId = statement.thingId;
        this.propertyId = statement.propertyId;
        this.value = statement.value;
        this.id = statement.id || false;
        
        if (this.id) {
            this.internalThing = new Thing(this.id, db)
        };
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
    formatProperty(){
        return {
            thing: this.property()
        }
    }
    findValueAsThing(){
        return this.db.findThing(this.value);
    }
    formatValue(){
        const property = this.property()
        if (!property){
            console.log("Cannot find property for: ", this);
            return {error: "Nothing found"}
        }

        const dataType = this.property().textValue("p-data-type");
        if (dataType === "d-noun" || dataType === "d-thing"){
            return {thing: this.db.findThing(this.value)};
        } else {
            return {text: this.value, dataType};
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