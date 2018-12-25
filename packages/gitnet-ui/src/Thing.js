import React, { Component } from 'react';
import gitnet from "../node_modules/gitnet-js/dist/main.js";
import {main} from "../node_modules/gitnet-core/src/index.js";
import { Table, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {Value} from "./Value";
import _ from "lodash";
import Markdown from 'markdown-to-jsx';
import * as R from 'ramda';
import jsonData from "./data.json"
import {TableShow} from "./instances/table"
import {ThingName} from "./ThingName"

const expandedRowRender = ({statement}) => {

  let _thing = statement.internalThing;
  if (!_thing){ return ""}
  let properties = _thing.properties();
  const constants = [{
    title: "ID",
    dataIndex: 'thing',
    key: "id",
    render: (thing) => {
      return thing.id
    }
  },
  {
    title: "Value",
    dataIndex: 'thing',
    key: "value",
    render: (thing) => {
      return <Value value={statement.formatValue()}/>
    }
  }]
  const columns = properties.map(p => ({
    title: p.textValue("p-name"),
    dataIndex: 'thing',
    key: p.id,
    render: (thing) => {
      return <Value value={thing.formattedValue(p.id)}/>
    }
  }))

  const data = [{thing:_thing}];

  return (
    <div style={{padding: "10px"}}>
    <Table
      columns={[...constants, ...columns]}
      dataSource={data}
      size="small"
      pagination={false}
    />
    </div>
  );
};

const InverseStatements = ({property, inverseStatements}) => {
  const allPropertyIds = _.uniq(_.flatten(inverseStatements.map(s => s.thing().statements().map(i => i.propertyId))));
  const relevantPropertyIds = allPropertyIds.filter(p => p !== property.id);
  const columns = relevantPropertyIds.map(id => {
    const thing = gitnet(jsonData).findThing(id);
    const name = thing.textValue("p-name");
    return {
      title: name,
      dataIndex: id,
      key: id,
      render: (e, r) => {
        if (id === "p-name"){
          return <Link to={("/things/" + r.id)}> {e.text} </Link>
        } else {
          return <Value value={(e)}/>
        }
      }
    }
  })
  const data = inverseStatements.map(s => {
    const sThing = s.thing();
    let v = {id: sThing.id};
    relevantPropertyIds.forEach(id => {
      v[id] = sThing.formattedValue(id)
    })
    return v
  })
  return (
  <div>
      <Table columns={columns} dataSource={data} pagination={false} size="small"/>
  </div>
  )
}

const columns = [
{
  title: 'Property',
  dataIndex: 'fact',
  key: 'name',
  render: (s) => (
    <ThingName thing={(s.property())} propertyName="p-name"/>
  )
},
  {
  title: 'Value',
  dataIndex: 'fact',
  key: 'value',
  render: (s) => {
    return (
      s.value().json().data
    )
  }
}
]

export class Thing extends Component {
  render() {
    const thingId = this.props.match.params.thingId
    let db = main();
    let thing1 = db.findThing(thingId);
    let name = thing1.propertyValues("p-name")[0].data
    let description = thing1.propertyValues("p-description")[0].data
    let isSubjectForFacts = thing1.isSubjectForFacts().map(fact => ({fact}));
    let isValueForFacts = thing1.isValueForFacts();
    let testing = thing1.isSubjectForFactsByProperty()
    console.log(testing)
    // let a2 = thing1.isPropertyForFacts();
    // let a3 = thing1.connectedPropertyThings();
    // let formatted = thing.statements().map(statement => ({statement}))
    // let inverseStatements = thing.inverseStatements();
    // let inverseProperties = thing.inverseProperties();
    return (
      <div className="Noun" key={thingId}>
        <h1>{name}</h1>
        <h3>ID: {thingId} </h3>
        {description && <div style={{fontSize: "10px"}}><Markdown>{description}</Markdown></div>}
        <br/>
        <br/>
        <h2> Properties </h2>
        <Table columns={columns} dataSource={isSubjectForFacts} pagination={false} size="small"
            key={thingId}
              expandedRowRender={expandedRowRender}
        />
        <br/>
        <br/>
        <br/>
        {isValueForFacts.map(p => {
          return (
          <div>
            <h2> <ThingName thing={(p.property())} propertyName="p-name"/> List</h2>
            {/* <InverseStatements property={p} inverseStatements={inverseStatements.filter(s => s.propertyId === p.id)}/> */}
          </div>
          )
        })}
        {/* // <TableShow thingId={thingId}/>} */}
      </div>
    );
  }
}