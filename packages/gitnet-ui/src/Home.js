import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import _ from "lodash";
import { Link } from 'react-router-dom';
import gitnet from "../node_modules/gitnet-js/dist/main.js";
import {Value} from "./Value";

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
  {
  title: 'Inverse Name',
  dataIndex: 'inverseName',
  key: 'inverseName',
},
  {
  title: 'Data Type',
  dataIndex: 'dataType',
  key: 'data-type',
},
]

const transformedData = gitnet().things.map(t => {
  return {
    id: t.id,
    name: <Value value={t.formattedValue("p-name")}/>,
    inverseName: <Value value={t.formattedValue("p-inverse-name")}/>,
    instanceOf: <Value value={t.formattedValue("p-instance-of")}/>,
    dataType: <Value value={t.formattedValue("p-data-type")}/>
  }
});

export class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Table columns={columns} dataSource={transformedData} pagination={false}/>
        </header>
      </div>
    );
  }
}
