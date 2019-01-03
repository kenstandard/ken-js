let foo = "bar";
import * as gitNet from "./Interface.gen"
import * as R from "ramda";

let data2 =       [
    {
    "baseId": "base12",
    "resourceId": "2/2",
    "n-fred": {
      "@base/properties/p-name": "Fred",
    },
    "@base/properties/p-name": {
        "@base/properties/p-name": "Name"
    },
    "p-friend": {
        "@base/properties/p-name": "Friend"
    },
    "p-description": {
        "@base/properties/p-name": "Description"
    }
  },
  {
    "baseId": "base12",
    "resourceId": "2/2",
    "n-george": {
      "@base/properties/p-name": ["GEORGIE!!", "GEORGEOO", "sfdsdf"],
      "p-friend": "n-fred"
    },
    "n-jeremy": {
      "@base/properties/p-name": "George"
    }
  }]
  let data3 = [
    {
      "baseId": "base",
      "resourceId": "properties",
      "n-thing": {
        "p-name": "Thing"
      },
      "n-intangible": {
        "p-name": "Intangible",
        "p-subclass-of": "n-thing"
      },
      "n-role": {
        "p-name": "Role",
        "p-subclass-of": "n-intangible",
        "p-description": "Represents additional information about a relationship or property. For example a Role can be used to say that a 'member' role linking some SportsTeam to a player occurred during a particular time period. Or that a Person's 'actor' role in a Movie was for some particular characterName. Such properties can be attached to a Role entity, which is then associated with the main entities using ordinary properties like 'member' or 'actor'."
      },
      "n-organization-role": {
        "p-name": "Organization Role",
        "p-description": "A subclass of Role used to describe roles within organizations.",
        "p-subclass-of": "n-role"
      },
      "n-repo-base": {
        "p-name": "Base Repo",
        "p-description": "The base repository"
      },
      "n-person": {
        "p-name": "Person"
      }
    },
    {
      "baseId": "base",
      "resourceId": "properties",
      "meta": {
        "templates": {
          "property": {
            "p-instance-of": "n-property"
          }
        }
      },
      "n-property": {
        "p-name": "Property"
      },
      "p-name": {
        "p-name": "Name",
        "templates": [
          "property"
        ],
        "p-data-type": "d-string"
      },
      "p-description": {
        "p-name": {
          "value": "Description",
          "id": "sdlkfjsdf"
        },
        "templates": [
          "property"
        ],
        "p-data-type": "d-string"
      },
      "sdlkfjsdf": {
        "p-name": "test!",
        "p-part-of": "p-name",
        "p-aliases": "Foobar and Friends!"
      },
      "p-instance-of": {
        "p-name": "Instance of",
        "p-inverse-name": "Instance",
        "p-data-type": "d-noun",
        "templates": [
          "property"
        ]
      },
      "p-inverse-name": {
        "p-name": "Name Inverse",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-wikidata-id": {
        "p-name": "Wikidata id",
        "p-description": "Id if on wikidata",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-data-type": {
        "p-name": "Data Type",
        "p-data-type": "d-noun",
        "p-inverse-name": "Is Data Type For",
        "templates": [
          "property"
        ]
      },
      "p-aliases": {
        "p-name": "aliases",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-works-on": {
        "p-name": "Works On",
        "p-description": "When noun works on things B.",
        "p-data-type": "d-thing",
        "p-inverse-name": "Worked on by",
        "templates": [
          "property"
        ]
      },
      "p-part-of": {
        "p-name": "Part of",
        "p-data-type": "d-thing",
        "p-inverse-name": "Contains",
        "templates": [
          "property"
        ]
      },
      "p-employed-by": {
        "p-name": "Employed By",
        "p-data-type": "d-thing",
        "p-inverse-name": "Employs",
        "templates": [
          "property"
        ]
      },
      "p-subclass-of": {
        "p-name": "Subclass of",
        "p-data-type": "d-thing",
        "p-inverse-name": "Superclass of",
        "p-wikidata-id": "P279",
        "templates": [
          "property"
        ]
      },
      "p-git-repo": {
        "p-name": "Primary Git Repo",
        "p-data-type": "d-url",
        "p-inverse-name": "Is primary git repo of",
        "templates": [
          "property"
        ]
      },
      "p-url": {
        "p-name": "Url",
        "p-data-type": "d-url",
        "templates": [
          "property"
        ]
      },
      "p-belongs-to": {
        "p-name": "Belongs to",
        "p-data-type": "d-thing",
        "p-inverse-name": "Contains",
        "templates": [
          "property"
        ]
      },
      "n-list": {
        "p-wikidata-id": "Q12139612"
      },
      "p-is-in-list": {
        "p-name": "Is in list",
        "p-data-type": "d-thing",
        "p-inverse-name": "Contains",
        "templates": [
          "property"
        ]
      },
      "p-was-autogenerated": {
        "p-name": "Belongs to",
        "p-data-type": "d-noun",
        "p-inverse-name": "Contains",
        "templates": [
          "property"
        ]
      },
      "p-official-website": {
        "p-name": "Official Website",
        "p-wikidata-id": "P856",
        "p-data-type": "d-url",
        "templates": [
          "property"
        ]
      },
      "p-image": {
        "p-name": "Image (url)",
        "p-wikidata-id": "P18",
        "p-data-type": "d-image-url",
        "templates": [
          "property"
        ]
      },
      "p-parent-organization": {
        "p-name": "Parent Organization",
        "p-schemaorg-id": "parentOrganization",
        "p-inverse-name": "Child Organization",
        "p-data-type": "d-noun",
        "templates": [
          "property"
        ]
      },
      "p-twitter-username": {
        "p-name": "Twitter Username",
        "p-description": "this item's username on Twitter; do not include the '@' symbol",
        "p-wikidata-id": "P2002",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-github-username": {
        "p-name": "Github Username",
        "p-description": "this item's username on Github",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-lesswrong-username": {
        "p-name": "LessWrong Username",
        "p-description": "this item's username on LessWrong",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-effective-altruism-forum-username": {
        "p-name": "Effective Altruism Forum Username",
        "p-description": "this item's username on the Effective Altruism Forum",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-medium-username": {
        "p-name": "Medium Username",
        "p-description": "this item's username on Medium",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-linkedin-id": {
        "p-name": "Linked Username",
        "p-description": "this item's username on Linked",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
      },
      "p-source-url": {
        "p-name": "Source Url",
        "p-description": "this item's source Url",
        "p-data-type": "d-url",
        "templates": [
          "property"
        ]
      },
      "p-data-source": {
        "p-name": "Data Source",
        "p-inverse-name": "Data source for",
        "p-description": "A thing's data source",
        "p-data-type": "d-noun",
        "templates": [
          "property"
        ]
      },
      "p-version": {
        "p-name": "Version",
        "p-data-type": "d-string",
        "templates": [
          "property"
        ]
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
        return gitNet.Value_to_json(this.value);
    }
    dataType(){
        return this.json().dataValue
    }
    data(){
        return this.json().data
    }
    thing(){
        if (this.dataType() !=="thingId"){ return false }
        return this.db.findThing(this.data())
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
            this.factList = gitNet.Graph_factList(this.db.graph);
        }
        let _query = gitNet.Query_from_json(query);
        let list = gitNet.Filter_query(_query,this.factList)
        return (new FactList(this.db, list))
    }
    facts(){
        let ps = gitNet.list_to_array(this.factList);
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
        return gitNet.Fact_to_json(this.fact)
    }
    id() {
        return this.json().id;
    }
    internalThing(){
        return this.db.findThing(this.id())
    }
    thing(edge){
      let thing = gitNet.Graph_findThingFromFact(this.db.graph, edge, this.fact);
      return new Thing(thing, this.db);
    }
    property(){
        return this.thing(gitNet.Graph_EdgeTypes_property)
    }
    subject(){
        return this.thing(gitNet.Graph_EdgeTypes_subject)
    }
    value(){
        return new Value(gitNet.Fact_value(this.fact), this, this.db);
    }
}

