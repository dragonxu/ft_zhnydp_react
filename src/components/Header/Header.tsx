import React, {Component} from "react";

export class Header extends  Component{
    render() {
        return (
            <div className="header">
                <div className="left-nav header-nav">
                    <ul>
                        <li>
                            <a href="" title="平台概览">
                                <div className="icon icon-general-view"></div>
                                <div>平台概览</div>
                            </a>
                        </li>
                        <li>
                            <a href="" title="数据监测">
                                <div className="icon icon-general-view"></div>
                                <div>数据监测</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <h1>
                    <div className="icon icon-web-title"></div>
                    <div>综合服务中心</div>
                </h1>
                <div className="right-nav header-nav">
                    <ul>
                        <li>
                            <a href="" title="数据分析">
                                <div className="icon icon-general-view"></div>
                                <div>数据分析</div>
                            </a>
                        </li>
                        <li>
                            <a href="" title="派单中心">
                                <div className="icon icon-general-view"></div>
                                <div>派单中心</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}