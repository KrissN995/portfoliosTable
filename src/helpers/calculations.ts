import {Asset, Client, Portfolio} from "../models/appModels";
import {ExchangeRate} from "../models/currencyModels";
import {capitalizeLetters} from "./app";

/**
 * Calculates client aggregated values for all portfolios assets in the client currency
 * @param data
 * @param field
 * @param exchangeRates
 * @param clientCurrency
 */
export const calculateAggregatedValues = (data: Asset[], field: string, exchangeRates: ExchangeRate, clientCurrency: string) => {
    let portfolioAssociatedRisk: number = 0;
    let portfolioCapitalGain: number = 0;
    let portfolioSumTotalValue: number = 0;
    data.forEach((asset: Asset) => {
        const assetAssociatedRisk = asset.quantity * asset.associatedRiskPerAsset;
        let assetCapitalGain = asset.quantity * parseInt(asset.capitalGainPerAsset);
        let totalValuePerAsset = (asset.quantity * asset.valuePerAsset) + assetCapitalGain;

        if (asset.currency !== exchangeRates.base) {
            const exchangeRateForCurrency = Object.entries(exchangeRates.rates)?.filter(x => x.includes(asset.currency))[0];
            const value = exchangeRateForCurrency[1];
            assetCapitalGain = assetCapitalGain / value;
            totalValuePerAsset = totalValuePerAsset / value;
        }

        portfolioAssociatedRisk += assetAssociatedRisk;
        portfolioCapitalGain += assetCapitalGain;
        portfolioSumTotalValue += totalValuePerAsset;
    })

    let exchangeRateForClient = 1;
    if (clientCurrency !== exchangeRates.base) {
        exchangeRateForClient = Object.entries(exchangeRates.rates)?.filter(x => x.includes(clientCurrency))[0]?.[1];
    }

    switch (field) {
        case 'netWorth':
            return (portfolioCapitalGain + portfolioSumTotalValue) * exchangeRateForClient;
        case 'capitalGain':
            return portfolioCapitalGain * exchangeRateForClient;
        case 'associatedRisk':
            return portfolioAssociatedRisk * exchangeRateForClient;
        default:
            return 0;
    }
}

/**
 * Returns aggregated net worth,  capital gain or associated Risk
 * @param params
 * @param field
 * @param exchangeRates
 */
export const aggregateValues = (data: Client, field: string, exchangeRates: ExchangeRate) => {
    if (data && data.portfolios?.length > 0) {
        const allAssets = data.portfolios.flatMap((x: any) => x.assets);
        let value: number = 0;
        if (allAssets?.length > 0) {
            value = calculateAggregatedValues(allAssets, field, exchangeRates, data.currency);
        }
        return value;
    } else
        return 0;
}

/**
 * Returns aggregated restriction Status
 * @param params
 */
export const aggregateRestrictionStatus = (data: Client) => {
    if (data && data.portfolios?.length > 0) {
        const allPortfoliosRestrictionStatus = data.portfolios.map((x: Portfolio) => capitalizeLetters(x.restrictionStatus));
        return allPortfoliosRestrictionStatus.join(', ');
    } else
        return [];
}