export class Thing {
    constructor(thing, db){
        this.thing = thing;
        this.db = db;
        return this;
    }
    json(){
        return gitNet.Thing_to_json(this.thing)
    }
    id() {
        return this.json().id;
    }
    propertyIdFacts(id){
        return this.isEdge("SUBJECT").filter({id: id, edge: "PROPERTY", q: ""}).facts();
    }
    isEdge(edge){
        return (new FactList(this.db)).filter({id: this.json().id, edge, q: ""})
    }
    isSubjectForFacts(){
        return this.isEdge("SUBJECT").facts()
    }
    isPropertyForFacts(){
        return this.isEdge("PROPERTY").facts()
    }
    isValueForFacts(){
        return this.isEdge("VALUE").facts()
    }
    connectedPropertyThings(){
        return this.isEdge("SUBJECT").facts().map(f => f.property())
    }
    _byProperty(edge){
        let facts = this.isEdge(edge);
        let props = facts.facts().map(f => f.property());
        let properties = R.uniqBy(r => r.id(), props);
        let bunch = properties.map(property => ({
            property: property,
            facts: facts.filter({id: property.json().id, edge: "PROPERTY", q: ""}).facts()
        }))
        return bunch
    }
    isSubjectForFactsByProperty(){
        return this._byProperty("SUBJECT");
    }
    isValueForFactsByProperty(){
        return this._byProperty("VALUE");
    }
}

export class Database {
    constructor(graph){
        this.graph = gitNet.Graph_fromJson([...data2, ...data3])
        console.log(this.json())
        return this;
    }
    findThing(id){
      let thing = gitNet.Graph_findThing(id, this.graph);
      if (!!thing){
      return new Thing(thing, this);
      } else {
          return false
      }
    }
    things(){
        return gitNet.Graph_things(this.graph).filter(t => !!t).map(t => new Thing(t, this))
    }
    json(){
        return gitNet.Graph_to_json(this.graph)
    }
}

export function main(){
    return new Database();
}
