import '@testing-library/react-hooks';
import {render, screen} from '@testing-library/react';
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "../../../theme/theme";
import store from "../../../store/store";
import {Provider} from 'react-redux';
import SearchBox from "../../../components/shared/SearchBox";

const onSearchBoxChange = (value: string) => {
    console.log(value);
};

test('should display the search box', () => {
    render(
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <SearchBox onChange={onSearchBoxChange}/>
            </ThemeProvider>
        </Provider>
    );
    const title = screen.getByLabelText('Search');
    expect(title).toBeInTheDocument();
});
