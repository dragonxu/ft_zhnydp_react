import { createStore, combineReducers } from "redux";

declare namespace GeneralListStore{
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
    export type TActionType = "update" | "getAll";
    export interface IState {
        data: IResData;
        action: TActionType;
    }
    export interface IUpdateAction {
        type: "update";
        data: Partial<IResData>;
    }
    export interface ICommonAction {
        type: "getAll";
    }
    export type TAction = ICommonAction | IUpdateAction;
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
        case "update":
            data = updateData(prevData, actions.data);
            break;
        case "getAll":
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

export const store = createStore(combineReducers({
    action: actionReducer,
    data: dataReducer,
}));
