import React, { Component } from 'react';
import './App.css';
import Button from 'antd/lib/button';
import { Tree, Layout, Icon, Table, Divider, Tag, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Thing} from "./Thing"
import {Home} from "./Home"
import {TableTool} from "./tools/TableTool"
import {db} from "./gitnet";
import _ from "lodash";
import * as R from 'ramda';

const SubMenu = Menu.SubMenu;

const {TreeNode} = Tree;

let toThing = (str) => ({
  title: str,
  id: str,
  children: db.childDirectories(str).map(toThing)
})

export class Treee extends Component {
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  })
  render() {
    let dirs = db.rootDirectories();
    let treeData = dirs.map(toThing)
    console.log(treeData);
    return (
      <Tree
      showLine
      defaultExpandedKeys={[]}
      onSelect={(a,b,c) => {console.log(b.node.props.title)}}
    >
      {this.renderTreeNodes(treeData)}
    </Tree>
    )
  }
}