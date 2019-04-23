import { GeneralListStore } from "../GeneralListStore";

export function buildingReducer(prevData: GeneralListStore.IBuilding, actions: GeneralListStore.TAction) {
    let data: GeneralListStore.IBuilding;
    if (typeof prevData === "undefined") {
        prevData = {
            government: 0,
            school: 0,
            hospital: 0,
            office: 0,
            else: 0,
        };
    }
    switch (actions.type) {
        case "updateInterfaceType":
            data = actions.data.building;
            break;
        case "getAll":
        default:
            data = prevData;
            break;
    }
    return data;
}
