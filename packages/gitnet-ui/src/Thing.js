import React, { Component } from 'react';
import gitnet from "../node_modules/gitnet-js/dist/main.js";
import { Table, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {Value} from "./Value";
import _ from "lodash";

const InverseStatements = ({inverseStatements}) => (
  <div>
    {inverseStatements.map(s => (
      <div>
        <Link to={"/things/"+ s.thing().id}>
          {s.thing().textValue("p-name")}
        </Link>
      </div>
    ))}
  </div>
)

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
        <Table columns={columns} dataSource={formatted} pagination={false}/>
        <br/>
        <br/>
        <br/>
        {inverseProperties.map(p => (
          <div>
            <h2> {gitnet().findThing(p).textValue("p-inverse-name")} List</h2>
            <InverseStatements inverseStatements={inverseStatements.filter(s => s.propertyId === p)}/>
          </div>
        ))}
      </div>
    );
  }
}