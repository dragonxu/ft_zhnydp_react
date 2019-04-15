import { combineReducers, createStore } from "redux";

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
    export type TActionType = "update" | "getAll" | "updateInterfaceType";
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
    export interface IInterfaceType {
        enterprise: IEnterprise;
        building: IBuilding;
    }
    export interface IState {
        data: IResData;
        action: TActionType;
        interfaceType: IInterfaceType;
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
    export type TAction = ICommonAction | IUpdateAction | IUpdateInterfaceAction;
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
    }
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

export const store = createStore(combineReducers({
    action: actionReducer,
    data: dataReducer,
    building: buildingReducer,
    enterprise: enterpriseReducer,
}));
