import React, { Component } from 'react';
import gitnet from "../node_modules/gitnet-js/dist/main.js";
import { Table, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {Value} from "./Value";
import _ from "lodash";

const InverseStatements = ({propertyId, inverseStatements}) => {
  const allPropertyIds = _.uniq(_.flatten(inverseStatements.map(s => s.thing().statements().map(i => i.propertyId))));
  const relevantPropertyIds = allPropertyIds.filter(p => p !== propertyId);
  const columns = relevantPropertyIds.map(id => {
    const thing = gitnet().findThing(id);
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
  dataIndex: 'name',
  key: 'name',
  render: (name) => (
    <Value value={(name)}/>
  )
},
  {
  title: 'Value',
  dataIndex: 'value',
  key: 'value',
  render: (value) => (
      <Value value={value}/>
  )
}
]
export class Thing extends Component {
  render() {
    const thingId = this.props.match.params.thingId
    let thing = gitnet().findThing(thingId);
    let name = thing.textValue("p-name");
    let description = thing.textValue("p-description");
    let statements = thing.statements();
    let formatted = statements.map(s => {
      return {
        name: s.formatProperty(),
        value: s.formatValue()
      }
    })
    let inverseStatements = thing.inverseStatements();
    let inverseProperties = _.uniq(inverseStatements.map(s => s.propertyId))
    let prop = gitnet().findThing(inverseProperties[0]);
    return (
      <div className="Noun">
        <h1>{name}</h1>
        <h3>ID: {thingId} </h3>
        {description && <p>{description}</p>}
        <br/>
        <br/>
        <h2> Properties </h2>
        <Table columns={columns} dataSource={formatted} pagination={false} size="small"/>
        <br/>
        <br/>
        <br/>
        {inverseProperties.map(p => {
          return (
          <div>
            <h2> {gitnet().findThing(p).textValue("p-inverse-name")} List</h2>
            <InverseStatements propertyId={p} inverseStatements={inverseStatements.filter(s => s.propertyId === p)}/>
          </div>
          )
        })}
      </div>
    );
  }
}