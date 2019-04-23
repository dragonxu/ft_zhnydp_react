import { GeneralListStore } from "../GeneralListStore";

function updateData(prevData: GeneralListStore.IResData, nextData: Partial<GeneralListStore.IResData>): GeneralListStore.IResData {
    const data = Object.assign({}, prevData);
    for (const attr in nextData) {
        if (attr in data) {
            (data as any)[attr] = (nextData as any)[attr];
        }
    }
    return data;
}

export function dataReducer(prevData: GeneralListStore.IResData, actions: GeneralListStore.TAction): GeneralListStore.IResData {
    let data: GeneralListStore.IResData;
    if (typeof prevData === "undefined") {
        prevData = {
            checkPointNum: 0,
            clientNum: 0,
            collect: 0,
            electricity: 0,
            energyReport: 0,
            inspectNum: 0,
            load: 0,
            terminal: 0,
        };
    }
    switch (actions.type) {
        case "update":
            data = updateData(prevData, actions.data);
            break;
        case "getAll":
        default:
            data = prevData;
            break;
    }
    return data;
}
