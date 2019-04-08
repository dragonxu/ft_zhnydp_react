import * as Echarts from "echarts";
import { mixedSameType } from "../../../common/functions/obj";
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
    public componentDidMount() {
        this.initEChart();
        this.loadData().then((res) => {
            this.setOptionByData(res)
        });
    }
    protected getOptions(): Echarts.EChartOption {
        return mixedSameType(ReactEchart.defaultOptions, this.styleOption);
    }
    protected setOptionByData(data: ServiceTimesChart.IChartData) {
        const options = this.getOptions();
        options.series = [
            {
                barWidth: 27,
                data: [
                    data.countInspection,
                    data.countTest,
                    data.countRepair,
                    data.countQX,
                    data.countBug,
                ],
                itemStyle: {
                    color: "#43fdff",
                },
                type: "bar",
            }
        ];
        this.setOption(options);
    }
}
