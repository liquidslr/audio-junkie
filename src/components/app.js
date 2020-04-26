import React, { Component } from "react";

import CustomCard from "./card";
import "./styles/app.css";

class App extends Component {
  state = {
    items: [1],
  };

  addSnippet = () => {
    const { items } = this.state;
    let arr = items;
    arr.push(arr[arr.length - 1] + 1 || 1);
    this.setState({ items: arr });
  };

  delete = (id) => {
    const { items } = this.state;
    let arr = items;
    const index = arr.indexOf(id);
    if (index > -1) {
      arr.splice(index, 1);
    }
    this.setState({ items: arr });
  };

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        {items.map((item) => (
          <CustomCard item={item} />
        ))}
        <div className="snippet">
          <div className="center" onClick={this.addSnippet}>
            <div>
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
              {"  "}
              Add snippet
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
