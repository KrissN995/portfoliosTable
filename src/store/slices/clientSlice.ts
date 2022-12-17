import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Client} from "../../models/appModels";

export interface MainState {
    clientData: Client[];
    errorMessage: string;
}

const initialState: MainState = {
    clientData: [],
    errorMessage: '',
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
    }
});

export const {
    setClientData,
    setErrorMessage
} = clientSlice.actions;

export default clientSlice.reducer;