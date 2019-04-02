import React, { Component } from "react";
import "./App.scss";
import { Header} from "./components/Header/Header";

class App extends Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <Header></Header>
      </div>
    );
  }
}

export default App;
