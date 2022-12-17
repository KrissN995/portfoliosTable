import {IconButton, InputAdornment, TextField, Theme, Tooltip, useTheme} from '@mui/material';
// import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from '@mui/icons-material/Search';
import React, {useEffect, useState} from 'react';
import {isValueEmpty} from '../../helpers/app';
import CloseIcon from '@mui/icons-material/Close';

const SearchBox = ({disabled, onChange}: { disabled?: boolean, onChange: (value: string) => void }) => {
    const theme: Theme = useTheme();
    const [value, setValue] = useState<string>('');

    /**
     * Changes the value
     */
    const onValueChange = (event: any) => {
        setValue(event.target.value);
    };

    /**
     * Clears the value
     */
    const onCancelClick = () => {
        setValue('');
    };

    /**
     * Triggers the method in the component in which is used this component to change the value
     */
    useEffect(() => {
        onChange(value);
        // eslint-disable-next-line
    }, [value]);

    return (
        <Tooltip title="Search" aria-label="Search">
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                value={value}
                sx={{width: '50%'}}
                onChange={onValueChange}
                disabled={disabled}
                InputProps={{
                    style: {fontSize: 16, backgroundColor: theme.palette.background.paper},
                    endAdornment: isValueEmpty(value) ? <SearchIcon
                            color="disabled" fontSize="medium"/> :
                        <InputAdornment position="end">
                            <IconButton onClick={onCancelClick} size="large"><CloseIcon
                                fontSize="medium"/></IconButton>
                        </InputAdornment>
                }}
            />
        </Tooltip>
    );
};

export default SearchBox;
