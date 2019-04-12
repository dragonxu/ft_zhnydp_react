import React, { Component } from "react";
// import { StFetch } from "../../common/functions/StFetch";
import { store } from "../../redux/GeneralListStore";
import { DataItem } from "../DataItem/DataItem";
import "./GeneralList.scss";
declare namespace GeneralList {
    export interface IState {
        nowElectricity: number;
        load: number;
        terminal: number;
        collect: number;
    }
    export interface IResData{
        electricity: number;
        "load": number;
        "terminal": number;
        "collect": number;
        "clientNum": number;
        "inspectNum": number;
        "checkPointNum": number;
        "energyReport": number;
    }
}
export class GeneralList extends Component<any, GeneralList.IState> {
    public state: GeneralList.IState = {
        collect: 0,
        load: 0,
        nowElectricity: 0,
        terminal: 0,
    };
    public render() {
        return (
            <div className="general-list">
                <DataItem name="当前电量" num={this.state.nowElectricity} unit="kwh"></DataItem>
                <DataItem name="当前负荷" num={this.state.load} unit="kw"></DataItem>
                <DataItem name="终端在线率" num={this.state.terminal} unit="%"></DataItem>
                <DataItem name="采集成功率" num={this.state.collect} unit="%"></DataItem>
            </div>
        );
    }
    public componentDidMount() {
        this.loadData();
    }
    protected loadData() {
        store.subscribe(() => {
            const { data } = store.getState();
            this.setState({
                collect: data.collect,
                load: data.load,
                nowElectricity: data.electricity,
                terminal: data.terminal,
            });
        });
    }
}
