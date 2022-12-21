import {isValueEmpty, capitalizeLetters, fiatNumberFormatter, stableSort} from '../app';

test('isValueEmpty_should_return_false', () => {
    const result = isValueEmpty('Ivan');
    expect(result).toBeFalsy();
});

test('capitalizeLetters_should_return_Capital_letter', () => {
    const result = capitalizeLetters('capital letter');
    expect(result).toBe('Capital letter');
});

test('fiatNumberFormatter_should_return_1,200.24', () => {
    const result = fiatNumberFormatter.format(1200.2411);
    expect(result).toBe('1,200.24');
});

test('stableSort_should_return_arrayDesc', () => {
    const beforeSort = [{"age": 12, "name": "Alex"}, {"age": 23, "name": "Sara"}]
    const afterSort = [{"age": 23, "name": "Sara"}, {"age": 12, "name": "Alex"}]


    const result = stableSort(beforeSort, 'desc', 'name');
    expect(result).toMatchObject(afterSort);
});
