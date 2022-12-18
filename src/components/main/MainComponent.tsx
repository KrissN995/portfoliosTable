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
    getGridTheme,
    valueCellRenderer,
} from "../../helpers/agGrid";
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices/rootSlice";
import {AgGridReact} from "ag-grid-react";
import {
    ColDef,
    ColGroupDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
    ICellRendererParams,
    ValueGetterParams,
} from "ag-grid-community";
import SearchBox from "../shared/SearchBox";
import {fetchClientData} from "../../store/thunks/clientThunk";
import {useAppDispatch} from "../../store/store";
import {fetchCurrencyExchangeRates} from "../../store/thunks/currencyThunk";

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
    const dispatch = useAppDispatch();
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const {clientData} = useSelector((state: RootState) => state.client);
    const {exchangeRates} = useSelector((state: RootState) => state.currency);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [rowData, setRowData] = useState<Client[]>([]);

    const getColumnDefs = useMemo((): (ColDef | ColGroupDef)[] => {
        return [
            {
                headerName: 'Client Name',
                field: 'clientId',
                sortingOrder: (['asc', 'desc']),
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
                sortingOrder: (['asc', 'desc']),
                minWidth: 80,
            },
            {
                headerName: 'Aggregated Net Worth',
                field: 'clientId',
                sortingOrder: (['asc', 'desc']),
                type: 'numericColumn',
                minWidth: 230,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateValues(params, 'netWorth', exchangeRates)
                },
                cellRenderer: (params: ICellRendererParams) => valueCellRenderer(params)
            },
            {
                headerName: 'Aggregated Restriction Status',
                field: 'clientId',
                sortingOrder: (['asc', 'desc']),
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateRestrictionStatus(params)
                }
            },
            {
                headerName: 'Aggregated Capital Gain',
                field: 'clientId',
                sortingOrder: (['asc', 'desc']),
                type: 'numericColumn',
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateValues(params, 'capitalGain', exchangeRates)
                },
                cellRenderer: (params: ICellRendererParams) => valueCellRenderer(params)
            },
        ];
    }, [exchangeRates]);

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
        dispatch(fetchClientData());
        dispatch(fetchCurrencyExchangeRates('CHF'));
    }, [dispatch]);

    useEffect(() => {
        if (clientData && exchangeRates) {
            console.log(exchangeRates);
            setRowData(clientData.slice().sort(function (a, b) {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
                return 0;
            }));
        }
    }, [clientData, exchangeRates])

    return (<Paper elevation={3} className={clsx(getGridTheme(isDarkTheme), classes.root)}>
        <div style={{display: 'flex', height: '4em', justifyContent: 'flex-end', alignItems: 'center'}}>
            <SearchBox onChange={onSearchBoxChange}/>
        </div>
        <Grid item className={clsx(getGridTheme(isDarkTheme), classes.grid)}>
            <AgGridReact gridOptions={gridOptions}
                         onGridReady={onGridReady}
                         columnDefs={getColumnDefs}
                         serverSideInfiniteScroll={true}
                         rowData={rowData}/>
        </Grid>
    </Paper>);

};

export default MainComponent;
