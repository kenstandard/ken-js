import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import {ThingProperty} from "./ThingProperty"

export class Value extends Component {
  render() {
    if (!this.props.fact){
      return "Error: No value"
    }
    let value = this.props.fact.value();
    let type = value.dataType();
    if (type === "string"){
      return value.data();
    } else if (type === "thingId"){
      let thing = value.thing();
      return (<ThingProperty thing={thing} propertyName="p-name" isLink={true}/>);
    }
    return "Unsupported type input"
  }
}