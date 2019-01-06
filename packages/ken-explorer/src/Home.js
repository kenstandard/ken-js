import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import _ from "lodash";
import { Link } from 'react-router-dom';
import {Value} from "./Value";
import {db} from "./kendb";

import jsonData from "./data.json"

import {CONSTANTS} from "./setup.js"

const columns = [
{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: (name, record) => (
    <Link to={("/things/" + record.id)}> {name} </Link>
  )
},
  {
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
},
  {
  title: 'Instance Of',
  dataIndex: 'instanceOf',
  key: 'instanceOf',
},
]

const transformedData = db.things().filter(t => t.propertyIdFacts(CONSTANTS.NAME).length > 0).map(t => {
  return {
    id: t.id(),
    name: <Value fact={t.propertyIdFacts(CONSTANTS.NAME)[0]}/>,
    instanceOf: <Value fact={t.propertyIdFacts(CONSTANTS.INSTANCE_OF)[0]}/>,
  }
});

export class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Table columns={columns} dataSource={transformedData} pagination={false} size="small"/>
        </header>
      </div>
    );
  }
}
