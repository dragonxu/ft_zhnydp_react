import { combineReducers, createStore } from "redux";
import { mixedSameType } from "../common/functions/obj";

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

const initState: GeneralListStore.IState = {
    action: "getAll",
    data: {
        checkPointNum: 0,
        clientNum: 0,
        collect: 0,
        electricity: 0,
        energyReport: 0,
        inspectNum: 0,
        load: 0,
        terminal: 0,
    },
    interfaceType: {
        enterprise: {
            iron: 0,
            chemicalIndustry: 0,
            spin: 0,
            machine: 0,
            else: 0,
        },
        building: {
            government: 0,
            school: 0,
            hospital: 0,
            office: 0,
            else: 0,
        },
    },
    enteredDevice: {
        electronic: 20,
        environment: 30,
        light: 50,
        energy: 90,
        else: 90,
    },
};

function updateData(prevData: GeneralListStore.IResData, nextData: Partial<GeneralListStore.IResData>): GeneralListStore.IResData {
    const data = Object.assign({}, prevData);
    for (const attr in nextData) {
        if (attr in data) {
            (data as any)[attr] = (nextData as any)[attr];
        }
    }
    return data;
}

function dataReducer(prevData: GeneralListStore.IResData, actions: GeneralListStore.TAction): GeneralListStore.IResData {
    let data: GeneralListStore.IResData;
    if (typeof prevData === "undefined") {
        data = initState.data;
    }
    switch (actions.type) {
        // case "updateInterfaceType":
        //     console.log(data, prevData);
        //     break;
        case "update":
            data = updateData(prevData, actions.data);
            break;
        case "getAll":
        default:
            if (typeof prevData === "undefined") {
                data = initState.data;
            } else {
                data = prevData;
            }
            break;
    }
    return data;
}

function actionReducer(prevData: GeneralListStore.TActionType = "getAll", action: GeneralListStore.TAction) {
    let prevAction = prevData;
    prevAction = action.type;
    return prevAction;
}

function buildingReducer(prevData: GeneralListStore.IBuilding, actions: GeneralListStore.TAction) {
    let data: GeneralListStore.IBuilding;
    switch (actions.type) {
        case "updateInterfaceType":
            data = actions.data.building;
            break;
        case "getAll":
        default:
            if (typeof prevData === "undefined") {
                data = initState.interfaceType.building;
            } else {
                data = prevData;
            }
            break;
    }
    return data;
}

function enterpriseReducer(prevData: GeneralListStore.IEnterprise, actions: GeneralListStore.TAction) {
    let data: GeneralListStore.IEnterprise;
    switch (actions.type) {
        case "updateInterfaceType":
            data = actions.data.enterprise;
            break;
        case "getAll":
        default:
            if (typeof prevData === "undefined") {
                data = initState.interfaceType.enterprise;
            } else {
                data = prevData;
            }
            break;
    }
    return data;
}

function enteredDeviceReducer(prevData: any, actions: GeneralListStore.TAction) {
    let data: any;
    if (typeof prevData === "undefined") {
        data = initState.enteredDevice;
    } else {
        data = prevData;
    }
    switch (actions.type) {
        case "updateEnteredDevice":
            data = mixedSameType(data, actions.data);
            break;
        case "getAll":
        default:
            break;
    }
    return data;
};

export const store = createStore(combineReducers({
    action: actionReducer,
    data: dataReducer,
    building: buildingReducer,
    enterprise: enterpriseReducer,
    enteredDevice: enteredDeviceReducer,
}));
