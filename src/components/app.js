import React, { Component } from "react";
import { Card, Button, Icon } from "semantic-ui-react";

import AudioRecorder from "./Recorder/AudioRecorder";

import "./styles/app.css";

class App extends Component {
  state = {
    items: [1, 2, 3, 4, 5],
  };

  addSnippet = () => {
    const { items } = this.state;
    let arr = items;
    arr.push(arr[arr.length - 1] + 1);
    this.setState({ items: arr });
  };

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        {items.map((item) => (
          <Card key={item}>
            <Card.Content>
              <Card.Header>Snippet {item}</Card.Header>
              <Card.Description>
                <AudioRecorder removeLabel="re record" />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button negative>Delete</Button>
            </Card.Content>
          </Card>
        ))}
        <Card>
          <Card.Content className="center">
            <Card.Description onClick={this.addSnippet} >
              <Icon name="add circle" size="large" />
              <div>Add snippet </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default App;
