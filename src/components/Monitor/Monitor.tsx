import React, { Component } from "react";
import { ViewBlock } from "../ViewBlock/ViewBlock";
import { DataItem } from "../DataItem/DataItem";
import { TwoPiesChart } from "../ReactEchart/TwoPiesChart/TwoPiesChart";

// scss files
import "./Monitor.scss";
import { OffOnLineChart } from "../ReactEchart/OffOnLineChart/OffOnLineChart";

export class Monitor extends Component {
    public render() {
        return (
            <div className="monitor-view">
                <div className="col-1 col">
                    <ViewBlock className="row-1 row">
                        <DataItem className="top-data" name="实时负荷" unit="kw" num={1026}></DataItem>
                        <DataItem className="top-data" name="实时电量" unit="kwh" num={3156}></DataItem>
                    </ViewBlock>
                    <ViewBlock className="row-2 row">
                        <TwoPiesChart dataUrl="/getDataList.json"></TwoPiesChart>
                    </ViewBlock>
                    <ViewBlock className="row-3 row" blockTitle="客户统计">
                        <OffOnLineChart dataUrl="/queryOnlineInfo.json"></OffOnLineChart>
                    </ViewBlock>
                </div>
            </div>
        );
    }
}
