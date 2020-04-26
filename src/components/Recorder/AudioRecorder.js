import React, { Component } from "react";
import { connect } from "react-redux";
import { setRecording, removeRecording } from "../actions";

import WAVEInterface from "./waveInterface";
import downloadBlob from "./downloadBlob";

import "../styles/app.css";


class AudioRecorder extends Component {
  waveInterface = new WAVEInterface();

  state = {
    isRecording: false,
    isPlaying: false,
    audioData: this.props.initialAudio,
  };

  componentWillReceiveProps(nextProps) {
    // handle new initialAudio being passed in
    if (
      nextProps.initialAudio &&
      nextProps.initialAudio !== this.props.initialAudio &&
      this.state.audioData &&
      nextProps.initialAudio !== this.state.audioData
    ) {
      this.waveInterface.reset();
      this.setState({
        audioData: nextProps.initialAudio,
        isPlaying: false,
        isRecording: false,
      });
    }
  }

  componentWillMount() {
    this.waveInterface.reset();
  }
  componentWillUnmount() {
    this.waveInterface.reset();
  }

  startRecording() {
    if (!this.state.isRecording) {
      this.waveInterface
        .startRecording()
        .then(() => {
          this.setState({ isRecording: true });
          if (this.props.onRecordStart) this.props.onRecordStart();
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  stopRecording() {
    const { id, recorder } = this.props;
    this.waveInterface.stopRecording();

    this.setState({
      isRecording: false,
      audioData: this.waveInterface.audioData,
    });

    this.props.setRecording([id, recorder, this.waveInterface.audioData]);

    if (this.props.onChange) {
      this.props.onChange({
        duration: this.waveInterface.audioDuration,
        audioData: this.waveInterface.audioData,
      });

      this.props.setRecording([id, recorder, this.waveInterface.audioData]);
    }
  }

  startPlayback() {
    if (!this.state.isPlaying) {
      this.waveInterface
        .startPlayback(this.props.loop, this.onAudioEnded)
        .then(() => {
          this.setState({ isPlaying: true });
          if (this.props.onPlay) this.props.onPlay();
        });
    }
  }

  stopPlayback() {
    this.waveInterface.stopPlayback();
    this.setState({ isPlaying: false });
    if (this.props.onAbort) this.props.onAbort();
  }

  onAudioEnded = () => {
    this.setState({ isPlaying: false });
    if (this.props.onEnded) this.props.onEnded();
  };

  onRemoveClick = () => {
    const { id, recorder } = this.props;

    this.waveInterface.reset();
    if (this.state.audioData && this.props.onChange)
      this.props.onChange({ duration: 0, audioData: null });
    this.setState({
      isPlaying: false,
      isRecording: false,
      audioData: null,
    });
    this.props.removeRecording([id, recorder]);
  };

  onDownloadClick = () => {
    downloadBlob(this.state.audioData, this.props.filename);
  };

  onButtonClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (this.state.audioData) {
      if (this.state.isPlaying) {
        this.stopPlayback();
        event.preventDefault();
      } else {
        this.startPlayback();
      }
    } else {
      if (this.state.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    }
  };

  render() {
    return (
      <div className="AudioRecorder">
        <button
          className={[
            "AudioRecorder-button control-btn",
            this.state.audioData ? "hasAudio" : "",
            this.state.isPlaying ? "isPlaying" : "",
            this.state.isRecording ? "isRecording" : "",
          ].join(" ")}
          onClick={this.onButtonClick}
        >
          {this.state.audioData &&
            !this.state.isPlaying &&
            this.props.playLabel}
          {this.state.audioData &&
            this.state.isPlaying &&
            this.props.playingLabel}
          {!this.state.audioData &&
            !this.state.isRecording &&
            this.props.recordLabel}
          {!this.state.audioData &&
            this.state.isRecording &&
            this.props.recordingLabel}
        </button>
        {this.state.audioData && (
          <button className="AudioRecorder-remove control-btn" onClick={this.onRemoveClick}>
            {this.props.removeLabel}
          </button>
        )}
        {this.state.audioData && this.props.downloadable && (
          <button
            className="AudioRecorder-download control-btn"
            onClick={this.onDownloadClick}
          >
            {this.props.downloadLabel}
          </button>
        )}
      </div>
    );
  }
}

// export default AudioRecorder;
// const mapDispatchToProps = dispatch => {
//   return {
//     setRecording: details => dispatch(setRecording(details)),
// };
export default connect(null, (dispatch) => {
  return {
    setRecording: (details) => dispatch(setRecording(details)),
    removeRecording: (details) => dispatch(removeRecording(details)),
  };
})(AudioRecorder);

AudioRecorder.defaultProps = {
  loop: false,
  downloadable: true,
  className: "",
  style: {},
  filename: "output.wav",
  playLabel: "🔊 Play",
  playingLabel: "❚❚ Playing",
  recordLabel: "● Record",
  recordingLabel: "● Recording",
  removeLabel: "↺ Re-record",
  downloadLabel: "\ud83d\udcbe Save", // unicode floppy disk
};
