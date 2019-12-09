import React, { Component } from 'react';
import './App.css';
import { Menu, Tree } from 'antd';
import { db } from "./kendb";

const SubMenu = Menu.SubMenu;

const { TreeNode } = Tree;

let toThing = (str) => ({
  title: str,
  id: str,
  children: db.childDirectories(str).map(toThing)
});

export class Treee extends Component {
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={ item.title } key={ item.key } dataRef={ item }>
          { this.renderTreeNodes(item.children) }
        </TreeNode>
      );
    }
    return <TreeNode { ...item } />;
  });

  render() {
    let dirs = db.rootDirectories();
    let treeData = dirs.map(toThing);

    return (
      <Tree
        showLine
        defaultExpandedKeys={ [] }
        onSelect={ (a, b, c) => {
          console.log(b.node.props.title)
        } }
      >
        { this.renderTreeNodes(treeData) }
      </Tree>
    )
  }
}
