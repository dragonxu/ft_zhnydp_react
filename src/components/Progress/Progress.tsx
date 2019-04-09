import React, { Component } from "react";
import "./Progress.scss";

declare namespace Progress {
    export interface IProps {
        progressName?: string;
        progressNum?: number;
        percent: number;
        className?: string;
    }
}

export class Progress extends Component<Progress.IProps> {
    public render() {
        const self = this;
        return (
            <div className={this.className()} data-percent={this.props.percent}>
                {this.getNameElm()}
                <div className="progress-box">
                    <div className="progress-lip" style={{width: self.getLipWidth()}}></div>
                </div>
                {this.getNumElm()}
            </div>
        );
    }
    protected className(): string {
        let clsName = "progress ";
        if (this.props.progressName) {
            clsName += "has-name ";
        }
        if (this.props.progressNum !== undefined && !isNaN(this.props.progressNum)) {
            clsName += "has-num ";
        }
        if (!!this.props.className) {
            clsName += this.props.className;
        }
        return clsName;
    }
    protected getLipWidth() {
        return (this.props.percent * 100).toString() + "%";
    }
    protected getNameElm() {
        if (this.props.progressName) {
            return (<div className="progress-name">{this.props.progressName}</div>);
        }
        return null;
    }
    protected getNumElm() {
        if (this.props.progressNum === undefined || isNaN(this.props.progressNum)) {
            return null;
        }
        return <div className="progress-num">{this.props.progressNum}</div>;
    }
}
