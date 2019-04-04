import * as Echarts from "echarts";
import React, { Component, createRef } from "react";
import { copy, mixedSameType } from "../../common/functions/obj";
import defaultOptions from "../../common/var/ReactEchart/defaultOptions";

declare namespace ReactEchart {
    export interface IProps {
        options: Echarts.EChartOption;
    }
}
export class ReactEchart extends Component<ReactEchart.IProps> {
    protected static readonly  defaultOptions: Echarts.EChartOption = defaultOptions;
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
    }
    public setOption(opts: Echarts.EChartOption): this {
        console.log(this.eChart, opts);
        this.eChart.setOption(opts);
        return this;
    }
    public mixinOptions(options: Echarts.EChartOption): Echarts.EChartOption {
        const defaultOpt = copy(this.getDefaultOptions());
        const selfOptions = copy(options);
        return mixedSameType(defaultOpt, selfOptions);
    }
    protected getDefaultOptions(): Echarts.EChartOption {
        return ReactEchart.defaultOptions;
    }
}
