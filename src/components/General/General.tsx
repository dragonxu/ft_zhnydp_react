import React, { Component } from "react";
import { StFetch } from "../../common/functions/StFetch";
import { store } from "../../redux/GeneralListStore";
import { ClientMap } from "../ClientMap/ClientMap";
import { DataCount } from "../DataCount/DataCount";
import { DevelopHistory } from "../DevelopHistory/DevelopHistory";
import { EnergyType } from "../EnergyType/EnergyType";
import { GeneralList } from "../GeneralList/GeneralList";
import { BuildingChart } from "../ReactEchart/BuildingChart/BuildingChart";
import { EnteredDeviceChart } from "../ReactEchart/EnteredDeviceChart/EnteredDeviceChart";
import { EnterpriseChart } from "../ReactEchart/EnterpriseChart/EnterpriseChart";
import { ServiceTimesChart } from "../ReactEchart/ServiceTimesChart/ServiceTimesChart";
import { ViewBlock } from "../ViewBlock/ViewBlock";
import "./General.scss";
export class General extends Component {
    public reloadTimer = {
        interfaceType: 0,
        dataList: 0,
    };
    public render() {
        return (
            <div className="general-view">
                <div className="col-1">
                    <ViewBlock
                        blockTitle="中心介绍"
                        className="intro-block row-1"
                    >
                        <p>本公司运营的综合能源服务中心，以云服务平台为支撑，立足于客户能源大数据的深度开发，以客户设备代维、用电智能化服务、能效提升服务、新能源服务为方向，为广大客户提供“最贴心的能源服务管家”、“4S店”式的综合能源服务，提高用户用能安全、提升效率，降低用能成本，提升用能服务的层次和品质。</p>
                    </ViewBlock>
                    <ViewBlock
                        blockTitle="客户服务次数"
                        className="service-times-block row-2"
                    >
                        <ServiceTimesChart dataUrl="queryWorkNoteInfo.json"></ServiceTimesChart>
                    </ViewBlock>
                    <ViewBlock
                        blockTitle="能源类型接入用户统计"
                        className="energy-type-block last-row"
                    >
                        <EnergyType></EnergyType>
                    </ViewBlock>
                </div>
                {/* col-2 */}
                <div className="col-2">
                    <ViewBlock className="data-list">
                        <GeneralList></GeneralList>
                    </ViewBlock>
                    <ViewBlock className="client-map-block">
                        <ClientMap></ClientMap>
                    </ViewBlock>
                    <ViewBlock
                        className="last-row"
                        blockTitle="发展历程"
                    >
                        <DevelopHistory></DevelopHistory>
                    </ViewBlock>
                </div>
                {/* col-3 */}
                <div className="col-3">
                    <ViewBlock
                        className="data-count-block row-1"
                        blockTitle="数据统计"
                    >
                        <DataCount></DataCount>
                    </ViewBlock>
                    <ViewBlock
                        className="interface-type-block row-2"
                        blockTitle="接入类型统计"
                    >
                        <EnterpriseChart dataUrl=""></EnterpriseChart>
                        <BuildingChart dataUrl=""></BuildingChart>
                    </ViewBlock>
                    <ViewBlock
                        className="entered-device-block last-row"
                        blockTitle="接入设备统计"
                    >
                        <EnteredDeviceChart dataUrl=""></EnteredDeviceChart>
                    </ViewBlock>
                </div>
            </div>
        );
    }
    public componentDidMount() {
        this.loadData();
    }
    public componentWillUnmount() {
        if (this.reloadTimer.dataList) {
            clearTimeout(this.reloadTimer.dataList);
        }
        if (this.reloadTimer.interfaceType) {
            clearTimeout(this.reloadTimer.interfaceType);
        }
    }
    protected loadData() {
        this.loadDataOfDataList();
        this.loadDataOfInterfaceType();
    }
    protected loadDataOfInterfaceType() {
        StFetch("/getInterfaceType.json").then((res) => {
            store.dispatch({
                data: res,
                type: "updateInterfaceType",
            });
        }).finally(() => {
            // this.reloadTimer.interfaceType = window.setTimeout(() => {
            //     this.loadDataOfInterfaceType();
            // }, 1000);
        });
    }
    protected loadDataOfDataList() {
        StFetch("/getDataList.json").then((res) => {
            store.dispatch({
                data: res,
                type: "update",
            });
        }).finally(() => {
            // this.reloadTimer.dataList = window.setTimeout(() => {
            //     this.loadDataOfDataList();
            // }, 1000);
        });
    }
}
