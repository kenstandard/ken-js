import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Value extends Component {
  render() {
    if (!this.props.value){
      return "Error: No value"
    }
    const {value: {text, thing, error}} = this.props;
    if (text){
      return text
    } else if (thing){
      const name = thing.textValue("p-name");
      const id = thing.id;
      return <Link to={("/things/" + id)}> {name} </Link>
    } else if (error){
      return JSON.stringify(error)
    } else {
      return ""
    }
  }
}