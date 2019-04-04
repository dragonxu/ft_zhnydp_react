import React, { Component } from "react";
import "./ViewBlock.scss";

declare namespace ViewBlock {
    export interface IProps {
        blockTitle?: string;
        className?: string;
    }
}

export class ViewBlock extends Component<ViewBlock.IProps> {
    public render(): JSX.Element {
        return (<div className={this.className()}>
            <div className="view-block-corner corner-left-top"></div>
            <div className="view-block-corner corner-left-bottom"></div>
            <div className="view-block-corner corner-right-bottom"></div>
            <div className="view-block-corner corner-right-top"></div>
            <div className={this.viewBodyClassName()}>
                {this.blockTitleJSXElm()}
                <div className="view-block-content">{this.props.children}</div>
            </div>
        </div>);
    }
    protected hasTitle(): boolean {
        return !!this.props.blockTitle;
    }
    protected className(): string {
        let clsName = "view-block ";
        if (this.props.className) {
            clsName += this.props.className;
        }
        return clsName;
    }
    protected viewBodyClassName(): string {
        let clsName = "view-block-body";
        if (this.hasTitle()) {
            clsName += " has-block-title";
        }
        return clsName;
    }
    protected blockTitleJSXElm(): JSX.Element | null {
        if (this.hasTitle()) {
            return (
                <h3 className="view-block-title">
                    <div className="gradient-title">{this.props.blockTitle}</div>
                </h3>
            );
        }
        return null;
    }
}
