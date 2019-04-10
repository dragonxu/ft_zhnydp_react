import React, { Component } from "react";
import { EnergyType } from "../EnergyType/EnergyType";
import { ServiceTimesChart } from "../ReactEchart/ServiceTimesChart/ServiceTimesChart";
import { ViewBlock } from "../ViewBlock/ViewBlock";
import "./General.scss";
export class General extends Component {
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
                        <ServiceTimesChart dataUrl="https://sin-iti.github.io/ft_zhnydp_react/public/res_data/queryWorkNoteInfo.json"></ServiceTimesChart>
                    </ViewBlock>
                    <ViewBlock
                        blockTitle="能源类型接入用户统计"
                        className="energy-type-block row-3"
                    >
                        <EnergyType></EnergyType>
                    </ViewBlock>
                </div>
                {/* col-2 */}
                <div className="col-2">
                    <ViewBlock className="data-list"></ViewBlock>
                </div>
                <div className="col-3">
                    <ViewBlock
                        className="data-count"
                        blockTitle="数据统计"
                    ></ViewBlock>
                </div>
            </div>
        );
    }
}
