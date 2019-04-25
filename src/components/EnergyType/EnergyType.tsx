import React, { Component, createRef } from "react";
import { Progress } from "../Progress/Progress";
import Axios from "axios";

// scss
import "./EnergyType.scss";
import { ReactEchart } from "../ReactEchart/ReactEchart";

declare namespace EnergyType {
    export interface IData {
        electric: number;
        hot: number;
        water: number;
        gas: number;
    }
    export interface IState {
        electricity: number;
        hot: number;
        water: number;
        gas: number;
    }
}

export class EnergyType extends Component<any, EnergyType.IState> {
    public state = {
        electricity: 0,
        gas: 0,
        hot: 0,
        water: 0,
    };
    public timer = 0;
    public el = createRef<HTMLDivElement>();
    public render() {
        return (
            <div className="energy-type" ref={this.el} data-electricity={this.state.electricity}>
                <Progress
                    className="electricity"
                    progressName="电"
                    percent={this.getPercent(this.state.electricity)}
                    progressNum={this.state.electricity}
                    moveNumWithLip={true}
                ></Progress>
                <Progress
                    className="hot"
                    progressName="热"
                    percent={this.getPercent(this.state.hot)}
                    progressNum={this.state.hot}
                    moveNumWithLip={true}
                ></Progress>
                <Progress
                    className="water"
                    progressName="水"
                    percent={this.getPercent(this.state.water)}
                    progressNum={this.state.water}
                    moveNumWithLip={true}
                ></Progress>
                <Progress
                    className="gas"
                    progressName="气"
                    percent={this.getPercent(this.state.gas)}
                    progressNum={this.state.gas}
                    moveNumWithLip={true}
                ></Progress>
            </div>
        );
    }
    public getPercent(num: number): number {
        const totalNum = this.getTotalNum();
        if (totalNum) {
            return num / totalNum;
        }
        return 0;
    }
    public getTotalNum(): number {
        return this.state.electricity + this.state.hot + this.state.gas + this.state.water;
    }
    public componentDidMount() {
        this.loadData();
    }
    public componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    protected  loadData(): void {
        Axios.get("/queryPowerTypeCount.json").then((res) => {
            const { data } = res;
            this.setState({
                electricity: data.electric,
                gas: data.gas,
                hot: data.hot,
                water: data.water,
            });
        }).finally(() => {
            this.timer = window.setTimeout(() => {
                this.loadData();
            }, ReactEchart.LoadDelay);
        });
    }
}
