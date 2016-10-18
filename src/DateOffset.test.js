const DateOffset = require('./DateOffset');

it('should encode dates', () => {
  expect(DateOffset.toOffset(1969, 12, 31)).toBe(-1);
  expect(DateOffset.toOffset(1970, 1, 1)).toBe(0);
  expect(DateOffset.toOffset(1970, 1, 2)).toBe(1);
  expect(DateOffset.toOffset(2016, 10, 17)).toBe(17091);
});

it('should decode dates', () => {
  expect(DateOffset.toDate(0)).toEqual({year: 1970, month: 1, day: 1});
  expect(DateOffset.toDate(17091)).toEqual({year: 2016, month: 10, day: 17});
});
