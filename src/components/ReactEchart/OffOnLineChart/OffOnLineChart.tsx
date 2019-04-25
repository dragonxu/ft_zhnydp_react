import { ReactEchart } from "../ReactEchart";
import "./OffOnLineChart.scss";

export declare namespace OffOnLineChart {
    export interface IData {
        countOutline: number;
        countOnline: number;
    }
}

export class OffOnLineChart extends ReactEchart {
    protected chartType: ReactEchart.TChartType = "customGauge";
    protected refreshChart(data: OffOnLineChart.IData) {
        console.log(data);
        let sum = data.countOutline + data.countOnline;
        if (!sum) {
            sum = 1;
        }
        const options = {
            series: [
                {
                    type: "gauge",
                    detail: {
                        offsetCenter: [0, -20],
                        formatter: `{value|${data.countOutline}/${data.countOnline}}\n{name|在线/离线}`,
                        rich: {
                            name: {
                                color: "#6dc5e2",
                            },
                            value: {
                                fontSize: 24,
                                color: "#fff",
                            },
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            width: 16,
                            color: [
                                [data.countOutline / sum, "#00ffde"],
                                [1, "#ec6949"],
                            ],
                        },
                    },
                    data: [
                        {
                            name: "在线",
                            value: data.countOutline / sum * 100,
                        },
                        {
                            name: "base",
                            value: 100,
                        },
                    ],
                },
            ],
        };
        this.setOption(options);
    }
}