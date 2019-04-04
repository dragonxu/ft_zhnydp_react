import * as Echarts from "echarts";
import { mixedSameType } from "../../../common/functions/obj";
import { ReactEchart } from "../ReactEchart";

export class ServiceTimesChart extends ReactEchart {
    protected styleOption: Echarts.EChartOption = {
        xAxis: {
            data: [
                "巡检",
                "检修",
                "预防性实验",
                "工单抢修",
                "缺陷",
                "其他",
            ],
        },
        yAxis: {},
    };
    protected getDefaultOptions(): Echarts.EChartOption {
        return mixedSameType(ReactEchart.defaultOptions, this.styleOption);
    }
}
