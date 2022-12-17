/**
 * Sets the ag-grid theme based on the selected theme in the app
 * @param isDark
 */
import {SideBarDef, ValueGetterParams} from "ag-grid-community";
import {Asset} from "../models/appModels";

export const getGridTheme = (isDark: boolean): string => {
    return isDark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
};
export const calculateAggregatedValues = (data: Asset[], field: string) => {
    let portfolioAssociatedRisk: number = 0;
    let portfolioCapitalGain: number = 0;
    let portfolioSumTotalValue: number = 0;
    data.forEach((asset: Asset) => {
        const assetAssociatedRisk = asset.quantity * asset.associatedRiskPerAsset;
        const assetCapitalGain = asset.quantity * parseInt(asset.capitalGainPerAsset);
        const totalValue = (asset.quantity * asset.valuePerAsset) + assetCapitalGain;

        portfolioAssociatedRisk += assetAssociatedRisk;
        portfolioCapitalGain += assetCapitalGain;
        portfolioSumTotalValue += totalValue;
    })
    switch (field) {
        case 'netWorth':
            return portfolioCapitalGain + portfolioSumTotalValue;
        case 'capitalGain':
            return portfolioCapitalGain;
        case 'associatedRisk':
            return portfolioAssociatedRisk;
        default:
            return 0;
    }
}
export const aggregateValues = (params: ValueGetterParams, field: string) => {
    if (params?.data && params.data.portfolios?.length > 0) {
        const allAssets = params.data.portfolios.flatMap((x: any) => x.assets);
        let value: number = 0;
        if (allAssets?.length > 0) {
            value = calculateAggregatedValues(allAssets, field);
        }
        return value;
    } else
        return 0;
}

export const aggregateRestrictionStatus = (params: ValueGetterParams) => {
    if (params?.data && params.data.portfolios?.length > 0) {
        const allPortfolios = params.data.portfolios;
        return allPortfolios.flatMap((x: any) => x.restrictionStatus);
    } else
        return '';
}

export const DefaultColDef = {
    filter: true,
    resizable: true,
    sortable: true,
    display: 'flex',
    flex: 1,
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