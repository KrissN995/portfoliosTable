import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    IconButton,
    Theme,
    Tooltip,
    Typography,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import React, {useEffect, useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Client, Portfolio} from "../../models/appModels";
import {capitalizeLetters} from "../../helpers/app";
import PortfolioCard from "./PortfolioCard";

interface ExpandedPortfoliosProps {
    [key: string]: boolean;
}

interface PortfoliosComponentProps {
    selectedClient: Client;
}

const PortfoliosComponent = ({selectedClient}: PortfoliosComponentProps) => {
    const theme: Theme = useTheme();
    const [localPortfolios, setLocalPortfolios] = useState<Portfolio[]>();
    const [portfoliosExpandedState, setPortfoliosExpandedState] = useState<ExpandedPortfoliosProps>({});

    /**
     * Sets the portfolios for the selected client
     */
    useEffect(() => {
        if (selectedClient) {
            setLocalPortfolios(selectedClient.portfolios);

            let obj: ExpandedPortfoliosProps = {};
            selectedClient.portfolios.forEach(portfolio => {
                obj = {...obj, [`${portfolio.portfolioId}`]: false};
            });

            setPortfoliosExpandedState(obj);
        }
    }, [selectedClient]);


    /**
     * Event that is triggered when we expand or collapse the portfolio accordion card
     * @param expanded
     * @param portfolioId
     */
    const handlePortfolioExpandedChange = (expanded: boolean, portfolioId: string) => {
        const currentPortfoliosExpandedState = {...portfoliosExpandedState};
        currentPortfoliosExpandedState[`${portfolioId}`] = expanded;
        setPortfoliosExpandedState(currentPortfoliosExpandedState);
    };


    return (
        <>
            {localPortfolios?.map((portfolio: Portfolio) => (
                <Accordion
                    key={`card-${portfolio.portfolioId}`}
                    expanded={portfoliosExpandedState[`${portfolio.portfolioId}`]}
                    onChange={(event, expanded: boolean) => handlePortfolioExpandedChange(expanded, portfolio.portfolioId)}
                    sx={{
                        'width': '100%',
                        'flexDirection': 'column',
                        'borderRadius': 0,
                        'backgroundColor': theme.palette.background.paper,
                        'border': '1px solid gray',
                        '& .MuiPaper-root .MuiPaper-elevation .MuiPaper-rounded .MuiPaper-elevation1 .MuiAccordion-root .MuiAccordion-rounded .MuiAccordion-gutters .mui-1maymqh-MuiPaper-root-MuiAccordion-root': {
                            backgroundColor: theme.palette.background.paper
                        }
                    }}
                >
                    <AccordionSummary
                        sx={{
                            'cursor': 'pointer',
                            'width': '100%',
                            'minHeight': '68px !important',
                            'paddingTop': 0,
                            'backgroundColor': theme.palette.background.paper,
                            '& .MuiPaper-root .MuiPaper-elevation .MuiPaper-rounded .MuiPaper-elevation1 .MuiAccordion-root .MuiAccordion-rounded .MuiAccordion-gutters .mui-1maymqh-MuiPaper-root-MuiAccordion-root': {
                                backgroundColor: theme.palette.background.paper
                            }
                        }}
                        expandIcon={
                            <Tooltip title={'Hide / Show'}>
                                <IconButton>
                                    <ExpandMoreIcon
                                        sx={{pointerEvents: 'auto', cursor: 'pointer'}}/>
                                </IconButton>
                            </Tooltip>
                        }
                    >
                        <Typography sx={{fontWeight: 700}}
                                    variant={'body1'}>{`${capitalizeLetters(portfolio.portfolioName)} :: ${capitalizeLetters(portfolio.restrictionStatus)}`}
                        </Typography>
                    </AccordionSummary>
                    {(portfolio && portfoliosExpandedState[`${portfolio.portfolioId}`]) && <AccordionDetails
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            width: '100%', padding: '0.1em', display: 'flex', height: '100%'
                        }}>
                        <Grid container>
                            <PortfolioCard
                                portfolio={portfolio}
                                expanded={portfoliosExpandedState[`${portfolio.portfolioId}`]}/>

                        </Grid>
                    </AccordionDetails>}
                </Accordion>
            ))}
        </>
    );
};

export default PortfoliosComponent;
