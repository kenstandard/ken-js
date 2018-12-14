import _ from "lodash";

export default function tomlFormatter(toml){
    let items = _.omit(toml, ['templates']);
    const statements = _.keys(items).map(thingId => {
        let v = toml[thingId];
        v.templates = v.templates || [];
        let templates = v.templates.map(t => toml.templates[t])
        templates.forEach(t => {v = _.merge(v, t)})
        let statements = _.omit(v, ['id', 'templates']);
        return _.toPairs(statements).map(keyVal =>
            ({
                thingId,
                propertyId: keyVal[0],
                value: keyVal[1]
            })
        )
    })
    return _.flatten(statements);
}