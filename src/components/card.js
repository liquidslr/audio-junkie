/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";

import Conversation from "./conversation";

import "./styles/app.css";

class CustomCard extends Component {
  render() {
    const { item } = this.props;
    return (
      <div key={item} className="snippet">
        <div className="heading">Snippet {item} </div>
        <Conversation item={item} text="bot" />
        <Conversation item={item} text="customer" />
        <div className="content" extra>
          <button className="download btn">Download</button>
          <button className="delete btn" negative onClick={() => this.delete(item)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default CustomCard;
