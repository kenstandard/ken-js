import React, { Component } from 'react';
import jsonData from "../data.json"
import {Value} from "../Value";
import { Table, Divider, Tag } from 'antd';

// TODO: Fix for new gitCore
export class TableShow extends Component {
  render() {
    return (<div>test</div>)
  }
}
    // let {thingId} = this.props;
    // let columns = thing.inverseStatements().filter(s => s.propertyId === "p-column-of").map(r => r.thing())
    // let rows = thing.inverseStatements().filter(s => s.propertyId === "p-is-row-of").map(r => r.thing())
    // const _columns = columns.map(c => {
    //     let property = c.propertyStatements("p-property")[0].findValueAsThing();
    //     return ({
    //         title: property.textValue("p-name"),
    //         dataIndex: 'thing',
    //         key: c.id,
    //         render: (thing) => {
    //             return <Value value={thing.formattedValue(property.id)}/>
    //         }
    //     })
    // })
    // let data = rows.map(row => ({thing: row}))
    // return (
    //   <div>
    //   <h1> Table! </h1>
    //     <Table
    //     columns={_columns}
    //     dataSource={data}
    //     size="small"
    //     pagination={false}
    //     />
    //   </div>
    // );