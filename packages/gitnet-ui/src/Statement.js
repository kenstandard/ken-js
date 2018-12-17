import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import {Value} from "./Value";

export class Statement extends Component {
  render() {
    let {statement} = this.props;
    if (!statement){
      return "Error: No statement"
    }
    if (!!statement.id){
        return (
            <div>
                <Value value={statement.formatValue()}/>
                <div className="statement-substatements">
                    {JSON.stringify(statement.internalThing().toJSON())}
                </div>
            </div>
        )
    } else {
        return <Value value={statement.formatValue()}/>
    }
  }
}