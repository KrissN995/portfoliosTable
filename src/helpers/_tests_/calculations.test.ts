import {aggregateRestrictionStatus, aggregateValues} from '../calculations';
import {Client} from "../../models/appModels";

const client: Client = {
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
};

test('aggregateRestrictionStatus_should_return_Clean, Breached', () => {
    const result = aggregateRestrictionStatus(client);
    expect(result).toBe('Clean, Breached');
});

test('aggregateValues_should_return_17656587.4', () => {
    const currencyExchangeRated: any = {
        lastUpdate: '1671494400',
        base: "EUR",
        rates: {
            EUR: 1,
            USD: 1.0599,
            JPY: 140.58,
            BGN: 1.9558,
            CZK: 24.181,
            DKK: 7.4388,
            GBP: 0.8753,
            HUF: 403.88,
            PLN: 4.6757,
            RON: 4.9125,
            SEK: 11.0615,
            CHF: 0.9854,
            ISK: 151.5,
            NOK: 10.5098,
            HRK: 7.5471,
            TRY: 19.7744,
            AUD: 1.5972,
            BRL: 5.6234,
            CAD: 1.4451,
            CNY: 7.39,
            HKD: 8.2488,
            IDR: 16537.09,
            ILS: 3.6759,
            INR: 87.6649,
            KRW: 1363.73,
            MXN: 20.9355,
            MYR: 4.6991,
            NZD: 1.6816,
            PHP: 58.549,
            SGD: 1.4347,
            THB: 36.853,
            ZAR: 18.4239
        }
    };
    const result = aggregateValues(client, 'capitalGain', currencyExchangeRated);
    expect(result.toFixed(1)).toBe("17656587.4");
});