export interface Asset {
    isin: string;
    assetType: string;
    assetName: string;
    location: string;
    quantity: number;
    currency: string;
    valuePerAsset: number;
    capitalGainPerAsset: string;
    associatedRiskPerAsset: number;
    assetTotalValue?: number;
    assetCapitalGain?: number;
    assetRisk?: number
}

export interface Portfolio {
    portfolioId: string;
    portfolioName: string;
    restrictionStatus: string;
    assets: Asset[];
}

export interface Client {
    clientId: string;
    firstName: string;
    lastName: string;
    annualIncome: number;
    riskProfile: number;
    residence: string;
    currency: string;
    clientType: string;
    portfolios: Portfolio[];
    clientAggregatedNetWorth?: number;
    clientAggregatedCapitalGain?: number;
    clientAggregatedRestrictionStatus?: any;
}
