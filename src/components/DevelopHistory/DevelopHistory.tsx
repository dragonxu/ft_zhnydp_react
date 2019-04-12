
import React from "react";
import { StComponent } from "../../common/class/StComponent";
import "./DevelopHistory.scss";

declare namespace DevelopHistory {
    export interface ITimeItem {
        clientNum: number;
        inspectNum: number;
        time: string;
    }
    export interface IState {
        items: ITimeItem[];
    }
}

const tmpItems: DevelopHistory.ITimeItem[] = [
    {
        clientNum: 12,
        inspectNum: 63,
        time: "2018年10月",
    },
    {
        clientNum: 14,
        inspectNum: 70,
        time: "2018年11月",
    },
    {
        clientNum: 15,
        inspectNum: 76,
        time: "2018年12月",
    },
    {
        clientNum: 18,
        inspectNum: 92,
        time: "2019年1月",
    },
    {
        clientNum: 24,
        inspectNum: 108,
        time: "2019年3月",
    },
    {
        clientNum: 21,
        inspectNum: 96,
        time: "2019年2月",
    },
];

export class DevelopHistory extends StComponent<any, DevelopHistory.IState> {
    public state: DevelopHistory.IState = {
        items: tmpItems,
    };
    public render() {
        return (
            <div className={this.getClassName() + " full-view"}>
                <div className="trace-line"></div>
                {this.getTracePoints()}
            </div>
        );
    }
    protected getSortItems() {
        const items = this.state.items.map((item) => {
            return item;
        });
        return items.sort((itemA, itemB) => {
            return this.sortItemByTime(itemA.time, itemB.time);
        });
    }
    protected itemTimeToObj(timeString: string) {
        const reg = /(\d+)年(\d+)月/;
        const matcher = timeString.match(reg);
        if (matcher) {
            return {
                year: parseInt(matcher[1], 10),
                month: parseInt(matcher[2], 10),
            };
        }
        return {
            year: 0,
            month: 0,
        };
    }
    protected sortItemByTime(itemA: string, itemB: string): number {
        const timeA = this.itemTimeToObj(itemA);
        const timeB = this.itemTimeToObj(itemB);
        const yearDiff = timeA.year - timeB.year;
        if (yearDiff === 0) {
            return timeA.month - timeB.month;
        }
        return 0;
    }
    protected getTracePoints() {
        const showLen = 6;
        const points = this.getSortItems();
        const len = points.length;
        let showPoints = points;
        if (len >= showLen) {
            showPoints = points.slice(len - showLen);
        }
        return showPoints.map((point, index) => {
            return this.makePointElm(point, index);
        });
    }
    protected makePointElm(point: DevelopHistory.ITimeItem, index: number) {
        return (
            <div className="time-point" key={index} data-index={index}>
                <div className="time-string">{point.time}</div>
                <div className="info">
                    <dl className="list-inline">
                        <dt>客户:</dt>
                        <dd>{point.clientNum}</dd>
                    </dl>
                    <dl className="list-inline">
                        <dt>监测点:</dt>
                        <dd>{point.inspectNum}</dd>
                    </dl>
                </div>
            </div>
        );
    }
}
