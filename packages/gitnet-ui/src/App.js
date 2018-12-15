import React, { Component } from 'react';
import './App.css';
import Button from 'antd/lib/button';
import { Layout, Icon, Table, Divider, Tag, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Thing} from "./Thing"
import {Home} from "./Home"

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
          <Link to="/" style={{}}>DEX Explorer</Link>
          </Sider>
        <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
          <Route exact path="/" component={Home} />
          <Route path="/things/:thingId" component={Thing} />
          </Content>
        </Layout>
      </Router>
    );
  }
}


export default App;
