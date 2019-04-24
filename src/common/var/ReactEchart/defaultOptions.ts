import * as Echarts from "echarts";

const options: Echarts.EChartOption = {
    tooltip: { },
    xAxis: {
        axisLabel: {
            color: "#6dc5e2",
            interval: 0,
        },
        axisLine: {
            lineStyle: {
                color: "#1f7dbd",
            },
            show: true,
        },
        axisTick: {
            alignWithLabel: true,
        },
        splitLine: {
            show: false,
        },
    },
    yAxis: {
        axisLabel: {
            color: "#6dc5e2",
            interval: 0,
        },
        axisLine: {
            lineStyle: {
                color: "#1f7dbd",
            },
            show: true,
        },
        axisTick: {
            alignWithLabel: true,
        },
        splitLine: {
            lineStyle: {
                color: "#104e8f",
            },
        },
    },
};

export default options;
