import clientSliceReducer, {
    ClientState,
    setClientData,
    setErrorMessage,
    setClientDialogOpen,
    setSelectedClient
} from "../../../store/slices/clientSlice";
import {Client} from "../../../models/appModels";

const initialState: ClientState = {
    errorMessage: '',
    clientDialogOpen: false,
    selectedClient: null
};

describe('Client_Reducer', () => {
    it('setErrorMessage', () => {
        const clientErrorMessage: string = 'Data not found';
        const action = setErrorMessage(clientErrorMessage);
        const result = clientSliceReducer(initialState, action);
        expect(result.errorMessage).toEqual(clientErrorMessage);
    });
    it('setClientDialogOpen', () => {
        const clientDialogOpen: boolean = true;
        const action = setClientDialogOpen(clientDialogOpen);
        const result = clientSliceReducer(initialState, action);
        expect(result.clientDialogOpen).toEqual(clientDialogOpen);
    });
    it('setSelectedClient', () => {
        const clientSelectedClient: Client = {
            clientId: "cli27789",
            firstName: "Julia",
            lastName: "Asper",
            annualIncome: 19000000,
            riskProfile: 2,
            residence: "Switzerland",
            currency: "CHF",
            clientType: "retail",
            portfolios: [
                {
                    portfolioId: "cli27789_por1",
                    portfolioName: "portfolio 1",
                    restrictionStatus: "breached",
                    assets: [
                        {
                            isin: "US2692464017",
                            assetType: "equity",
                            assetName: "E TRADE FINL NEW DL-,01",
                            location: "US",
                            quantity: 600,
                            currency: "USD",
                            valuePerAsset: 23500,
                            capitalGainPerAsset: "8700",
                            associatedRiskPerAsset: 3900
                        },
                        {
                            isin: "US30303M1027",
                            assetType: "share",
                            assetName: "Facebook, Inc.",
                            location: "US",
                            quantity: 1000,
                            currency: "USD",
                            valuePerAsset: 72000,
                            capitalGainPerAsset: "10500",
                            associatedRiskPerAsset: 4900
                        },
                        {
                            isin: "CH0034803277",
                            assetType: "equity",
                            assetName: "L'Eau du Ciel SA",
                            location: "CH",
                            quantity: 450,
                            currency: "CHF",
                            valuePerAsset: 55000,
                            capitalGainPerAsset: "9600",
                            associatedRiskPerAsset: 4000
                        }
                    ]
                }
            ]
        }
        const action = setSelectedClient(clientSelectedClient);
        const result = clientSliceReducer(initialState, action);
        expect(result.selectedClient).toEqual(clientSelectedClient);
    });

    it('setClientData', () => {
        const clientClientData: Client[] = [
            {
                clientId: "cli111098",
                firstName: "Ivan",
                lastName: "Lenzi",
                annualIncome: 18000000,
                riskProfile: 3,
                residence: "Germany",
                currency: "EUR",
                clientType: "retail",
                portfolios: [
                    {
                        portfolioId: "cli111098_por1",
                        portfolioName: "portfolio 1",
                        restrictionStatus: "clean",
                        assets: [
                            {
                                isin: "US4581401001",
                                assetType: "share",
                                assetName: "Intel Corporation",
                                location: "US",
                                quantity: 1000,
                                currency: "USD",
                                valuePerAsset: 54610,
                                capitalGainPerAsset: "9200",
                                associatedRiskPerAsset: 1200
                            },
                            {
                                isin: "FR0000120321",
                                assetType: "equity",
                                assetName: "L'Oréal S.A.",
                                location: "FR",
                                quantity: 600,
                                currency: "EUR",
                                valuePerAsset: 18030,
                                capitalGainPerAsset: "-1200",
                                associatedRiskPerAsset: 4500
                            }
                        ]
                    },
                    {
                        portfolioId: "cli111098_por2",
                        portfolioName: "portfolio 2",
                        restrictionStatus: "breached",
                        assets: [
                            {
                                isin: "US50162D1000",
                                assetType: "equity",
                                assetName: "L+L ENERGY INC. DL-,001",
                                location: "US",
                                quantity: 230,
                                currency: "USD",
                                valuePerAsset: 117000,
                                capitalGainPerAsset: "14500",
                                associatedRiskPerAsset: 4300
                            },
                            {
                                isin: "DE000AK0E1V3",
                                assetType: "equity",
                                assetName: "DZ Bank AG",
                                location: "DE",
                                quantity: 500,
                                currency: "EUR",
                                valuePerAsset: 29800,
                                capitalGainPerAsset: "8700",
                                associatedRiskPerAsset: 4100
                            },
                            {
                                isin: "DE0006299001",
                                assetType: "equity",
                                assetName: "Durkopp Adler AG",
                                location: "DE",
                                quantity: 400,
                                currency: "EUR",
                                valuePerAsset: 27000,
                                capitalGainPerAsset: "5500",
                                associatedRiskPerAsset: 3000
                            }
                        ]
                    }
                ]
            },
            {
                clientId: "cli27789",
                firstName: "Julia",
                lastName: "Asper",
                annualIncome: 19000000,
                riskProfile: 2,
                residence: "Switzerland",
                currency: "CHF",
                clientType: "retail",
                portfolios: [
                    {
                        portfolioId: "cli27789_por1",
                        portfolioName: "portfolio 1",
                        restrictionStatus: "breached",
                        assets: [
                            {
                                isin: "US2692464017",
                                assetType: "equity",
                                assetName: "E TRADE FINL NEW DL-,01",
                                location: "US",
                                quantity: 600,
                                currency: "USD",
                                valuePerAsset: 23500,
                                capitalGainPerAsset: "8700",
                                associatedRiskPerAsset: 3900
                            },
                            {
                                isin: "US30303M1027",
                                assetType: "share",
                                assetName: "Facebook, Inc.",
                                location: "US",
                                quantity: 1000,
                                currency: "USD",
                                valuePerAsset: 72000,
                                capitalGainPerAsset: "10500",
                                associatedRiskPerAsset: 4900
                            },
                            {
                                isin: "CH0034803277",
                                assetType: "equity",
                                assetName: "L'Eau du Ciel SA",
                                location: "CH",
                                quantity: 450,
                                currency: "CHF",
                                valuePerAsset: 55000,
                                capitalGainPerAsset: "9600",
                                associatedRiskPerAsset: 4000
                            }
                        ]
                    }
                ]
            }
        ]
        const action = setClientData(clientClientData);
        const result = clientSliceReducer(initialState, action);
        expect(result.clientData).toEqual(clientClientData);
    });
});