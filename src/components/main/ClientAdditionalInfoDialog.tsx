import React, {ReactElement, Ref} from 'react';
import {TransitionProps} from "@mui/material/transitions";
import {Dialog, DialogContent, DialogTitle, IconButton, Paper, PaperProps, Slide, Typography} from "@mui/material";
import {useAppDispatch} from "../../store/store";
import {setClientDialogOpen, setSelectedClient} from "../../store/slices/clientSlice";
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices/rootSlice";

const transitionMethod = (props: TransitionProps & { children: ReactElement<any, any> }, ref: Ref<unknown>) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction="up" ref={ref} {...props} />;
};

const Transition = React.forwardRef(transitionMethod);

const PaperComponent = (props: PaperProps) => {
    return (
        <Draggable handle="#form-dialog-client-data" cancel={'[class*=\'MuiDialogContent-root\']'}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Paper {...props} />
        </Draggable>
    );
};

export const ClientAdditionalInfoDialog = () => {
    const dispatch = useAppDispatch();
    const {selectedClient, clientDialogOpen} = useSelector((state: RootState) => state.client);

    const handleClose = () => {
        dispatch(setSelectedClient(null));
        dispatch(setClientDialogOpen(false));
    };

    return (
        <Dialog open={clientDialogOpen && selectedClient !== null} TransitionComponent={Transition}
                PaperComponent={PaperComponent}
                maxWidth="lg">
            <DialogTitle sx={{
                cursor: 'move',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }} id="form-dialog-client-data">
                <Typography style={{
                    fontSize: 18,
                    fontWeight: 600
                }}>{`${selectedClient?.firstName} ${selectedClient?.lastName}`}</Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
            </DialogContent>
        </Dialog>
    );
};
