import "./TwoPiesChart.scss";
import { ReactEchart } from "../ReactEchart";
import { EChartOption } from "echarts";

export declare namespace TwoPiesChart {
    export interface IState {
        terminal: number;
        collect: number;
    }
    export interface IData {
        terminal: number;
        collect: number;
    }
}

export class TwoPiesChart extends ReactEchart {
    public willUnmount = false;
    public componentWillMount() {
        this.willUnmount = false;
    }
    public componentDidMount() {
        this.initEChart();
        // this.refreshChart();
    }
    public componentWillUnmount() {
        this.willUnmount = true;
    }
    protected refreshChart(data: TwoPiesChart.IData) {
        const options: EChartOption = {
            series: [
                {
                    type: "pie",
                    name: "采集成功率",
                    radius: ["50%", "70%"],
                    center: ["70%", "50%"],
                    hoverAnimation: false,
                    label: {
                        show: false,
                    },
                    data: [
                        {
                            value: data.collect,
                            name: "采集成功率",
                            itemStyle: {
                                color: "#19db92",
                            },
                        },
                        {
                            value: 100 - data.collect,
                            name: "剩余部分",
                        },
                    ],
                },
                {
                    type: "pie",
                    name: "终端在线率",
                    radius: ["50%", "70%"],
                    center: ["30%", "50%"],
                    hoverAnimation: false,
                    label: {
                        show: false,
                    },
                    data: [
                        {
                            value: data.terminal,
                            name: "终端在线率",
                            itemStyle: {
                                color: "#27f1ff",
                            },
                        },
                        {
                            value: 100 - data.terminal,
                            name: "剩余部分",
                        },
                    ],
                },
            ],
        };
        this.setOption(options);
    }
}
