import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Alert,
    Paper, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Theme,
} from '@mui/material';
import {fetchClientData} from "../../store/thunks/clientThunk";
import {useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices/rootSlice";
import {ClientExtended, Order} from "../../models/appModels";
import {stableSort} from '../../helpers/app';
import clsx from "clsx";
import {getGridTheme} from "../../helpers/agGrid";
import SearchBox from "../shared/SearchBox";
import makeStyles from "@mui/styles/makeStyles";
import {aggregateRestrictionStatus, aggregateValues} from "../../helpers/calculations";
import Row from "./ClientRowComponent";
import {fetchCurrencyExchangeRates} from "../../store/thunks/currencyThunk";
import {setErrorMessage} from "../../store/slices/clientSlice";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    snackbar: {
        width: '100%',
        marginTop: '8em',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const CollapsibleTable = () => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const {clientData, errorMessage} = useSelector((state: RootState) => state.client);
    const {exchangeRates} = useSelector((state: RootState) => state.currency);
    const [rowData, setRowData] = useState<ClientExtended[]>([]);
    const [sortDirection, setSortDirection] = useState<Order>('asc');
    const [sortColumn, setSortColumn] = useState<string>('clientName');

    /**
     * Sets the sort direction and the column based on which will be sorted
     * @param column
     */
    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    }

    /**
     * Filters the grid data based on the passed value for the client name
     * @param value
     */
    const onSearchBoxChange = (value: string) => {
        if (value !== '') {
            setRowData(rowData.filter(x => x.firstName.toLowerCase().includes(value.toLowerCase()) || x.lastName.toLowerCase().includes(value.toLowerCase())));
        } else {
            setRowData(clientData?.slice()?.sort(function (a, b) {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
                return 0;
            }) ?? []);
        }
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
            const extendedData: ClientExtended[] = clientData.map(a => ({
                ...a,
                clientAggregatedNetWorth: aggregateValues(a, 'netWorth', exchangeRates),
                clientAggregatedCapitalGain: aggregateValues(a, 'capitalGain', exchangeRates),
                clientAggregatedRestrictionStatus: aggregateRestrictionStatus(a)
            }));
            console.log(exchangeRates);
            setRowData(extendedData.slice().sort(function (a, b) {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
                return 0;
            }));
        }
    }, [clientData, exchangeRates]);


    return (
        <Paper elevation={3} className={clsx(getGridTheme(isDarkTheme), classes.root)}>
            <div style={{
                display: 'flex',
                height: '4em',
                justifyContent: 'flex-end',
                alignItems: 'center',
                margin: '0.5em'
            }}>
                <SearchBox onChange={onSearchBoxChange}/>
            </div>
            <TableContainer component={Paper} sx={{paddingTop: '1em'}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell aria-label={'clientNameHeader'}>
                                <TableSortLabel
                                    active={sortColumn === 'firstName'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('firstName')}
                                >
                                    Client Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right" aria-label={'riskProfileHeader'}>
                                <TableSortLabel
                                    active={sortColumn === 'riskProfile'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('riskProfile')}
                                >
                                    Risk Profile
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right" aria-label={'clientAggregatedNetWorthHeader'}>
                                <TableSortLabel
                                    active={sortColumn === 'clientAggregatedNetWorth'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('clientAggregatedNetWorth')}
                                >
                                    Aggregated Net Worth
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right" aria-label={'clientAggregatedRestrictionStatusHeader'}>
                                <TableSortLabel
                                    active={sortColumn === 'clientAggregatedRestrictionStatus'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('clientAggregatedRestrictionStatus')}
                                >
                                    Aggregated Restriction Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right" aria-label={'clientAggregatedCapitalGainHeader'}>
                                <TableSortLabel
                                    active={sortColumn === 'clientAggregatedCapitalGain'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('clientAggregatedCapitalGain')}
                                >
                                    Aggregated Capital Gain
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(rowData ?? [], sortDirection, sortColumn)?.map((row: ClientExtended) => (
                            <Row key={row.clientId} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
        </Paper>
    );
}
