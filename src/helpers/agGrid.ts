import {ICellRendererParams, SideBarDef, ValueGetterParams} from "ag-grid-community";
import {Asset} from "../models/appModels";
import {capitalizeLetters, fiatNumberFormatter} from "./app";
import {ExchangeRate} from "../models/currencyModels";
import CustomTooltip from '../components/cellRenderers/TooltipCellRenderer';

/**
 * Sets the ag-grid theme based on the selected theme in the app
 * @param isDark
 */
export const getGridTheme = (isDark: boolean): string => {
    return isDark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
};

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

        // if (asset.currency !== exchangeRates.base) {
        //     const exchangeRateForCurrency = Object.entries(exchangeRates.rates)?.filter(x => x.includes(asset.currency))[0];
        //     const value = exchangeRateForCurrency[1];
        //     assetCapitalGain = assetCapitalGain / value;
        //     totalValuePerAsset = totalValuePerAsset / value;
        // }

        portfolioAssociatedRisk += assetAssociatedRisk;
        portfolioCapitalGain += assetCapitalGain;
        portfolioSumTotalValue += totalValuePerAsset;
    })

    let exchangeRateForClient = 1;
    // if (clientCurrency !== exchangeRates.base) {
    //     exchangeRateForClient = Object.entries(exchangeRates.rates)?.filter(x => x.includes(clientCurrency))[0]?.[1];
    // }

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
 * Value getter to return the corresponded aggregated value
 * @param params
 * @param field
 * @param exchangeRates
 */
export const aggregateValues = (params: ValueGetterParams, field: string, exchangeRates: ExchangeRate) => {
    if (params?.data && params.data.portfolios?.length > 0) {
        const allAssets = params.data.portfolios.flatMap((x: any) => x.assets);
        let value: number = 0;
        if (allAssets?.length > 0) {
            value = calculateAggregatedValues(allAssets, field, exchangeRates, params.data.currency);
        }
        return value;
    } else
        return 0;
}

/**
 * Value Getter to return all portfolios restriction status for the specific client
 * @param params
 */
export const aggregateRestrictionStatus = (params: ValueGetterParams) => {
    if (params?.data && params.data.portfolios?.length > 0) {
        const allPortfolios = params.data.portfolios;
        return allPortfolios.flatMap((x: any) => capitalizeLetters(x.restrictionStatus));
    } else
        return '';
}

/**
 * Cell renderer for displaying the value and the currency
 * @param params
 */
export const valueCellRenderer = (params: ICellRendererParams) => {
    if (params && params.value && params.data) {
        return `${fiatNumberFormatter.format(params.value)} ${params.data?.currency}`
    } else
        return 0;
}


export const DefaultColDef = {
    filter: true,
    resizable: true,
    sortable: true,
    display: 'flex',
    flex: 1,
    tooltipComponent: CustomTooltip
};

export const DefaultSideBarDef: SideBarDef = {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
                suppressPivotMode: true,
                suppressValues: true,
            },
        },
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
        },
    ],
    position: 'right',
};

export const DefaultStatusPanelDef = {
    statusPanels: [
        {
            statusPanel: 'agAggregationComponent',
            statusPanelParams: {
                // possible values are: 'count', 'sum', 'min', 'max', 'avg'
                aggFuncs: ['min', 'max', 'avg', 'sum'],
            },
        },
    ],
};