import React,{Component} from 'react';
import AudioRecorder from './Recorder/AudioRecorder';

import './styles/app.css';

class App extends Component {
  state = {
    items: [1,2,3,4,5]
  }
  render() {
    const {items} = this.state
    return (
      <div className="App">
      {
        items.map(item =>(
          <div className="card">
            <AudioRecorder removeLabel="re record"	 />
          </div>
        ))
      }
      </div>
    )
  }
}

export default App