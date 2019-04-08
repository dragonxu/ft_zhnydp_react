import * as Echarts from "echarts";
import React, { Component, createRef } from "react";
import { copy, mixedSameType } from "../../common/functions/obj";
import defaultOptions from "../../common/var/ReactEchart/defaultOptions";

declare namespace ReactEchart {
    export interface IProps {
        dataUrl: string;
    }
}
export class ReactEchart extends Component<ReactEchart.IProps> {
    protected static readonly defaultOptions: Echarts.EChartOption = defaultOptions;
    public className: string = "react-echart full-view";
    protected elmRef: React.RefObject<HTMLDivElement> = createRef();
    protected eChart!: Echarts.ECharts;
    public render(): JSX.Element {
        return (
            <div className={this.className} ref={this.elmRef}></div>
        );
    }
    public componentDidMount() {
        this.eChart = Echarts.init(this.elmRef.current as HTMLDivElement);
        const opt = this.getOptions();
        this.setOption(opt);
    }
    public initEChart(): this {
        this.eChart = Echarts.init(this.elmRef.current as HTMLDivElement);
        return this;
    }
    public setOption(opts: Echarts.EChartOption): this {
        console.log(this.eChart, opts);
        this.eChart.setOption(opts);
        return this;
    }
    public mixinOptions(options: Echarts.EChartOption): Echarts.EChartOption {
        const defaultOpt = copy(this.getOptions());
        const selfOptions = copy(options);
        return mixedSameType(defaultOpt, selfOptions);
    }
    public getChartOption() {
        return this.eChart.getOption();
    }
    protected getOptions(): Echarts.EChartOption {
        return ReactEchart.defaultOptions;
    }
    protected async loadData() {
        const res = await fetch(this.props.dataUrl);
        const data = await res.json();
        // console.log(data)
        return data;
    }
}
