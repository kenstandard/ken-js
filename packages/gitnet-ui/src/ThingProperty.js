
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

export class ThingProperty extends Component {
  render() {
    if (!this.props.thing){
      return "Error: No value"
    }
    const {thing, propertyName, isLink=false} = this.props;
    let facts = thing.propertyIdFacts(propertyName)
    let data =  facts.map(e => e.value().data())[0] || "";
    return isLink ? <Link to={("/things/" + thing.id())}> {data} </Link> : data
  }
}