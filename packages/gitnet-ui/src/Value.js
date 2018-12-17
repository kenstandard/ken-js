import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

export class Value extends Component {
  render() {
    if (!this.props.value){
      return "Error: No value"
    }
    const {value: {text, thing, error, dataType}} = this.props;
    if (text){
      if (dataType === "d-image-url") {
        return <img src={text} alt={"image"} style={{maxWidth: "70px", maxHeight: "70px"}}/>
      }
      return <Markdown>{text}</Markdown>
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