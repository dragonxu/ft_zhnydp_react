import React from "react";
import { StComponent } from "../../common/class/StComponent";
import "./DataItem.scss";

declare namespace DataItem {
    export interface IProps {
        name: string;
        num: number;
        unit?: string;
        className?: string;
        duration?: number;
    }
    export interface IState {
        nowNum: number;
    }
}

export class DataItem extends StComponent<DataItem.IProps, DataItem.IState> {
    public state: DataItem.IState = {
        nowNum: 0,
    };
    protected timer = 0;
    protected nowNum: number = 0;
    protected targetNum: number = 0;
    protected duration: number;
    protected startTime: number;
    protected startNum: number;
    public render(): JSX.Element {
        return (
            <div className={this.getClassName()}>
                <div className="item-name">{this.props.name}</div>
                <div className="item-data">
                    <div className="item-num" target-num={this.props.num}>{this.state.nowNum}</div>
                    {this.getUnitElm()}
                </div>
            </div>
        );
    }
    public componentWillReceiveProps(nextProps: DataItem.IProps) {
        if (this.props.num !== nextProps.num) {
            this.startUpdateNowNum(nextProps.num);
        }
    }
    public componentDidMount() {
        if (this.props.num !== this.state.nowNum) {
            this.startUpdateNowNum(this.props.num);
        }
    }
    public componentWillUnmount() {
        if (this.timer) {
            cancelAnimationFrame(this.timer);
        }

        this.setState = (state, callback) => {
            return;
        };
    }
    protected getUnitElm() {
        if (this.props.unit) {
            return (<div className="item-unit">{this.props.unit}</div>);
        }
        return null;
    }
    protected startUpdateNowNum(num: number) {
        this.targetNum = num;
        this.duration = isNaN(this.props.duration) ? 400 : this.props.duration;
        this.startTime = Date.now();
        this.startNum = this.state.nowNum;
        this.updateNowNum();
    }
    protected updateNowNum() {
        const nowNum = this.calcNowNum();
        const self = this;
        this.setState({
            nowNum,
        }, () => {
            if (nowNum !== this.targetNum) {
                self.timer = requestAnimationFrame(() => {
                    this.updateNowNum();
                });
            }
        });
    }
    protected calcNowNum() {
        const start = this.startNum;
        const target = this.targetNum;
        const time = Date.now();
        const take = time - this.startTime;
        if (take >= this.duration) {
            return target;
        }
        const step = (target - start) / this.duration;
        const now = start + take * step;
        return this.setNowNum(now);
    }
    protected setNowNum(num: number) {
        return Math.round(num);
    }
}
