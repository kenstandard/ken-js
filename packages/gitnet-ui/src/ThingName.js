
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

export class ThingName extends Component {
  render() {
    if (!this.props.thing){
      return "Error: No value"
    }
    const {thing, propertyName} = this.props;
    let facts = thing.propertyIdFacts(propertyName)
    return facts.map(e => e.value().data())[0];
  }
}