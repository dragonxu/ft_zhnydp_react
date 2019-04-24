import * as Echarts from "echarts";
import { ReactEchart } from "../ReactEchart";
declare namespace ServiceTimesChart {
    export interface IChartData {
        countBug: number; // 缺陷
        countInspection: number; // 巡检
        countQX: number; // 工单抢修
        countRepair: number; // 检修
        countTest: number; // 预防性实验
    }
}
export class ServiceTimesChart extends ReactEchart {
    public chartType: ReactEchart.TChartType = "bar";
    public timer = 0;
    protected styleOption: Echarts.EChartOption = {
        xAxis: {
            data: [
                "巡检",
                "检修",
                "预防性实验",
                "工单抢修",
                "缺陷",
            ],
        },
        yAxis: {},
    };
    protected refreshChart(data: ServiceTimesChart.IChartData) {
        console.log(data);
        const options = {
            grid: {
                top: 10,
                bottom: 20,
            },
            xAxis: {
                data: [
                    "巡检",
                    "预防性测试",
                    "检修",
                    "工单抢修",
                    "缺陷",
                ],
            },
            series: [
                {
                    barWidth: 27,
                    data: [
                        {
                            name: "巡检",
                            value: data.countInspection,
                        },
                        {
                            name: "预防性测试",
                            value: data.countTest,
                        },
                        {
                            name: "检修",
                            value: data.countRepair,
                        },
                        {
                            name: "工单抢修",
                            value: data.countQX,
                        },
                        {
                            name: "缺陷",
                            value: data.countBug,
                        },
                    ],
                    itemStyle: {
                        color: "#43fdff",
                    },
                    type: "bar",
                    label: {
                        show: true,
                        position: "top",
                        color: "white",
                    },
                },
            ],
        };
        this.setOption(options);
    }
}
