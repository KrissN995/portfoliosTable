import '@testing-library/react-hooks';
import {render, screen} from '@testing-library/react';
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "../../../theme/theme";
import store from "../../../store/store";
import {Provider} from 'react-redux';
import ClientRowComponent from "../../../components/home/ClientRowComponent";
import {ClientExtended} from "../../../models/appModels";

const client: ClientExtended = {
    clientId: "cli111098",
    firstName: "Ivan",
    lastName: "Lenzi",
    annualIncome: 18000000,
    riskProfile: 3,
    residence: "Germany",
    currency: "EUR",
    clientType: "retail",
    clientAggregatedNetWorth: 148742830.79,
    clientAggregatedCapitalGain: 17656439.2,
    clientAggregatedRestrictionStatus: "Clean,Breached",
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
};

test('should display the table row data with two buttons', () => {
    render(
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <ClientRowComponent row={client}/>
            </ThemeProvider>
        </Provider>
    );
    const table = screen.getByLabelText('client-data-row');
    const firstExpandBtn = screen.getByLabelText('expand row');

    expect(table).toBeInTheDocument();
    expect(firstExpandBtn).toBeInTheDocument();
});

