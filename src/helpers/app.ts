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