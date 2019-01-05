import React, { Component } from 'react';
import './App.css';
import Button from 'antd/lib/button';
import {Treee} from './Tree';
import { Layout, Icon, Table, Divider, Tag, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Thing} from "./Thing"
import {Home} from "./Home"
import {TableTool} from "./tools/TableTool"
const SubMenu = Menu.SubMenu;

const {
  Header, Content, Footer, Sider,
} = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{height: "100vh"}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          theme={"light"}
        >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{height: "100vh"}}>
            <Menu.Item key="0">
            <Link to={("/")}>
              <div style={{fontSize: '16px', color: "white", textAlign: "left", fontWeight: "800"}}>
              Fact Explorer
              </div>
            </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="global" />
              <span>Things</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="share-alt" />
              <span>Properties</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="bank" /><span>Bases</span></span>}
            >
              <Menu.Item key="3">Factbase1</Menu.Item>
              <Menu.Item key="4">Factbase2</Menu.Item>
              <Menu.Item key="5">Factbase3</Menu.Item>
            </SubMenu>
          </Menu>
          </Sider>
        <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
          <Route exact path="/" component={Home} />
          <Route path="/things/:thingId" component={Thing} />
          <Route path="/tools/table" component={TableTool} />
          </Content>
        </Layout>
      </Router>
    );
  }
}


export default App;
