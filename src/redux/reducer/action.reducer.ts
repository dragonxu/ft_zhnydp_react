import { GeneralListStore } from "../GeneralListStore";

export function actionReducer(prevData: GeneralListStore.TActionType = "getAll", action: GeneralListStore.TAction): GeneralListStore.TActionType {
    return action.type;
}
