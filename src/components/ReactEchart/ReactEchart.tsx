import * as Echarts from "echarts";
import React, { Component, createRef } from "react";
import defaultOptions from "../../common/var/ReactEchart/defaultOptions";
import Axios from "axios";
import { mixedSameType, copy, getClassByObj } from "../../common/functions/obj";
import { camelCaseToLine } from "../../common/functions/string";

export declare namespace ReactEchart {
    export interface IProps {
        dataUrl?: string;
    }
    export type TChartType = "line" | "pie" | "bar" | "standard" | "customGauge";
    export type ResetFunc = (opt: Echarts.EChartOption) => Echarts.EChartOption;
}
export class ReactEchart extends Component<ReactEchart.IProps> {
    public static readonly LoadDelay = 1000;
    protected static readonly defaultOptions: Echarts.EChartOption = defaultOptions;
    protected elmRef: React.RefObject<HTMLDivElement> = createRef();
    protected eChart!: Echarts.ECharts;
    protected dataUrl: string;
    protected loadTimer = 0;
    protected chartType: ReactEchart.TChartType = "standard";
    public getChartTypeOptions(): Echarts.EChartOption {
        switch (this.chartType) {
            case "pie":
                return this.toPieChartTypeOptions();
            case "customGauge":
                return this.toCustomGaugeChartTypeOptions();
        }
        return copy(ReactEchart.defaultOptions);
    }
    public render(): JSX.Element {
        return (
            <div className={this.getClassName()} ref={this.elmRef}></div>
        );
    }
    public getClassName() {
        let str = "react-echart full-view";
        const className = getClassByObj(this).name;
        if (className !== "ReactEchart") {
            str += " " + camelCaseToLine(className);
        }
        return str;
    }
    public componentDidMount() {
        this.initEChart();
        if (!this.dataUrl && this.props.dataUrl) {
            this.dataUrl = this.props.dataUrl;
        }
        this.loadData();
    }
    public componentWillUnmount() {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
        }
    }
    public initEChart(): this {
        this.eChart = Echarts.init(this.elmRef.current as HTMLDivElement);
        return this;
    }
    public setOption(newOption: Echarts.EChartOption, resetFunc?: ReactEchart.ResetFunc) {
        let options = mixedSameType(this.getChartTypeOptions(), newOption);
        options = this.rewriteSeries(options);
        if (typeof resetFunc === "function") {
            options = resetFunc(options);
        }
        this.eChart.setOption(options);
    }
    protected loadData() {
        const dataUrl = this.dataUrl;
        if (!dataUrl) {
            return;
        }
        Axios.get(this.props.dataUrl).then((res) => {
            this.refreshChart(res.data);
        }).catch((err) => {
            this.loadDataError(err);
        }).finally(() => {
            this.loadTimer = window.setTimeout(() => {
                this.loadData();
            }, ReactEchart.LoadDelay);
        });
    }
    protected loadDataError(err: any) {
        console.error(err);
    }
    protected refreshChart(res: any) {
        console.log(res);
    }
    protected rewriteSeries(newOption: Echarts.EChartOption): Echarts.EChartOption {
        const series = newOption.series;
        if (series instanceof Array) {
            series.forEach((seriesItem, index) => {
                series[index] = this.standardizeSingleSeries(seriesItem, index);
            });
        }
        return newOption;
    }
    protected standardizeSingleSeries(seriesItem: Echarts.EChartOption.Series, index: number): Echarts.EChartOption.Series {
        if (!seriesItem.type) {
            seriesItem.type = "bar";
        }
        switch (seriesItem.type) {
            case "pie":
                seriesItem = this.standardizeSingleSeriesOfPie(seriesItem as Echarts.EChartOption.SeriesPie, index);
                break;
            case "line":
                seriesItem = this.standardizeSingleSeriesOfLine(seriesItem as Echarts.EChartOption.SeriesLine, index);
                break;
            case "bar":
                seriesItem = this.standardizeSingleSeriesOfBar(seriesItem as Echarts.EChartOption.SeriesBar, index);
                break;
            case "gauge":
                seriesItem = this.standardizeSingleSeriesOfGauge(seriesItem as Echarts.EChartOption.SeriesGauge, index);
                break;
        }
        return seriesItem as Echarts.EChartOption.Series;
    }
    protected standardizeSingleSeriesOfGauge(seriesItem: Echarts.EChartOption.SeriesGauge, index: number): Echarts.EChartOption.SeriesGauge {
        let opt: Echarts.EChartOption.SeriesGauge = {
            startAngle: 180,
            endAngle: 0,
            radius: "200%",
            min: 0,
            max: 100,
            splitNumber: 1,
            axisLine: {
                lineStyle: {
                    width: 10,
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                show: false,
            },
        };
        if (this.chartType === "customGauge") {
            opt = mixedSameType(opt, {
                center: ["50%", "100%"],
                title: {
                    show: false,
                },
            } as any as Echarts.EChartOption.SeriesGauge);
        }
        return mixedSameType(opt, seriesItem);
    }
    protected standardizeSingleSeriesOfBar(seriesItem: Echarts.EChartOption.SeriesBar, index: number) {
        return mixedSameType({
            itemStyle: {
                color: "#43fdff",
            },
        }, seriesItem);
    }
    protected standardizeSingleSeriesOfLine(seriesItem: Echarts.EChartOption.SeriesLine, index: number) {
        return mixedSameType({

        }, seriesItem);
    }
    protected standardizeSingleSeriesOfPie(seriesItem: Echarts.EChartOption.SeriesPie, index: number) {
        return mixedSameType({
            hoverAnimation: false,
            label: {
                show: false,
            },
        }, seriesItem);
    }
    protected toCustomGaugeChartTypeOptions(): Echarts.EChartOption {
        return mixedSameType(ReactEchart.defaultOptions, {
            xAxis: {
                show: false,
            },
            yAxis: {
                show: false,
            },
        });
    }
    protected toPieChartTypeOptions(): Echarts.EChartOption {
        const chartTypeOptions = copy(ReactEchart.defaultOptions);
        chartTypeOptions.xAxis = {
            show: false,
        };
        chartTypeOptions.yAxis = {
            show: false,
        };
        return chartTypeOptions;
    }
}
