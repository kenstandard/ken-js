import _ from "lodash";

let specialVars = ['id', 'templates', 'meta', 'inverted'];

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

let addTemplates = (toml, thing) => {
    const allTemplates = _.get(toml, "meta.templates") || {};
    let values = thing;
    let relevantTemplates = (_.get(values, "meta.templates") || []).map(t => allTemplates[t])
    relevantTemplates.forEach(t => {values = _.merge(values, t)})
    return values
}
let randomChars = (n) => Math.random().toString(36).substring(n);

export default function tomlFormatter(toml){
    let allTemplates = _.get(toml, "meta.templates") || {};
    let generators = _.get(toml, "meta.generators") || [];
    let items = _.omit(toml, specialVars);

    let statements = _.keys(items).map(thingId => {
        let thing = toml[thingId];
        thing = addTemplates(toml, thing)
        let _statements = _.omit(thing, specialVars);
        let pairs = []

        _.toPairs(_statements).forEach(keyVal => {
            if (Array.isArray(keyVal[1])){
                keyVal[1].forEach(v => {
                    pairs.push({
                        thingId,
                        propertyId: keyVal[0],
                        value: v 
                    })
                })
            } else {
            pairs.push({
                thingId,
                propertyId: keyVal[0],
                value: keyVal[1]
            })
        }
        })

        let invertedStatements = thing.inverted || {};
        _.toPairs(invertedStatements).forEach(keyVal => {
            if (Array.isArray(keyVal[1])){
                keyVal[1].forEach(v => {
                    pairs.push({
                        thingId: v,
                        propertyId: keyVal[0],
                        value: thingId
                    })
                })
            } else {
            pairs.push({
                thingId: keyVal[1],
                propertyId: keyVal[0],
                value: thingId
            })
        }
        });

        return [...pairs]
    })

    generators.forEach(g => {
        let _statements = []
        const {table: {idPrefix, columns, data}, properties} = g;
        data.forEach((element, ii) => {
            const thingId = idPrefix + ii
            _.toPairs(properties).forEach(keyVal => {
                _statements.push({
                    thingId,
                    propertyId: keyVal[0],
                    value: keyVal[1]
                })
            })
            columns.forEach((columnName, index) => {
                _statements.push({
                    thingId,
                    propertyId: columnName,
                    value: element[index] 
                })
            })
        })
        statements = [...statements, ..._statements]
    })
    return _.flatten(statements);
}