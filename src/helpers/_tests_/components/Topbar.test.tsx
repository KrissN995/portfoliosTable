import '@testing-library/react-hooks';
import {Topbar} from "../../../components/main/Topbar";
import {act, fireEvent, render, screen} from '@testing-library/react';
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "../../../theme/theme";
import store from "../../../store/store";
import {Provider} from 'react-redux';

test('should display the title', () => {
    render(
        <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <Topbar />
        </ThemeProvider>
        </Provider>
    );
    const title = screen.getByLabelText('title');
    expect(title).toBeInTheDocument();
});

test('should display menu icon', () => {
    render(
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <Topbar />
            </ThemeProvider>
        </Provider>
    );
    const menuIcon = screen.getByLabelText('open drawer');
    expect(menuIcon).toBeInTheDocument();
});

test('should display theme icon', () => {
    render(
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <Topbar />
            </ThemeProvider>
        </Provider>
    );
    const themeIcon = screen.getByLabelText('Light/Dark');
    expect(themeIcon).toBeInTheDocument();
});

test('should open and close menu when menu icon is clicked', () => {
    const { getByLabelText } = render(
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <Topbar />
            </ThemeProvider>
        </Provider>
    );
    const menuIcon = getByLabelText('open drawer');

    // Open menu
    act(() => {
        fireEvent.click(menuIcon);
    });
    const menu = getByLabelText('open drawer');
    expect(menu).toBeInTheDocument();

    // Close menu
    act(() => {
        fireEvent.click(menuIcon);
    });
    expect(menu).toBeInTheDocument();
});
