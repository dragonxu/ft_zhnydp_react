import { GeneralListStore } from "../GeneralListStore";

export function enterpriseReducer(prevData: GeneralListStore.IEnterprise, actions: GeneralListStore.TAction) {
    let data: GeneralListStore.IEnterprise;
    if (typeof prevData === "undefined") {
        prevData = {
            iron: 0,
            chemicalIndustry: 0,
            spin: 0,
            machine: 0,
            else: 0,
        };
    }
    switch (actions.type) {
        case "updateInterfaceType":
            data = actions.data.enterprise;
            break;
        case "getAll":
        default:
            data = prevData;
            break;
    }
    return data;
}
