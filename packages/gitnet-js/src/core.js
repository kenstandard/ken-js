import _ from "lodash";

class Noun {
    constructor(noun, wiki){
        this.wiki = wiki;
        this.id = noun.id;
        this.name = noun.name;
        this.description = noun.description;
        return this;
    }
    statements(){
        return _.filter(this.wiki.statements, e => (e.nounId == this.id));
    }
    inverseStatements(){
        return _.filter(this.wiki.statements, e => (e.value == this.id));
    }
    toJSON(){
        return {
        id: this.id,
        name: this.name,
        description: this.description
        }
    }
    toGraphql(){
        return Object.assign({}, this.toJSON(), {
            statements: this.statements().map(s => s.toJSON()),
            inverseStatements: this.inverseStatements().map(s => s.toJSON())
        })
    }
}

class Property {
    constructor(property, wiki){
        this.wiki = wiki;
        this.id = property.id;
        this.name = property.name;
        this.type = property.type;
        this.inverseName = property.inverseName;
        this.description = property.description;
        return this;
    }
    toJSON(){
        return {
            id: this.id,
            name: this.name,
            inverseName: this.inverseName,
            description: this.description,
            type: this.type
        }
    }
}

class Statement {
    constructor(statement, wiki){
        this.nounId = statement.nounId;
        this.propertyId = statement.propertyId;
        this.value = statement.value;
        this.wiki = wiki;
        this.attributes = _.omit(statement, ['nounId', 'propertyId']);
        return this;
    }
    noun(){
        return this.wiki.findNoun(this.nounId)
    }
    valueNoun(){
        return this.wiki.findNoun(this.value)
    }
    property(){
        return this.wiki.findProperty(this.propertyId);
    }
    formatValue(){
        if (this.property().type == "NOUN"){
            return {noun: this.wiki.findNoun(this.value).toJSON()};
        } else {
            return {text: this.value};
        }
    }
    toJSON(){
        return {
            nounId: this.nounId,
            noun: this.noun().toJSON(),
            value: this.formatValue(),
            property: this.property().toJSON()
        }
    }
}

export class Timl {
    constructor(data){
        this.wiki = data;
        this.nouns = this.wiki.nouns.map(e => new Noun(e, this));
        this.properties = [this.wiki.properties.map(e => new Property(e, this))];
        let statements = this.wiki.statements.map(e => new Statement(e, this));
        // this.wiki.nouns && _.map(this.wiki.nouns, noun => _.map(noun.statements, (s => {
        //     let newStatement = Object.assign({},s,  {nounId: noun.id});
        //     console.log(newStatement);
        //     let newer = new Statement(newStatement, this);
        //     statements.push(newer);
        // })));
        this.statements = statements;
        return this;
    }
    findNoun(id){
        return _.find(this.nouns, e => e.id == id);
    }
    findProperty(id){
        return _.find(this.properties, e => e.id == id);
    }
}