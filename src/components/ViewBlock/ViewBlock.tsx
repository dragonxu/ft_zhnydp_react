import React, { Component } from "react";

export class ViewBlock extends Component{
    public render(): JSX.Element {
        return (<div className="view-block">
            <div className="view-block-corner corner-left-top"></div>
            <div className="view-block-corner corner-left-bottom"></div>
            <div className="view-block-corner corner-right-bottom"></div>
            <div className="view-block-corner corner-right-top"></div>
        </div>);
    }
}
