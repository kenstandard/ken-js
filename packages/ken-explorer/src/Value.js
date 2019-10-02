import React, { Component } from 'react';
import { ThingProperty } from "./ThingProperty"
import { CONSTANTS } from "./setup.js"

export class Value extends Component {
  render() {
    if (!this.props.fact) {
      return ""
    }
    let value = this.props.fact.value();
    let type = value.dataType();
    if (type === "string") {
      return value.data();
    } else if (type === "thingId") {
      let thing = value.thing();
      return (<ThingProperty thing={ thing } propertyName={ CONSTANTS.NAME }
                             isLink={ true }/>);
    }
    return "Unsupported type input"
  }
}
