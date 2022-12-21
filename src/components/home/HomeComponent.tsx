import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Collapse,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Theme,
    Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {fetchClientData} from "../../store/thunks/clientThunk";
import {useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices/rootSlice";
import {Asset, Client, Portfolio} from "../../models/appModels";
import {capitalizeLetters, fiatNumberFormatter} from '../../helpers/app';
import CountryFlag from "react-country-flag";
import clsx from "clsx";
import {getGridTheme} from "../../helpers/agGrid";
import SearchBox from "../shared/SearchBox";
import makeStyles from "@mui/styles/makeStyles";
import {aggregateRestrictionStatus, aggregateValues} from "../../helpers/calculations";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
}));

interface ExpandedPortfoliosProps {
    [key: string]: boolean;
}

const Row = (props: { row: Client }) => {
    const {row} = props;
    const classes = useStyles();
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Client | null>(null);
    const [portfoliosExpandedState, setPortfoliosExpandedState] = useState<ExpandedPortfoliosProps>({});
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
    const [selectedInnerRows, setSelectedInnerRows] = useState<Asset[] | null>(null);

    const handleClick = (row: Client | null) => {
        setOpen(!open);
        setSelectedRow(row);
    };

    const handleClickInner = (innerRow: Portfolio | null) => {
        const currentPortfoliosExpandedState = {...portfoliosExpandedState};
        currentPortfoliosExpandedState[`${innerRow?.portfolioId}`] = !currentPortfoliosExpandedState[`${innerRow?.portfolioId}`];
        if (currentPortfoliosExpandedState[`${innerRow?.portfolioId}`]) {
            setSelectedInnerRows(innerRow?.assets ?? []);
            setSelectedPortfolio(innerRow);
        }
        setPortfoliosExpandedState(currentPortfoliosExpandedState);
    };

    const flagCellRenderer = (assetLocation: string) => {
        if (assetLocation !== '') {
            return <div>
                <CountryFlag countryCode={assetLocation}/>
                <span style={{paddingLeft: '0.5em'}}>{assetLocation}</span>
            </div>
        } else
            return <></>;
    }

    /**
     * Filters the grid data based on the passed value for the client name
     * @param value
     */
    const onSearchBoxChange = (value: string) => {
        if (value !== '') {
            setSelectedInnerRows(selectedInnerRows?.filter(x => x.assetName.toLowerCase().includes(value.toLowerCase()) || x.assetType.toLowerCase().includes(value.toLowerCase()) || x.location.includes(value)) ?? []);
        } else {
            setSelectedInnerRows(selectedPortfolio?.assets?.slice()?.sort(function (a, b) {
                if (a.assetName.toLowerCase() < b.assetName.toLowerCase()) return -1;
                if (a.assetName.toLowerCase() > b.assetName.toLowerCase()) return 1;
                return 0;
            }) ?? []);
        }
    };

    useEffect(() => {
        if (row) {

            let obj: ExpandedPortfoliosProps = {};
            row.portfolios.forEach(portfolio => {
                obj = {...obj, [`${portfolio.portfolioId}`]: false};
            });

            setPortfoliosExpandedState(obj);
        }
    }, [row]);


    return (
        <React.Fragment>
            <TableRow sx={{borderBottom: '1px solid'}}>
                <TableCell component="th" scope="row">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleClick(row)}
                    >
                        {open ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                    </IconButton>{`${row.firstName ?? ''} ${row.lastName ?? ''}`}
                </TableCell>
                <TableCell align="right">{row.riskProfile}</TableCell>
                <TableCell
                    align="right">{`${fiatNumberFormatter.format(row.clientAggregatedNetWorth ?? 0)} ${row.currency}`}</TableCell>
                <TableCell align="right">{row.clientAggregatedRestrictionStatus}</TableCell>
                <TableCell
                    align="right">{`${fiatNumberFormatter.format(row.clientAggregatedCapitalGain ?? 0)} ${row.currency}`}</TableCell>
            </TableRow>
            <TableRow sx={{width: '100%'}}>
                <TableCell sx={{paddingBottom: 0, paddingTop: 0, width: '100%'}} colSpan={7}>
                    <Collapse in={open && selectedRow === row} timeout="auto" sx={{width: '100%'}} unmountOnExit>
                        {row.portfolios.map((portfolioRow: Portfolio) => (
                            <Grid container key={`portfolio-card-${portfolioRow.portfolioId}`} sx={{paddingTop: '1em'}}>
                                <Grid item container sx={{display: 'flex', alignItems: 'center'}}>
                                    <Typography
                                        variant={'body1'}>{`${capitalizeLetters(portfolioRow.portfolioName)} :: ${capitalizeLetters(portfolioRow.restrictionStatus)}`}</Typography>
                                    <IconButton
                                        aria-label="expand row"
                                        key={`icon-${portfolioRow.portfolioId}`}
                                        size="small"
                                        onClick={() => handleClickInner(portfolioRow)}
                                    >
                                        {portfoliosExpandedState[`${portfolioRow.portfolioId}`] ? (
                                            <KeyboardArrowDownIcon/>
                                        ) : (
                                            <KeyboardArrowRightIcon/>
                                        )}
                                    </IconButton>
                                </Grid>
                                <Collapse in={portfoliosExpandedState[`${portfolioRow.portfolioId}`]} timeout="auto"
                                          sx={{width: '100%'}} unmountOnExit>
                                    {portfoliosExpandedState[`${portfolioRow.portfolioId}`] ? (
                                        <Paper elevation={2} className={clsx(getGridTheme(isDarkTheme), classes.root)}>
                                            <div style={{
                                                display: 'flex',
                                                height: '4em',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                margin: '0.5em'
                                            }}>
                                                <SearchBox onChange={onSearchBoxChange}/>
                                            </div>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Asset Name</TableCell>
                                                        <TableCell>Asset Type</TableCell>
                                                        <TableCell>Location</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                        <TableCell>Total Value</TableCell>
                                                        <TableCell>Capital Gain</TableCell>
                                                        <TableCell>Associated Risk</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {selectedInnerRows?.map((assetRow: Asset) => (
                                                        <TableRow sx={{borderBottom: '1px solid'}}
                                                                  key={`assetRow-card-${assetRow.assetName}-${portfolioRow.portfolioId}`}>
                                                            <TableCell>
                                                                {assetRow.assetName}
                                                            </TableCell>
                                                            <TableCell>
                                                                {capitalizeLetters(assetRow.assetType)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {flagCellRenderer(assetRow.location ?? '')}
                                                            </TableCell>
                                                            <TableCell>
                                                                {fiatNumberFormatter.format(assetRow.quantity)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {fiatNumberFormatter.format((assetRow.quantity * assetRow.valuePerAsset) + (assetRow.quantity * +assetRow.capitalGainPerAsset))}
                                                            </TableCell>
                                                            <TableCell>
                                                                {fiatNumberFormatter.format(assetRow.quantity * +assetRow.capitalGainPerAsset)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {fiatNumberFormatter.format(assetRow.quantity * assetRow.associatedRiskPerAsset)}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Paper>) : null}
                                </Collapse>
                            </Grid>))}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
type Order = 'asc' | 'desc';
export const CollapsibleTable = () => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const {clientData} = useSelector((state: RootState) => state.client);
    const {exchangeRates} = useSelector((state: RootState) => state.currency);
    const [rowData, setRowData] = useState<Client[]>([]);
    const [sortDirection, setSortDirection] = useState<Order>('asc');
    const [sortColumn, setSortColumn] = useState<string>('clientName');

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
     * Fetches the data and the currency exchange rates
     */
    useEffect(() => {
        dispatch(fetchClientData());
        // dispatch(fetchCurrencyExchangeRates('CHF'));
    }, [dispatch]);

    /**
     * Sets the row data for the ag grid
     */

    useEffect(() => {
        if (clientData) {
            const extendedData = clientData.map(a => ({
                ...a,
                clientAggregatedNetWorth: aggregateValues(a, 'netWorth', exchangeRates),
                clientAggregatedCapitalGain: aggregateValues(a, 'capitalGain', exchangeRates),
                clientAggregatedRestrictionStatus: aggregateRestrictionStatus(a)
            }));
            //console.log(exchangeRates);
            setRowData(extendedData.slice().sort(function (a, b) {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
                return 0;
            }));
        }
    }, [clientData, exchangeRates]);

    useEffect(() => {
        if (rowData) {
            rowData.sort((a, b) => {
                if (sortDirection === 'asc') {
                    switch (sortColumn) {
                        case 'clientName':
                            return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1;
                        case 'riskProfile':
                            return a.riskProfile < b.riskProfile ? 1 : -1;
                        case 'netWorth': {
                            if (a.clientAggregatedNetWorth && b.clientAggregatedNetWorth) {
                                return a.clientAggregatedNetWorth < b.clientAggregatedNetWorth ? 1 : -1;
                            } else {
                                return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1;
                            }
                        }

                        case 'restrictionStatus': {
                            if (a.clientAggregatedRestrictionStatus && b.clientAggregatedRestrictionStatus) {
                                return a.clientAggregatedRestrictionStatus < b.clientAggregatedRestrictionStatus ? 1 : -1;
                            } else {
                                return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1;
                            }
                        }

                        case 'capitalGain': {
                            if (a.clientAggregatedCapitalGain && b.clientAggregatedCapitalGain) {
                                return a.clientAggregatedCapitalGain < b.clientAggregatedCapitalGain ? 1 : -1;
                            } else {
                                return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1;
                            }
                        }

                        default:
                            return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1;
                    }
                } else {
                    switch (sortColumn) {
                        case 'clientName':
                            return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1;
                        case 'riskProfile':
                            return a.riskProfile > b.riskProfile ? 1 : -1;
                        case 'netWorth': {
                            if (a.clientAggregatedNetWorth && b.clientAggregatedNetWorth) {
                                return a.clientAggregatedNetWorth > b.clientAggregatedNetWorth ? 1 : -1;
                            } else {
                                return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1;
                            }
                        }

                        case 'restrictionStatus': {
                            if (a.clientAggregatedRestrictionStatus && b.clientAggregatedRestrictionStatus) {
                                return a.clientAggregatedRestrictionStatus > b.clientAggregatedRestrictionStatus ? 1 : -1;
                            } else {
                                return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1;
                            }
                        }

                        case 'capitalGain': {
                            if (a.clientAggregatedCapitalGain && b.clientAggregatedCapitalGain) {
                                return a.clientAggregatedCapitalGain > b.clientAggregatedCapitalGain ? 1 : -1;
                            } else {
                                return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1;
                            }
                        }

                        default:
                            return a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1;
                    }
                }
            })
        }

    }, [sortDirection, rowData, sortColumn])

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
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === 'clientName'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('clientName')}
                                >
                                    Client Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={sortColumn === 'riskProfile'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('riskProfile')}
                                >
                                    Risk Profile
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={sortColumn === 'netWorth'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('netWorth')}
                                >
                                    Aggregated Net Worth
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={sortColumn === 'restrictionStatus'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('restrictionStatus')}
                                >
                                    Aggregated Restriction Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={sortColumn === 'capitalGain'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('capitalGain')}
                                >
                                    Aggregated Capital Gain
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData.map((row) => (
                            <Row key={row.clientId} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
