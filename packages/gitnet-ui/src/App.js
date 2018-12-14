import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import foo from "../node_modules/gitnet-js/dist/main.js";
import Button from 'antd/lib/button';
import { Table, Divider, Tag } from 'antd';
import _ from "lodash";

const columns = [
{
  title: 'name',
  dataIndex: 'name',
  key: 'name',
},
  {
  title: 'id',
  dataIndex: 'id',
  key: 'id',
},
  {
  title: 'instanceOf',
  dataIndex: 'instanceOf',
  key: 'instanceOf',
},
  {
  title: 'inverseName',
  dataIndex: 'inverseName',
  key: 'inverseName',
},
  {
  title: 'dataType',
  dataIndex: 'dataType',
  key: 'data-type',
},
]

const transformedData = foo().things.map(t => {
  let dataType = t.formattedValue("p-data-type");
  let instanceOf = t.formattedValue("p-instance-of");
  
  return {
    id: t.id,
    name: t.textValue("p-name"),
    inverseName: t.textValue("p-inverse-name"),
    instanceOf: _.get(instanceOf, "thing.name"),
    dataType: dataType && dataType.thing && dataType.thing.name
  }
});

class App extends Component {
  render() {
    foo();
    return (
      <div className="App">
        <header className="App-header">
          <Table columns={columns} dataSource={transformedData} pagination={false}/>
        </header>
      </div>
    );
  }
}

export default App;
