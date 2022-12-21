import {Order} from "../models/appModels";
import {orderBy} from "lodash";

/**
 * Check if values is empty
 * @param value
 */
export const isValueEmpty = (value: any): boolean => {
    return value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value?.trim().length === 0);
};

/**
 * Fiat number formatter with maximum fraction digits of 2
 */
export const fiatNumberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
});

/**
 * Capitalize first letter
 * @param value
 */
export const capitalizeLetters = (value: string): string | undefined => {
    let newString = '';
    if (value?.match(/[A-Z][a-z]+/g)) {
        const arr = value.split(/(?=[A-Z])/);

        arr.forEach((a) => {
            newString = newString + `${a?.charAt(0).toUpperCase() + a?.slice(1)} `;
        });

        return newString;
    } else {
        return value?.charAt(0).toUpperCase() + value?.slice(1);
    }
};

export const stableSort = (array: any[], sortOrder: Order, sortBy: string) => {
    return orderBy(array, [sortBy], [sortOrder]);
}