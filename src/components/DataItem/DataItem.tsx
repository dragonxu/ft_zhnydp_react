import { Component } from "react";
import "./DataItem.scss";

declare namespace DataItem {
    export interface IProps{
        name: string;
        num: number;
        unit: string;
    }
}

export class DataItem extends Component<DataItem.IProps> {
    public render() {
        return (
            <div className="data-item">
                <div className="item-name">{this.props.name}</div>
                <div className="item-data">
                    <div className="item-num">{this.props.num}</div>
                    <div className="item-unit">{this.props.unit}</div>
                </div>
            </div>
        );
    }
}
