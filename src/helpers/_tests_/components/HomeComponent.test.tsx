import '@testing-library/react-hooks';
import {render, screen} from '@testing-library/react';
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "../../../theme/theme";
import store from "../../../store/store";
import {Provider} from 'react-redux';
import {CollapsibleTable} from "../../../components/home/HomeComponent";

test('should display the table with all the headers', () => {
    render(
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CollapsibleTable />
            </ThemeProvider>
        </Provider>
    );
    const table = screen.getByLabelText('collapsible table');
    const clientNameHeader=screen.getByLabelText('clientNameHeader');
    const riskProfileHeader=screen.getByLabelText('riskProfileHeader');
    const clientAggregatedNetWorthHeader=screen.getByLabelText('clientAggregatedNetWorthHeader');
    const clientAggregatedRestrictionStatusHeader=screen.getByLabelText('clientAggregatedRestrictionStatusHeader');
    const clientAggregatedCapitalGainHeader=screen.getByLabelText('clientAggregatedCapitalGainHeader');

    expect(table).toBeInTheDocument();
    expect(clientNameHeader).toBeInTheDocument();
    expect(riskProfileHeader).toBeInTheDocument();
    expect(clientAggregatedNetWorthHeader).toBeInTheDocument();
    expect(clientAggregatedRestrictionStatusHeader).toBeInTheDocument();
    expect(clientAggregatedCapitalGainHeader).toBeInTheDocument();
});
