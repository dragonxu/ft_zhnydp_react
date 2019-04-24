import { store, GeneralListStore } from "../../../redux/GeneralListStore";
import { ReactEchart } from "../ReactEchart";
import "./EnteredDeviceChart.scss";

export class EnteredDeviceChart extends ReactEchart {
    public chartType: ReactEchart.TChartType = "bar";
    public componentDidMount() {
        this.initEChart();
        store.subscribe(() => {
            const { action, enteredDevice } = store.getState();
            if (action === "updateEnteredDevice" || action === "getAll") {
                this.setOptionByData(enteredDevice);
            }
        });
        store.dispatch({
            type: "getAll",
        });
    }
    protected setOptionByData(enteredDevice: GeneralListStore.IEnteredDevice) {
        const option = {
            grid: {
                left: 60,
                top: 10,
                bottom: 20,
            },
            yAxis: {
                data: [
                    {
                        value: "电器设备",
                        textStyle: {
                            color: "white",
                        },
                    },
                    {
                        value: "环境设备",
                        textStyle: {
                            color: "white",
                        },
                    },
                    {
                        value: "光储设备",
                        textStyle: {
                            color: "white",
                        },
                    },
                    {
                        value: "储能设备",
                        textStyle: {
                            color: "white",
                        },
                    },
                    {
                        value:
                            "其它设备",
                        textStyle: {
                            color: "white",
                        },
                    },
                ],
            },
            series: [
                {
                    type: "bar",
                    data: [
                        {
                            name: "电器设备",
                            value: enteredDevice.electronic,
                        },
                        {
                            name: "环境设备",
                            value: enteredDevice.environment,
                        },
                        {
                            name: "光储设备",
                            value: enteredDevice.light,
                        },
                        {
                            name: "储能设备",
                            value: enteredDevice.energy,
                        },
                        {
                            name: "其它设备",
                            value: enteredDevice.else,
                        },
                    ],
                },
            ],
        };
        this.setOption(option);
    }
}
