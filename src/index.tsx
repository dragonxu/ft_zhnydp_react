import Axios from "axios";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";

Axios.defaults.baseURL = "http://localhost:9000/";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
function resetTransform() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const designWidth = 1920;
    const designHeight = 1080;
    const scaleX = winWidth / designWidth;
    const scaleY = winHeight / designHeight;
    const elm = document.getElementById("root") as HTMLElement;
    elm.style.transform = `scale(${scaleX}, ${scaleY})`;
}

resetTransform();
window.addEventListener("resize", function() {
    resetTransform();
});
*/
