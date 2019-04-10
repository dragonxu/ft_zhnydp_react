import React, { Component } from "react";
import { DataItem } from "../DataItem/DataItem";
import "./GeneralList.scss";
import { StFetch } from "../../common/functions/StFetch";
declare namespace GeneralList {
    export interface IState {
        nowElectricity: number;
    }
}
export class GeneralList extends Component<any, GeneralList.IState> {
    public state: GeneralList.IState = {
        nowElectricity: 0,
    };
    public render() {
        return (
            <div className="general-list">
                <DataItem name="当前电量" num={this.state.nowElectricity} unit="kwh"></DataItem>
                <DataItem name="当前负荷" num={873} unit="kw"></DataItem>
                <DataItem name="终端在线率" num={88} unit="%"></DataItem>
                <DataItem name="采集成功率" num={75} unit="%"></DataItem>
            </div>
        );
    }
    public componentDidMount() {
        this.loadData();
    }
    protected loadData() {
        // StFetch("/")
    }
}
