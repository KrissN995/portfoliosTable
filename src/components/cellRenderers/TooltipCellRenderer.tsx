import React from 'react';
import {ITooltipParams} from 'ag-grid-community';

const CustomTooltip = (props: ITooltipParams & { color: string }) => {

    if (props) {
        return (
            <div
                className="custom-tooltip"
                style={{backgroundColor: props.color || 'white'}}
            >
                <p>
                    <span>Click to show more details</span>
                </p>
            </div>
        );
    } else {
        return null;
    }
};

export default CustomTooltip;