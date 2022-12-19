import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Theme, useTheme} from '@mui/material/styles';
import {
    ColDef,
    ColGroupDef,
    FirstDataRenderedEvent,
    GridApi,
    GridOptions,
    GridReadyEvent,
    ICellRendererParams,
    ValueFormatterParams,
    ValueGetterParams
} from 'ag-grid-community';
import {Grid, Typography} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import {Asset, Portfolio} from "../../models/appModels";
import {DefaultColDef, DefaultSideBarDef, DefaultStatusPanelDef, getGridTheme} from "../../helpers/agGrid";
import clsx from "clsx";
import SearchBox from "../shared/SearchBox";
import {AgGridReact} from "ag-grid-react";
import makeStyles from "@mui/styles/makeStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices/rootSlice";
import {capitalizeLetters, fiatNumberFormatter} from "../../helpers/app";
import CountryFlag from "react-country-flag";

const useStyles = makeStyles((theme: Theme) => ({
    summaryGrid: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
}));

interface PortfolioCardProps {
    portfolio: Portfolio
    expanded: boolean;
}

const gridOptions: GridOptions = {
    defaultColDef: DefaultColDef,
    rowSelection: 'single',
    animateRows: true,
    pagination: true,
    paginationPageSize: 20,
    enableCellTextSelection: true,
    sideBar: DefaultSideBarDef,
    statusBar: DefaultStatusPanelDef,
    getRowId: (data) => {
        return `${data.data.assetName}`;
    },
};
const PortfolioCard = ({portfolio, expanded}: PortfolioCardProps) => {
    const theme: Theme = useTheme();
    const classes = useStyles();
    const [gridApi, setGridApi] = useState<GridApi>();
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const [assets, setAssets] = useState<Asset[]>([]);
    const memoAssets = useMemo(() => assets, [assets]);

    /**
     * Cell renderer for displaying flag of the country and short name
     * @param params
     */
    const flagCellRenderer = (params: ICellRendererParams) => {
        if (params && params.value) {
            return <div>
                <CountryFlag countryCode={params.value}/>
                <span style={{paddingLeft:'0.5em'}}>{params.value}</span>
            </div>
        } else
            return <></>;
    }

    /**
     * Sets the column definitions for the ag grid
     */
    const getColumnDefs = useMemo((): (ColDef | ColGroupDef)[] => {
        return [
            {
                headerName: 'Asset Name',
                field: 'assetName',
                sortingOrder: (['asc', 'desc']),
                minWidth: 145,
            },
            {
                headerName: 'Asset Type',
                field: 'assetType',
                sortingOrder: (['asc', 'desc']),
                minWidth: 145,
                valueGetter: (params: ValueGetterParams) => {
                    if (params.data) {
                        return `${capitalizeLetters(params.data.assetType)}`;
                    } else
                        return '';
                },
            },
            {
                headerName: 'Location',
                field: 'location',
                sortingOrder: (['asc', 'desc']),
                minWidth: 80,
                cellRenderer: (params: ICellRendererParams) => flagCellRenderer(params)
            },
            {
                headerName: 'Quantity',
                field: 'quantity',
                type: 'numericColumn',
                sortingOrder: (['asc', 'desc']),
                minWidth: 120,
                valueFormatter: (params: ValueFormatterParams) => {
                    return fiatNumberFormatter.format(params.value)
                }
            },
            {
                headerName: 'Total Value',
                field: 'assetName',
                sortingOrder: (['asc', 'desc']),
                type: 'numericColumn',
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    if (params.data) {
                        return (params.data.quantity * params.data.valuePerAsset) + +params.data.capitalGainPerAsset;
                    } else
                        return '';
                },
                valueFormatter: (params: ValueFormatterParams) => {
                    return fiatNumberFormatter.format(params.value)
                }
            },
            {
                headerName: 'Capital Gain',
                field: 'capitalGainPerAsset',
                type: 'numericColumn',
                sortingOrder: (['asc', 'desc']),
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    if (params.data) {
                        return +params.data.capitalGainPerAsset * params.data.quantity;
                    } else
                        return '';
                },
                valueFormatter: (params: ValueFormatterParams) => {
                    return fiatNumberFormatter.format(params.value)
                }
            },
            {
                headerName: 'Associated Risk',
                field: 'associatedRiskPerAsset',
                type: 'numericColumn',
                sortingOrder: (['asc', 'desc']),
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    if (params.data) {
                        return +params.data.associatedRiskPerAsset * params.data.quantity;
                    } else
                        return '';
                },
                valueFormatter: (params: ValueFormatterParams) => {
                    return fiatNumberFormatter.format(params.value)
                }
            },
        ];
    }, []);

    /**
     * Sets the gridApi
     * @param params
     */
    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
    }, []);

    /**
     * Filters the grid data based on the passed value
     * @param value
     */
    const onSearchBoxChange = useCallback((value: string) => {
        if (gridApi) {
            gridApi.setQuickFilter(value);
        } else
            return;
    }, [gridApi]);

    const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
        if (gridApi) {
            gridApi.sizeColumnsToFit();
        } else
            return;
    }, [gridApi]);

    useEffect(() => {
        if (!expanded)
            return;

        setAssets(portfolio.assets.slice().sort(function (a, b) {
            if (a.assetName.toLowerCase() < b.assetName.toLowerCase()) return -1;
            if (a.assetName.toLowerCase() > b.assetName.toLowerCase()) return 1;
            return 0;
        }))
    }, [expanded, portfolio])

    return memoAssets ? <>
        <div style={{
            display: 'flex',
            height: '4em',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: '0.5em'
        }}>
            <SearchBox onChange={onSearchBoxChange}/>
        </div>
        <Grid container sx={{margin: '0.5em', height: '300px', backgroundColor: theme.palette.background.paper}}>

            <div className={clsx(getGridTheme(isDarkTheme), classes.summaryGrid)} style={{
                flex: 1,
                overflow: 'hidden',
                display: 'grid',
            }}>
                <AgGridReact gridOptions={gridOptions}
                             onGridReady={onGridReady}
                             columnDefs={getColumnDefs}
                             rowData={assets}
                             onFirstDataRendered={onFirstDataRendered}/>
            </div>
        </Grid>
    </> : <Grid item container style={{display: 'flex', flexDirection: 'row', paddingLeft: '0.5em'}}>
        <WarningIcon/>
        <Typography variant="subtitle1" style={{paddingLeft: '0.5em'}}>No available assets</Typography>
    </Grid>;
};

export default React.memo(PortfolioCard);
