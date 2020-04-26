import React, { Component } from "react";

import AudioRecorder from "./recorder/AudioRecorder";
import "./styles/app.css";

export default class Conversation extends Component {
  state = {
    disabled: false,
  };

  change = (e) => {
    const { disabled } = this.state;
    if (disabled) {
      this.setState({ input: "" });
      this.setState({ disabled: false });
    }
    this.setState({ input: e.target.value });
  };

  click = () => {
    const { disabled } = this.state;
    if (disabled) {
      this.setState({ input: "" });
      this.setState({ disabled: false });
    }
  };

  startRecording = () => {
    this.setState({ disabled: true });
  };

  render() {
    const { input, disabled } = this.state;
    const { text, item } = this.props;
    return (
      <div className="conv">
        <div className="margin1 title">{text}</div>
        <div onClick={this.click}>
          <textarea
            value={input}
            disabled={disabled}
            onChange={this.change}
            style={{ padding: "1rem" }}
            className="margin1"
            placeholder="Enter input"
          />
        </div>
        {input && (
          <AudioRecorder
            onChange={this.startRecording}
            id={item}
            removeLabel="re-record"
          />
        )}
      </div>
    );
  }
}
