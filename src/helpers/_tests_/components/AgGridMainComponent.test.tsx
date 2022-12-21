import '@testing-library/react-hooks';
import {render, screen} from '@testing-library/react';
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "../../../theme/theme";
import store from "../../../store/store";
import {Provider} from 'react-redux';
import AgGridMainComponent from "../../../components/aggridSolutionComponents/AgGridMainComponent";

test('should display the ag grid', () => {
    render(
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <AgGridMainComponent/>
            </ThemeProvider>
        </Provider>
    );
    const agGrid = screen.getByLabelText('agGrid component');

    expect(agGrid).toBeInTheDocument();
});

