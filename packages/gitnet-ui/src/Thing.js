import React, { Component } from 'react';
import gitnet from "../node_modules/gitnet-js/dist/main.js";
import { Table, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {Value} from "./Value";
import {Statement} from "./Statement";
import _ from "lodash";
import Markdown from 'markdown-to-jsx';
import * as R from 'ramda';
import jsonData from "./data.json"
import {TableShow} from "./instances/table"

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
  dataIndex: 'statement',
  key: 'name',
  render: (s) => (
    <Value value={(s.formatProperty())}/>
  )
},
  {
  title: 'Value',
  dataIndex: 'statement',
  key: 'value',
  render: (s) => (
    <Value value={(s.formatValue())}/>
  )
}
]

export class Thing extends Component {
  render() {
    const thingId = this.props.match.params.thingId
    let thing = gitnet(jsonData).findThing(thingId);
    let name = thing.textValue("p-name");
    let description = thing.textValue("p-description");
    let formatted = thing.statements().map(statement => ({statement}))
    let inverseStatements = thing.inverseStatements();
    let inverseProperties = thing.inverseProperties();
    return (
      <div className="Noun" key={thingId}>
        <h1>{name}</h1>
        <h3>ID: {thingId} </h3>
        {description && <div style={{fontSize: "10px"}}><Markdown>{description}</Markdown></div>}
        <br/>
        <br/>
        <h2> Properties </h2>
        <Table columns={columns} dataSource={formatted} pagination={false} size="small"
            key={thing.id}
              expandedRowRender={expandedRowRender}
        />
        <br/>
        <br/>
        <br/>
        {inverseProperties.map(p => {
          return (
          <div>
            <h2> {p.textValue("p-inverse-name")} List</h2>
            <InverseStatements property={p} inverseStatements={inverseStatements.filter(s => s.propertyId === p.id)}/>
          </div>
          )
        })}
        <TableShow thingId={thingId}/>
      </div>
    );
  }
}