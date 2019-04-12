import { Component } from "react";
import { camelCaseToLine } from "../functions/string";

declare namespace StComponent {
    export interface IProps{
        className?: string;
    }
}

export class StComponent<P extends StComponent.IProps = {}, S = {}, SS = any> extends Component<P, S, SS> {
    protected getClassName(): string {
        let clsName = camelCaseToLine(this.constructor.name);
        if (this.props.className) {
            clsName += " " +  this.props.className;
        }
        return clsName;
    }
}
