import React, { Component, createRef } from "react";
import "./Progress.scss";

declare namespace Progress {
    export interface IProps {
        progressName?: string;
        progressNum?: number;
        percent: number;
        className?: string;
        moveNumWithLip?: boolean;
        cacheWidth?: number;
        cacheRight?: number;
    }
}

export class Progress extends Component<Progress.IProps> {
    protected numElm = createRef<HTMLDivElement>();
    protected boxElmRef = createRef<HTMLDivElement>();
    public render() {
        const self = this;
        return (
            <div className={this.className()} data-percent={this.props.percent}>
                {this.getNameElm()}
                <div className="progress-box" ref={this.boxElmRef}>
                    <div className="progress-lip" style={{width: self.getLipWidth()}}></div>
                    {this.getNumElm()}
                </div>
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
        const self = this;
        return <div className="progress-num" ref={this.numElm} style={{ left: self.getNumLeft() }}>{this.props.progressNum}</div>;
    }
    protected getNumLeft(): string {
        const numElm = this.numElm.current;
        if (!numElm) {
            return "0px";
        }
        const numWidth = numElm.offsetWidth;
        const boxElm = this.boxElmRef.current;
        const boxWidth = boxElm.offsetWidth;
        const cacheRight = this.props.cacheRight || 20;
        const maxLeft = boxWidth - numWidth - cacheRight;
        console.log(numWidth);
        if (this.props.moveNumWithLip) {
            const cacheWidth = this.props.cacheWidth || 5;
            const left = this.props.percent * boxWidth + cacheWidth;
            if (left >= maxLeft) {
                return maxLeft.toString() + "px";
            }
            return left.toString() + "px";
        }
        return maxLeft.toString() + "px";
    }
}
