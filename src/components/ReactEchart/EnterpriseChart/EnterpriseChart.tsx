import { GeneralListStore, store } from "../../../redux/GeneralListStore";
import { ReactEchart } from "../ReactEchart";
import "./EnterpriseChart.scss";

declare namespace EnterpriseChart {
    export interface IProps {
        dataUrl?: string;
    }
}

export class EnterpriseChart extends ReactEchart {
    public chartType: ReactEchart.TChartType = "pie";
    public componentDidMount() {
        this.initEChart();
        store.subscribe(() => {
            const { action, enterprise } = store.getState();
            if (action === "updateInterfaceType") {
                this.setOptionByData(enterprise);
            }
        });
    }
    protected setOptionByData(enterprise: GeneralListStore.IEnterprise) {
        const options = {
            series: [
                {
                    type: "pie",
                    name: "企业",
                    radius: ["50%", "70%"],
                    center: ["50%", "36%"],
                    data: [
                        {
                            name: "钢铁",
                            value: enterprise.iron,
                            itemStyle: {
                                color: "#32ecfa",
                            },
                        },
                        {
                            name: "纺织",
                            value: enterprise.spin,
                            itemStyle: {
                                color: "#ec8b41",
                            },
                        },
                        {
                            name: "化工",
                            value: enterprise.chemicalIndustry,
                            itemStyle: {
                                color: "#27ffbb",
                            },
                        },
                        {
                            name: "机械",
                            value: enterprise.machine,
                            itemStyle: {
                                color: "#f8d751",
                            },
                        },
                        {
                            name: "其它",
                            value: enterprise.else,
                            itemStyle: {
                                color: "#32bdfa",
                            },
                        },
                    ],
                },
            ],
            title: {
                show: true,
                text: "{bg|}",
                top: "22%",
                left: "center",
                textStyle: {
                    rich: {
                        bg: {
                            color: "red",
                            width: 60,
                            height: 60,
                            backgroundColor: {
                                image: require("../../../assets/img/enterprise.png"),
                            },
                        },
                    },
                },
            },
            legend: {
                bottom: 5,
                textStyle: {
                    color: "white",
                },
            },
        };
        this.setOption(options);
    }
}
