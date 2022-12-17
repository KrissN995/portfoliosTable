/**
 * Fetch all trades for the selected fund
 * @param fundId
 */
import {ClientDataService} from "../../services/ClientDataService";
import {setClientData, setErrorMessage} from "../slices/clientSlice";

export const fetchClientData: any = () => async (dispatch: any) => {
    try {
        const clientService = new ClientDataService();
        const data = await clientService.getClientData();
        dispatch(setClientData(data));
    } catch (error:any) {
        dispatch(setErrorMessage(error));
    }
};