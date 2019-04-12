import React from "react";
import { StComponent } from "../../common/class/StComponent";
import { store } from "../../redux/GeneralListStore";
import { DataItem } from "../DataItem/DataItem";
import "./DataCount.scss";

declare namespace DataCount {
    export interface IState {
        clientNum: number;
        inspectNum: number;
        checkPointNum: number;
        energyReport: number;
    }
}

export class DataCount extends StComponent<any, DataCount.IState> {
    public state: DataCount.IState = {
        clientNum: 0,
        inspectNum: 0,
        checkPointNum: 0,
        energyReport: 0,
    };
    public render() {
        return (
            <div className={this.getClassName()}>
                <DataItem className="top-data" name="用户总数" num={this.state.clientNum}></DataItem>
                <DataItem className="top-data" name="推送用能" num={this.state.energyReport}></DataItem>
                <DataItem className="top-data" name="监测点" num={this.state.inspectNum}></DataItem>
                <DataItem className="top-data" name="检测点" num={this.state.checkPointNum}></DataItem>
            </div>
        );
    }
    public componentDidMount() {
        store.subscribe(() => {
            const state = store.getState().data;
            this.setState({
                clientNum: state.clientNum,
                inspectNum: state.inspectNum,
                checkPointNum: state.checkPointNum,
                energyReport: state.energyReport,
            });
        });
    }
}
