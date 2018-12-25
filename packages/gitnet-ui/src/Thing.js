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

const InverseStatements = ({property, facts}) => {
  let connectedProperties = _.uniqBy(_.flatten(facts.map(f => f.subject()).map(p => p.connectedPropertyThings())), r => r.id())
  const columns = connectedProperties.map(p => {
    const name = p.propertyIdFacts("p-name")[0].value().data();
    return {
      title: name,
      dataIndex: p.id(),
      key: p.id(),
      render: (e, fact) => {
        let val = fact.subject().propertyIdFacts(p.id())[0].value().data();
        if (p.id() === "p-name"){
          return <Link to={("/things/" + fact.subject().id())}> {val} </Link>
        } else {
          return val
        }
      }
    }
  })
  return (
   <Table columns={columns} dataSource={facts} pagination={false} size="small"/>
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
    let name = thing1.propertyIdFacts("p-name").map(e => e.value().data())[0]
    let description = thing1.propertyIdFacts("p-description").map(e => e.value().data()).data
    let isSubjectForFacts = thing1.isSubjectForFacts().map(fact => ({fact}));
    let isValueForFactsByProperty = thing1.isValueForFactsByProperty()
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
        {isValueForFactsByProperty.map(p => {
          return (
          <div>
            <h2> <ThingName thing={(p.property)} propertyName="p-name"/> List</h2>
            <InverseStatements property={p.property} facts={(p.facts)} />
          </div>
          )
        })}
        {/* // <TableShow thingId={thingId}/>} */}
      </div>
    );
  }
}