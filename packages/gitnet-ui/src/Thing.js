import React, { Component } from 'react';
import gitnet from "../node_modules/gitnet-js/dist/main.js";
import {db} from "./gitnet";
import { Table, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import {Value} from "./Value";
import _ from "lodash";
import Markdown from 'markdown-to-jsx';
import * as R from 'ramda';
import jsonData from "./data.json"
import {TableShow} from "./instances/table"
import {ThingProperty} from "./ThingProperty"

const expandedRowRender = ({facts}) => {
  let connectedProperties = _.uniqBy(_.flatten(facts.map(f => f.internalThing()).map(p => p.connectedPropertyThings())), r => r.id())
  const constants = [{
    title: "ID",
    dataIndex: 'fact',
    key: "id",
    render: (fact) => {
      return fact.id()
    }
  },
  {
    title: "Value",
    dataIndex: 'fact',
    key: "thing",
    render: (fact) => {
      return(<Value fact={fact}/>)
    }
  }]
  const columns = connectedProperties.map(p => ({
    title: p.propertyIdFacts("p-name")[0].value().data(),
    dataIndex: 'fact',
    key: p.id(),
    render: (fact) => {
      return(<Value fact={fact.internalThing().propertyIdFacts(p.id())[0]}/>)
    }
  }))

  const data = facts.map(fact => ({fact}));

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
  dataIndex: 'property',
  key: 'property',
  render: (s) => {
    return (<ThingProperty thing={(s)} propertyName="p-name" isLink={true}/>);
  }
},
  {
  title: 'Value',
  dataIndex: 'facts',
  key: 'facts',
  render: (s) => {
    return (
      <Value fact={s[0]}/>
    )
  }
}
]

export class Thing extends Component {
  render() {
    const thingId = this.props.match.params.thingId
    let thing = db.findThing(thingId);
    let name = thing.propertyIdFacts("p-name").map(e => e.value().data())[0]
    let description = thing.propertyIdFacts("p-description").map(e => e.value().data()).data
    let isSubjectForFacts = thing.isSubjectForFactsByProperty().map(property => (property));
    let isValueForFactsByProperty = thing.isValueForFactsByProperty()
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
            <h2> <ThingProperty thing={(p.property)} propertyName="p-name" /> List</h2>
            <InverseStatements property={p.property} facts={(p.facts)} />
          </div>
          )
        })}
        {/* // <TableShow thingId={thingId}/>} */}
      </div>
    );
  }
}