import React, {useEffect, useMemo, useState} from 'react';
import {Grid, Paper, Theme} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import {Client} from "../../models/appModels";
import clsx from 'clsx';
import {
    aggregateRestrictionStatus,
    aggregateValues,
    DefaultColDef,
    DefaultSideBarDef,
    DefaultStatusPanelDef,
    getGridTheme, valueFormatter
} from "../../helpers/agGrid";
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices/rootSlice";
import {AgGridReact} from "ag-grid-react";
import {ColDef, ColGroupDef, GridApi, GridOptions, GridReadyEvent, ValueGetterParams,} from "ag-grid-community";
import SearchBox from "../shared/SearchBox";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    grid: {
        flex: 1,
        marginTop: '2em'
    },
}));

const gridOptions: GridOptions = {
    defaultColDef: DefaultColDef,
    enableCellChangeFlash: true,
    animateRows: true,
    pagination: true,
    paginationPageSize: 20,
    enableCellTextSelection: false,
    sideBar: DefaultSideBarDef,
    statusBar: DefaultStatusPanelDef,
    getRowId: (data) => {
        return `${data.data.clientId}`;
    },
};

const MainComponent = () => {
    const classes = useStyles();
    const {
        isDarkTheme,
    } = useSelector((state: RootState) => state.app);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [rowData] = useState<Client[]>([
            {
                clientId: "cli18874",
                firstName: "Sandra",
                lastName: "Schneider",
                annualIncome: 14500000,
                riskProfile: 3,
                residence: "Switzerland",
                currency: "CHF",
                clientType: "retail",
                portfolios: [
                    {
                        portfolioId: "cli18874_por1",
                        portfolioName: "portfolio 1",
                        restrictionStatus: "clean",
                        assets: [
                            {
                                isin: "US0024812085",
                                assetType: "equity",
                                assetName: "A+D PHARMA HOL.GDR REGS",
                                location: "US",
                                quantity: 200,
                                currency: "USD",
                                valuePerAsset: 140000,
                                capitalGainPerAsset: "6880",
                                associatedRiskPerAsset: 39000
                            },
                            {
                                isin: "DE0005239701",
                                assetType: "equity",
                                assetName: "BÖWE SYSTEC AG",
                                location: "DE",
                                quantity: 320,
                                currency: "EUR",
                                valuePerAsset: 67010,
                                capitalGainPerAsset: "1490",
                                associatedRiskPerAsset: 24500
                            },
                            {
                                isin: "UK3318941839",
                                assetType: "share",
                                assetName: "Whale Capital Group Renewable Ltd.",
                                location: "UK",
                                quantity: 700,
                                currency: "GBP",
                                valuePerAsset: 12800,
                                capitalGainPerAsset: "3900",
                                associatedRiskPerAsset: 7600
                            },
                            {
                                isin: "US9843321061",
                                assetType: "share",
                                assetName: "Yahoo! Inc.",
                                location: "US",
                                quantity: 400,
                                currency: "USD",
                                valuePerAsset: 47000,
                                capitalGainPerAsset: "4990",
                                associatedRiskPerAsset: 5700
                            },
                            {
                                isin: "DE000A0JC0X4",
                                assetType: "equity",
                                assetName: "YALTA AG",
                                location: "DE",
                                quantity: 150,
                                currency: "EUR",
                                valuePerAsset: 31110,
                                capitalGainPerAsset: "6090",
                                associatedRiskPerAsset: 9200
                            },
                            {
                                isin: "CH0031240127",
                                assetType: "bond",
                                assetName: "BMW Australia Finance Ltd.",
                                location: "CH",
                                quantity: 80,
                                currency: "CHF",
                                valuePerAsset: 145000,
                                capitalGainPerAsset: "25010",
                                associatedRiskPerAsset: 19700
                            }
                        ]
                    }
                ]
            },
            {
                clientId: "cli19655",
                firstName: "Julia",
                lastName: "Asper",
                annualIncome: 11500000,
                riskProfile: 4,
                residence: "Austria",
                currency: "CHF",
                clientType: "retail",
                portfolios: [
                    {
                        portfolioId: "cli19655_por1",
                        portfolioName: "portfolio 1",
                        restrictionStatus: "clean",
                        assets: [
                            {
                                isin: "DE000LBB0A31",
                                assetType: "investment",
                                assetName: "Bar Index-Zertifikat auf DAX",
                                location: "DE",
                                quantity: 600,
                                currency: "EUR",
                                valuePerAsset: 14100,
                                capitalGainPerAsset: "8700",
                                associatedRiskPerAsset: 3900
                            },
                            {
                                isin: "US30303M1027",
                                assetType: "share",
                                assetName: "Facebook, Inc.",
                                location: "US",
                                quantity: 400,
                                currency: "USD",
                                valuePerAsset: 72000,
                                capitalGainPerAsset: "10500",
                                associatedRiskPerAsset: 4900
                            },
                            {
                                isin: "DE000WLB3LE9",
                                assetType: "investment",
                                assetName: "FördeRelax-Garant Zertifikat auf Deutsche B&#",
                                location: "DE",
                                quantity: 400,
                                currency: "EUR",
                                valuePerAsset: 72000,
                                capitalGainPerAsset: "10500",
                                associatedRiskPerAsset: 4900
                            }
                        ]
                    }
                ]
            },
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
    );

    const getColumnDefs = useMemo((): (ColDef | ColGroupDef)[] => {
        return [
            {
                headerName: 'Client Name',
                field: 'clientId',
                sortingOrder:(['asc', 'desc']),
                minWidth: 145,
                valueGetter: (params: ValueGetterParams) => {
                    if (params.data) {
                        return `${params.data.firstName ?? ''} ${params.data.lastName ?? ''}`;
                    } else
                        return '';
                },
            },
            {
                headerName: 'Risk Profile',
                field: 'riskProfile',
                sortingOrder:(['asc', 'desc']),
                minWidth: 80,
            },
            {
                headerName: 'Aggregated Net Worth ',
                field: 'clientId',
                sortingOrder:(['asc', 'desc']),
                type: 'numericColumn',
                minWidth: 230,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateValues(params, 'netWorth')
                },
                valueFormatter: (params: any) => valueFormatter(params),
            },
            {
                headerName: 'Aggregated Restriction Status',
                field: 'clientId',
                sortingOrder:(['asc', 'desc']),
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateRestrictionStatus(params)
                }
            },
            {
                headerName: 'Aggregated Capital Gain',
                field: 'clientId',
                sortingOrder:(['asc', 'desc']),
                type: 'numericColumn',
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateValues(params, 'capitalGain')
                },
                valueFormatter: (params: any) => valueFormatter(params),
            },
        ];
    }, []);

    const onGridReady = (params: GridReadyEvent) => {
        setGridApi(params.api);
    };

    /**
     * Filters the grid data based on the passed value
     * @param value
     */
    const onSearchBoxChange = (value: string) => {
        gridApi?.setQuickFilter(value);
    };

    useEffect(() => {
        if (rowData) {
            rowData.sort(function (a, b) {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
                return 0;
            });
        }
    }, [rowData])

    return (<Paper elevation={3} className={clsx(getGridTheme(isDarkTheme), classes.root)}>
        <div style={{display: 'flex', height: '4em', justifyContent: 'flex-end', alignItems: 'center'}}>
            <SearchBox onChange={onSearchBoxChange}/>
        </div>
        <Grid item className={clsx(getGridTheme(isDarkTheme), classes.grid)}>
            <AgGridReact gridOptions={gridOptions}
                         onGridReady={onGridReady}
                         columnDefs={getColumnDefs}
                         serverSideInfiniteScroll={true}
                         rowData={rowData ?? []}/>
        </Grid>
    </Paper>);

};

export default MainComponent;
