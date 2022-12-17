export const getBrowserLocales = (options = {}): string[] => {
    const defaultOptions = {
        languageCodeOnly: false
    };

    const opt = {
        ...defaultOptions,
        ...options
    };

    const browserLocales = navigator.languages === undefined ? [navigator.language] : navigator.languages;

    if (!browserLocales) {
        return [];
    }

    return browserLocales.map((locale) => {
        const trimmedLocale = locale?.trim();

        return opt.languageCodeOnly ? trimmedLocale.split(/[-_]/)[0] : trimmedLocale;
    });
};

export const getBrowserLocale = (): string => {
    const locales = getBrowserLocales();
    return locales[0];
};

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
export const fiatNumberFormatter = new Intl.NumberFormat(getBrowserLocale(), {
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