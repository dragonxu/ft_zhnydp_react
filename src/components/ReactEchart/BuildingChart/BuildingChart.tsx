import { GeneralListStore, store } from "../../../redux/GeneralListStore";
import { ReactEchart } from "../ReactEchart";
import "./BuildingChart.scss";

export class BuildingChart extends ReactEchart {
    public chartType: ReactEchart.TChartType = "pie";
    public componentDidMount() {
        this.initEChart();
        store.subscribe(() => {
            const { action, building } = store.getState();
            if (action === "updateInterfaceType") {
                this.setOptionByData(building);
            }
        });
    }
    protected getSeries(building: GeneralListStore.IBuilding) {
        return this.mixedPieSeries({
            name: "楼宇",
            radius: ["50%", "70%"],
            center: ["50%", "36%"],
            data: [
                {
                    name: "政府",
                    value: building.government,
                    itemStyle: {
                        color: "#32ecfa",
                    },
                },
                {
                    name: "学校",
                    value: building.school,
                    itemStyle: {
                        color: "#27ffd1",
                    },
                },
                {
                    name: "医院",
                    value: building.hospital,
                    itemStyle: {
                        color: "#ec8b41",
                    },
                },
                {
                    name: "写字楼",
                    value: building.office,
                    itemStyle: {
                        color: "#f8d751",
                    },
                },
                {
                    name: "其他",
                    value: building.else,
                    itemStyle: {
                        color: "#32bdfa",
                    },
                },
            ],
        });
    }
    protected setOptionByData(building: GeneralListStore.IBuilding) {
        const series = this.getSeries(building);
        const options = this.mixedOptions({
            series: [
                series,
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
                                image: require("../../../assets/img/building.png"),
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
        });
        this.setOption(options);
    }
}
