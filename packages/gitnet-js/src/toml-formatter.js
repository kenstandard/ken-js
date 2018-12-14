import _ from "lodash";

let specialVars = ['id', 'templates', 'meta'];

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
        let statements = _.omit(thing, specialVars);
        return _.toPairs(statements).map(keyVal =>
            ({
                thingId,
                propertyId: keyVal[0],
                value: keyVal[1]
            })
        )
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