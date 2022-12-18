import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Client} from "../../models/appModels";

export interface ClientState {
    clientData?: Client[];
    errorMessage: string;
    clientDialogOpen: boolean;
    selectedClient: Client | null
}

const initialState: ClientState = {
    errorMessage: '',
    clientDialogOpen: false,
    selectedClient: null
};

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        /**
         * Set's the client data
         * @param state
         * @param action
         */
        setClientData(state, action: PayloadAction<Client[]>) {
            state.clientData = action.payload;
        },
        /**
         * Set's the error message
         * @param state
         * @param action
         */
        setErrorMessage(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload;
        },
        /**
         * Used for opening closing dialog with additional info for selected client
         * @param state
         * @param action
         */
        setClientDialogOpen(state, action: PayloadAction<boolean>) {
            state.clientDialogOpen = action.payload;
        },
        /**
         * Set's selected client data
         * @param state
         * @param action
         */
        setSelectedClient(state, action: PayloadAction<Client | null>) {
            state.selectedClient = action.payload;
        },
    }
});

export const {
    setClientData,
    setErrorMessage,
    setClientDialogOpen,
    setSelectedClient
} = clientSlice.actions;

export default clientSlice.reducer;