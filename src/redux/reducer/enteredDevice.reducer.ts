import { mixedSameType } from "../../common/functions/obj";
import { GeneralListStore } from "../GeneralListStore";

export function enteredDeviceReducer(prevData: any, actions: GeneralListStore.TAction) {
    let data: any;
    if (typeof prevData === "undefined") {
        prevData = {
            electronic: 20,
            environment: 30,
            light: 50,
            energy: 90,
            else: 90,
        };
    }
    switch (actions.type) {
        case "updateEnteredDevice":
            data = mixedSameType(data, actions.data);
            break;
        case "getAll":
        default:
            return prevData;
            break;
    }
    return data;
}
