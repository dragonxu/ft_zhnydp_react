import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
export class Header extends Component {
    public render(): JSX.Element {
        return (
            <div className="header">
                <div className="left-nav header-nav">
                    <ul className="list-box">
                        <li>
                            <NavLink to="/" exact title="平台概览">
                                <div className="icon icon-view"></div>
                                <div>平台概览</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/monitor" title="数据监测">
                                <div className="icon icon-monitor"></div>
                                <div>数据监测</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <h1>
                    <div className="icon icon-web-title"></div>
                    <div className="gradient-title">综合服务中心</div>
                </h1>
                <div className="right-nav header-nav">
                    <ul className="list-box">
                        <li>
                            <NavLink to="/analysis" title="数据分析">
                                <div className="icon icon-analysis"></div>
                                <div>数据分析</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dispatch">
                                <div className="icon icon-dispatch"></div>
                                <div>派单中心</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
