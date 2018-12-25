
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

export class ThingName extends Component {
  render() {
    if (!this.props.thing){
      return "Error: No value"
    }
    const {thing, propertyName} = this.props;
    let name = thing.propertyValues(propertyName)[0].data
    return name
  }
}