/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import { connect } from "react-redux";

import Conversation from "./conversation";
import downloadBlob from "./recorder/downloadBlob";

import "./styles/app.css";

class CustomCard extends Component {
  concatenateBlobs = (blobs, type, callback) => {
    var buffers = [];
    var index = 0;

    //  readAsArrayBuffer
    function readAsArrayBuffer() {
      if (!blobs[index]) {
        return concatenateBuffers();
      }
      var reader = new FileReader();
      reader.onload = function (event) {
        buffers.push(event.target.result);
        index++;
        readAsArrayBuffer();
      };
      reader.readAsArrayBuffer(blobs[index]);
    }

    readAsArrayBuffer();
    function concatenateBuffers() {
       
      var byteLength = 0;

      buffers.forEach(function (buffer) {
        console.log(buffer.byteLength,"bytelength")
        byteLength += buffer.byteLength;
      });

      console.log(byteLength,"length")

      var tmp = new Uint16Array(byteLength);
      var lastOffset = 0;
      buffers.forEach(function (buffer) {
        // BYTES_PER_ELEMENT == 2 for Uint16Array
        var reusableByteLength = buffer.byteLength;
        if (reusableByteLength % 2 != 0) {
          buffer = buffer.slice(0, reusableByteLength - 1);
        }
        tmp.set(new Uint16Array(buffer), lastOffset);
        lastOffset += reusableByteLength;
      });

      var blob = new Blob([tmp.buffer], {
        type: type,
      });

      callback(blob);
    }
  };

  download = (item) => {
    const { recording } = this.props;
    let id = item.toString();
    let obj = recording.recordings[id];
    let blob1 = obj["bot"];
    let blob2 = obj["customer"];

    this.concatenateBlobs([blob2 , blob1], "audio/wav", (blob) => {
      downloadBlob(blob, "combined-audio");
    });
  };

  render() {
    const { item } = this.props;
    return (
      <div key={item} className="snippet">
        <div className="heading">Snippet {item} </div>
        <Conversation item={item} text="bot" type="bot" />
        <Conversation item={item} text="customer" type="customer" />
        <div className="content" extra>
          <button onClick={() => this.download(item)} className="download btn">
            Download
          </button>
          <button
            className="delete btn"
            negative
            onClick={() => this.delete(item)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    recording: state.recordings,
  };
}, null)(CustomCard);
