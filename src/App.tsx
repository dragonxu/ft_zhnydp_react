import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { Analysis } from "./components/Analysis/Analysis";
import { Dispatch } from "./components/Dispatch/Dispatch";
import { General } from "./components/General/General";
import { Header } from "./components/Header/Header";
import { Monitor } from "./components/Monitor/Monitor";

class App extends Component {
    public render(): JSX.Element {
        return (
            <HashRouter>
                <div className="App">
                    <Header></Header>
                    <div className="view-body">
                        <Switch>
                            <Route path="/" exact component={General}></Route>
                            <Route path="/general" component={General}></Route>
                            <Route path="/monitor" component={Monitor}></Route>
                            <Route path="/analysis" component={Analysis}></Route>
                            <Route path="/dispatch" component={Dispatch}></Route>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
