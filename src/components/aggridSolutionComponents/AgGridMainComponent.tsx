import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, Grid, Paper, Snackbar, Theme, useTheme} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Client} from '../../models/appModels';
import clsx from 'clsx';
import {
    aggregateRestrictionStatus,
    aggregateValues,
    DefaultColDef,
    DefaultSideBarDef,
    DefaultStatusPanelDef,
    getGridTheme,
    valueCellRenderer,
} from '../../helpers/agGrid';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/slices/rootSlice';
import {AgGridReact} from 'ag-grid-react';
import {
    ColDef,
    ColGroupDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
    ICellRendererParams,
    RowClickedEvent,
    ValueGetterParams,
} from 'ag-grid-community';
import SearchBox from '../shared/SearchBox';
import {fetchClientData} from '../../store/thunks/clientThunk';
import {useAppDispatch} from '../../store/store';
import {setClientDialogOpen, setErrorMessage, setSelectedClient} from '../../store/slices/clientSlice';
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
    snackbar: {
        width: '100%',
        marginTop: '8em',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

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
        return `${data.data.clientId}`;
    },
};

const AgGridMainComponent = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const {clientData, errorMessage} = useSelector((state: RootState) => state.client);
    const {exchangeRates} = useSelector((state: RootState) => state.currency);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [rowData, setRowData] = useState<Client[]>([]);

    /**
     * Sets the column definitions for the ag grid
     */
    const getColumnDefs = useMemo((): (ColDef | ColGroupDef)[] => {
        return [
            {
                headerName: 'Client Name',
                field: 'clientId',
                sortingOrder: (['asc', 'desc']),
                minWidth: 145,
                tooltipField: 'clientId',
                tooltipComponentParams: {color: theme.palette.background.paper},
                cellStyle: {cursor: 'pointer'},
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
                tooltipField: 'riskProfile',
                tooltipComponentParams: {color: theme.palette.background.paper},
                cellStyle: {cursor: 'pointer'},
            },
            {
                headerName: 'Aggregated Net Worth',
                field: 'clientId',
                sortingOrder: (['asc', 'desc']),
                type: 'numericColumn',
                minWidth: 230,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateValues(params, 'netWorth', exchangeRates);
                },
                cellRenderer: (params: ICellRendererParams) => valueCellRenderer(params),
                tooltipField: 'clientId',
                tooltipComponentParams: {color: theme.palette.background.paper},
                cellStyle: {cursor: 'pointer'},
            },
            {
                headerName: 'Aggregated Restriction Status',
                field: 'clientId',
                sortingOrder: (['asc', 'desc']),
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateRestrictionStatus(params);
                },
                tooltipField: 'clientId',
                tooltipComponentParams: {color: theme.palette.background.paper},
                cellStyle: {cursor: 'pointer'},
            },
            {
                headerName: 'Aggregated Capital Gain',
                field: 'clientId',
                sortingOrder: (['asc', 'desc']),
                type: 'numericColumn',
                minWidth: 120,
                valueGetter: (params: ValueGetterParams) => {
                    return aggregateValues(params, 'capitalGain', exchangeRates);
                },
                cellRenderer: (params: ICellRendererParams) => valueCellRenderer(params),
                tooltipField: 'clientId',
                tooltipComponentParams: {color: theme.palette.background.paper},
                cellStyle: {cursor: 'pointer'},
            },

        ];
    }, [exchangeRates, theme]);

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
    const onSearchBoxChange = (value: string) => {
        gridApi?.setQuickFilter(value);
    };

    /**
     * Handles when we select a row to open the dilaog with additional info cause row grouping is only allowed in Ag Grid enterprisee
     * @param rowSelected
     */
    const handleRowSelected = (rowSelected: RowClickedEvent) => {
        if (!rowSelected.data)
            return;

        dispatch(setSelectedClient(rowSelected.data as Client));
        dispatch(setClientDialogOpen(true));
    };

    /**
     * Closes the error message snackbar
     */
    const handleClose = () => {
        dispatch(setErrorMessage(''));
    };

    /**
     * Fetches the data and the currency exchange rates
     */
    useEffect(() => {
        dispatch(fetchClientData());
        dispatch(fetchCurrencyExchangeRates('CHF'));
    }, [dispatch]);

    /**
     * Sets the row data for the ag grid
     */
    useEffect(() => {
        if (clientData && exchangeRates) {
            //console.log(exchangeRates);
            setRowData(clientData.slice().sort(function (a, b) {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
                return 0;
            }));
        }
    }, [clientData, exchangeRates]);

    return (<Paper elevation={3} className={clsx(getGridTheme(isDarkTheme), classes.root)}>
        <div style={{display: 'flex', height: '4em', justifyContent: 'flex-end', alignItems: 'center'}}>
            <SearchBox onChange={onSearchBoxChange}/>
        </div>
        <Grid item className={clsx(getGridTheme(isDarkTheme), classes.grid)} aria-label={'agGrid component'}>
            <AgGridReact gridOptions={gridOptions}
                         onGridReady={onGridReady}
                         columnDefs={getColumnDefs}
                         onRowClicked={handleRowSelected}
                         tooltipShowDelay={0}
                         tooltipHideDelay={2000}
                         rowData={rowData}/>
        </Grid>
        {errorMessage && errorMessage.length > 0 &&
            <div className={classes.snackbar}>
                <Snackbar open={errorMessage?.length > 0} autoHideDuration={1500} onClose={handleClose}
                          anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleClose} severity="error">
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </div>
        }
    </Paper>);

};

export default AgGridMainComponent;
