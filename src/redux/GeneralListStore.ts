import { combineReducers, createStore } from "redux";
import { actionReducer } from "./reducer/action.reducer";
import { buildingReducer } from "./reducer/building.reducer";
import { dataReducer } from "./reducer/data.reducer";
import { enteredDeviceReducer } from "./reducer/enteredDevice.reducer";
import { enterpriseReducer } from "./reducer/enterprise.reducer";

export declare namespace GeneralListStore {
    export interface IResData {
        electricity: number;
        load: number;
        terminal: number;
        collect: number;
        clientNum: number;
        inspectNum: number;
        checkPointNum: number;
        energyReport: number;
    }
    export interface IEnterprise {
        iron: number;
        spin: number;
        chemicalIndustry: number;
        machine: number;
        else: number;
    }
    export interface IBuilding {
        government: number;
        school: number;
        hospital: number;
        office: number;
        else: number;
    }
    export interface IEnteredDevice {
        electronic: number;
        environment: number;
        light: number;
        energy: number;
        else: number;
    }
    export interface IInterfaceType {
        enterprise: IEnterprise;
        building: IBuilding;
    }
    export interface IState {
        data: IResData;
        action: TActionType;
        interfaceType: IInterfaceType;
        enteredDevice: IEnteredDevice;
    }
    export interface IUpdateAction {
        type: "update";
        data: Partial<IResData>;
    }
    export interface ICommonAction {
        type: "getAll";
    }
    export interface IUpdateInterfaceAction {
        type: "updateInterfaceType";
        data: Partial<IInterfaceType>;
    }
    export interface IUpdateEnteredDevice {
        type: "updateEnteredDevice";
        data: Partial<IEnteredDevice>;
    }
    export type TAction = ICommonAction | IUpdateAction | IUpdateInterfaceAction | IUpdateEnteredDevice;
    export type TActionType = "update" | "getAll" | "updateInterfaceType" | "updateEnteredDevice";
}

export const store = createStore(combineReducers({
    action: actionReducer,
    data: dataReducer,
    building: buildingReducer,
    enterprise: enterpriseReducer,
    enteredDevice: enteredDeviceReducer,
}));
