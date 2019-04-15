import { GeneralListStore, store } from "../../../redux/GeneralListStore";
import { ReactEchart } from "../ReactEchart";
import "./EnterpriseChart.scss";

declare namespace EnterpriseChart {
    export interface IProps {
        dataUrl?: string;
    }
}

export class EnterpriseChart extends ReactEchart {
    public chartType = "pie";
    public componentDidMount() {
        this.initEChart();
        store.subscribe(() => {
            const {action, enterprise} = store.getState();
            if (action === "updateInterfaceType") {
                this.setOptionByData(enterprise);
            }
        });
    }
    protected setOptionByData(enterprise: GeneralListStore.IEnterprise) {
        const series = this.mixedPieSeries({
            name: "企业",
            data: [
                {
                    name: "钢铁",
                    value: enterprise.iron,
                },
                {
                    name: "纺织",
                    value: enterprise.spin,
                },
                {
                    name: "代工",
                    value: enterprise.chemicalIndustry,
                },
                {
                    name: "机械",
                    value: enterprise.machine,
                },
                {
                    name: "其它",
                    value: enterprise.else,
                },
            ],
        });
        const options = this.mixedOptions({
            xAxis: {
                show: false,
            },
            yAxis: {
                show: false,
            },
            series: [
                series,
            ],
        });
        this.setOption(options);
    }
}
