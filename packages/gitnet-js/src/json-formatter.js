import _ from "lodash";

let specialVars = ['id', 'templates', 'meta', 'inverted'];

let addTemplates = (toml, thing) => {
    const allTemplates = _.get(toml, "meta.templates") || {};
    let values = thing;
    let relevantTemplates = (_.get(values, "meta.templates") || []).map(t => allTemplates[t])
    relevantTemplates.forEach(t => {values = _.merge(values, t)})
    return values
}
let randomChars = (n) => Math.random().toString(36).substring(2,2+n);

let randomId = () => randomChars(10);

function jsonFormatterSingle(toml){
    let allTemplates = _.get(toml, "meta.templates") || {};
    let generators = _.get(toml, "meta.generators") || [];
    let items = _.omit(toml, specialVars);
    let registeredId = _.get(toml, 'meta.register.id');

    let statements = _.keys(items).map(thingId => {
        let thing = toml[thingId];
        thing = addTemplates(toml, thing)
        let _statements = _.omit(thing, specialVars);
        let pairs = []

        _.toPairs(_statements).forEach(keyVal => {
            if (Array.isArray(keyVal[1])){
                keyVal[1].forEach(v => {
                    pairs.push({
                        id: randomId(),
                        thingId,
                        propertyId: keyVal[0],
                        value: v 
                    })
                })
            } else {
            pairs.push({
                id: keyVal[1].id || randomId(),
                thingId,
                propertyId: keyVal[0],
                value: keyVal[1].value || keyVal[1]
            })
        }
        })

        let invertedStatements = thing.inverted || {};
        _.toPairs(invertedStatements).forEach(keyVal => {
            if (Array.isArray(keyVal[1])){
                keyVal[1].forEach(v => {
                    pairs.push({
                        id: randomId(),
                        thingId: v,
                        propertyId: keyVal[0],
                        value: thingId
                    })
                })
            } else {
            pairs.push({
                id: randomId(),
                thingId: keyVal[1],
                propertyId: keyVal[0],
                value: thingId
            })
        }
        });

        return [...pairs]
    })

    generators.forEach(g => {
        const {table: {idPrefix, columns, data}, properties} = g;
        data.forEach((element, ii) => {
            const thingId = idPrefix + ii
            _.toPairs(properties).forEach(keyVal => {
                statements.push({
                    thingId,
                    propertyId: keyVal[0],
                    value: keyVal[1]
                })
            })
            columns.forEach((columnName, index) => {
                statements.push({
                    thingId,
                    propertyId: columnName,
                    value: element[index] 
                })
            })
        })
    })
    return _.flatten(_.flatten(statements).map(s => [s, {thingId: s.id, propertyId: "p-data-source", value: registeredId}]))
}

export default function jsonFormatter(json){
    return _.flatten(json.map(e => jsonFormatterSingle(e)))
}