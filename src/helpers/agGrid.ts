/**
 * Sets the ag-grid theme based on the selected theme in the app
 * @param isDark
 */
import {SideBarDef} from "ag-grid-community";

export const getGridTheme = (isDark: boolean): string => {
    return isDark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
};

export const DefaultColDef = {
    filter: true,
    resizable: true,
    sortable: true,
    display: 'flex',
    flex: 1,
};

export const DefaultSideBarDef: SideBarDef = {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
                suppressPivotMode: true,
                suppressValues: true,
            },
        },
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
        },
    ],
    position: 'right',
};

export const DefaultStatusPanelDef = {
    statusPanels: [
        {
            statusPanel: 'agAggregationComponent',
            statusPanelParams: {
                // possible values are: 'count', 'sum', 'min', 'max', 'avg'
                aggFuncs: ['min', 'max', 'avg', 'sum'],
            },
        },
    ],
};