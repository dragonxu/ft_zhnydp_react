import * as Echarts from "echarts";
import React, { Component, createRef } from "react";
import defaultOptions from "../../common/var/ReactEchart/defaultOptions";
import Axios from "axios";
import { mixedSameType, copy } from "../../common/functions/obj";

export declare namespace ReactEchart {
    export interface IProps {
        dataUrl?: string;
    }
    export type TChartType = "line" | "pie" | "bar" | "standard";
    export type ResetFunc = (opt: Echarts.EChartOption) => Echarts.EChartOption;
}
export class ReactEchart extends Component<ReactEchart.IProps> {
    public static readonly LoadDelay = 1000;
    protected static readonly defaultOptions: Echarts.EChartOption = defaultOptions;
    public className: string = "react-echart full-view";
    protected elmRef: React.RefObject<HTMLDivElement> = createRef();
    protected eChart!: Echarts.ECharts;
    protected dataUrl: string;
    protected loadTimer = 0;
    protected chartType: ReactEchart.TChartType = "standard";
    public getChartTypeOptions(): Echarts.EChartOption {
        switch (this.chartType) {
            case "pie":
                return this.toPieChartTypeOptions();
        }
        return copy(ReactEchart.defaultOptions);
    }
    public render(): JSX.Element {
        return (
            <div className={this.className} ref={this.elmRef}></div>
        );
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
        }
        return seriesItem as Echarts.EChartOption.Series;
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
