import _ from "lodash";
import {THINGS, JSON_DUMP_VALUES, RESTRICTED_VALUES} from "./config";

let addTemplates = (toml, thing) => {
    const allTemplates = _.get(toml, JSON_DUMP_VALUES.TEMPLATES) || {};
    let values = thing;
    let relevantTemplates = (_.get(values, JSON_DUMP_VALUES.TEMPLATES) || []).map(t => allTemplates[t])
    relevantTemplates.forEach(t => {values = _.merge(values, t)})
    return values
}
let randomChars = (n) => Math.random().toString(36).substring(2,2+n);

let randomId = () => randomChars(10);

function jsonFormatterSingle(json){
    let allTemplates = _.get(json, JSON_DUMP_VALUES.TEMPLATES) || {};
    let generators = _.get(json, JSON_DUMP_VALUES.GENERATORS) || [];
    let items = _.omit(json, RESTRICTED_VALUES);
    let registeredId = _.get(json, JSON_DUMP_VALUES.EXPORT_ID);

    let statements = _.keys(items).map(thingId => {
        let thing = json[thingId];
        thing = addTemplates(json, thing)
        let _statements = _.omit(thing, RESTRICTED_VALUES);
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
    return _.flatten(_.flatten(statements).map(s => [s, {thingId: s.id, propertyId: THINGS.DATA_SOURCE, value: registeredId}]))
}

export default function jsonFormatter(json){
    return _.flatten(json.map(e => jsonFormatterSingle(e)))
}