import {Asset, ClientExtended, Order, Portfolio} from "../../models/appModels";
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices/rootSlice";
import {useEffect, useState} from "react";
import CountryFlag from "react-country-flag";
import * as React from "react";
import {
    Collapse,
    Grid,
    IconButton,
    Paper,
    Table, TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel, Theme,
    Typography
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {capitalizeLetters, fiatNumberFormatter, stableSort} from "../../helpers/app";
import clsx from "clsx";
import {getGridTheme} from "../../helpers/agGrid";
import SearchBox from "../shared/SearchBox";
import makeStyles from "@mui/styles/makeStyles";

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

const Row = (props: { row: ClientExtended }) => {
    const {row} = props;
    const classes = useStyles();
    const {isDarkTheme} = useSelector((state: RootState) => state.app);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ClientExtended | null>(null);
    const [portfoliosExpandedState, setPortfoliosExpandedState] = useState<ExpandedPortfoliosProps>({});
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
    const [selectedInnerRows, setSelectedInnerRows] = useState<Asset[] | null>(null);
    const [sortDirection, setSortDirection] = useState<Order>('asc');
    const [sortColumn, setSortColumn] = useState<string>('assetName');

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
     * Event triggered when one of the client is expanded or collapsed and sets the client portfolios data
     * @param innerRow
     */
    const handleClick = (row: ClientExtended | null) => {
        setOpen(!open);
        setSelectedRow(row);
        let obj: ExpandedPortfoliosProps = {};
        row?.portfolios.forEach(portfolio => {
            obj = {...obj, [`${portfolio.portfolioId}`]: false};
        });

        setPortfoliosExpandedState(obj);
    };

    /**
     * Event triggered when one of the portfolios is expanded or collapsed and sets the portfolio assets data
     * @param innerRow
     */
    const handleClickInner = (innerRow: Portfolio | null) => {
        const currentPortfoliosExpandedState = {...portfoliosExpandedState};
        currentPortfoliosExpandedState[`${innerRow?.portfolioId}`] = !currentPortfoliosExpandedState[`${innerRow?.portfolioId}`];
        if (currentPortfoliosExpandedState[`${innerRow?.portfolioId}`]) {
            const extendedData: Asset[] = innerRow?.assets?.slice()?.map(a => ({
                ...a,
                assetTotalValue: (a.quantity * a.valuePerAsset) + (a.quantity * +a.capitalGainPerAsset) ?? 0,
                assetCapitalGain: a.quantity * +a.capitalGainPerAsset ?? 0,
                assetRisk: a.quantity * a.associatedRiskPerAsset
            })) ?? [];
            setSelectedInnerRows(extendedData?.slice()?.sort(function (a, b) {
                if (a.assetName.toLowerCase() < b.assetName.toLowerCase()) return -1;
                if (a.assetName.toLowerCase() > b.assetName.toLowerCase()) return 1;
                return 0;
            }) ?? []);

            setSelectedPortfolio(innerRow);
        }
        setPortfoliosExpandedState(currentPortfoliosExpandedState);
    };

    /**
     * Renderer that returns country flag icon and the country code
     * @param assetLocation
     */
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
            setSelectedInnerRows(selectedInnerRows?.slice().filter(x => x.assetName.toLowerCase().includes(value.toLowerCase()) || x.assetType.toLowerCase().includes(value.toLowerCase()) || x.location.includes(value)) ?? []);
        } else {
            const extendedData: Asset[] = selectedPortfolio?.assets?.slice()?.map(a => ({
                ...a,
                assetTotalValue: (a.quantity * a.valuePerAsset) + (a.quantity * +a.capitalGainPerAsset) ?? 0,
                assetCapitalGain: a.quantity * +a.capitalGainPerAsset ?? 0,
                assetRisk: a.quantity * a.associatedRiskPerAsset
            })) ?? [];

            setSelectedInnerRows(extendedData?.slice()?.sort(function (a, b) {
                if (a.assetName.toLowerCase() < b.assetName.toLowerCase()) return -1;
                if (a.assetName.toLowerCase() > b.assetName.toLowerCase()) return 1;
                return 0;
            }) ?? []);
        }
    };

    /**
     * Sets the state to all the child portfolios to be collapsed when it renders the component
     */
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
            <TableRow sx={{borderBottom: '1px solid'}} aria-label={'client-data-row'}>
                <TableCell component="th" scope="row">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleClick(row)}
                    >
                        {open ? <KeyboardArrowDownIcon aria-label={'up icon first btn'}/> : <KeyboardArrowRightIcon aria-label={'right icon first btn'}/>}
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
                    <Collapse in={open && selectedRow === row} timeout="auto" sx={{width: '100%'}} unmountOnExit arial-label={'portfolio inner data'}>
                        {row.portfolios.map((portfolioRow: Portfolio) => (
                            <Grid container key={`portfolio-card-${portfolioRow.portfolioId}`} sx={{paddingTop: '1em'}}>
                                <Grid item container sx={{display: 'flex', alignItems: 'center'}}>
                                    <Typography
                                        variant={'body1'}>{`${capitalizeLetters(portfolioRow.portfolioName)} :: ${capitalizeLetters(portfolioRow.restrictionStatus)}`}</Typography>
                                    <IconButton
                                        aria-label="expand inner row"
                                        key={`icon-${portfolioRow.portfolioId}`}
                                        size="small"
                                        onClick={() => handleClickInner(portfolioRow)}
                                    >
                                        {portfoliosExpandedState[`${portfolioRow.portfolioId}`] ? (
                                            <KeyboardArrowDownIcon />
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
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={sortColumn === 'assetName'}
                                                                direction={sortDirection}
                                                                onClick={() => handleSort('assetName')}
                                                            >
                                                                Asset Name
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={sortColumn === 'assetType'}
                                                                direction={sortDirection}
                                                                onClick={() => handleSort('assetType')}
                                                            >
                                                                Asset Type
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={sortColumn === 'location'}
                                                                direction={sortDirection}
                                                                onClick={() => handleSort('location')}
                                                            >
                                                                Location
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={sortColumn === 'quantity'}
                                                                direction={sortDirection}
                                                                onClick={() => handleSort('quantity')}
                                                            >
                                                                Quantity
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={sortColumn === 'assetTotalValue'}
                                                                direction={sortDirection}
                                                                onClick={() => handleSort('assetTotalValue')}
                                                            >
                                                                Total Value
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={sortColumn === 'assetCapitalGain'}
                                                                direction={sortDirection}
                                                                onClick={() => handleSort('assetCapitalGain')}
                                                            >
                                                                Capital Gain
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel
                                                                active={sortColumn === 'assetRisk'}
                                                                direction={sortDirection}
                                                                onClick={() => handleSort('assetRisk')}
                                                            >
                                                                Associated Risk
                                                            </TableSortLabel>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {stableSort(selectedInnerRows ?? [], sortDirection, sortColumn)?.map((assetRow: Asset) => (
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
                                                                {fiatNumberFormatter.format(assetRow.assetTotalValue ?? 0)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {fiatNumberFormatter.format(assetRow.assetCapitalGain ?? 0)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {fiatNumberFormatter.format(assetRow.assetRisk ?? 0)}
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

export default Row;