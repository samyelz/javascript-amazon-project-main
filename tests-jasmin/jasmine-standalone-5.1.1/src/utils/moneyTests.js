import { formatMoney } from '../../../../scripts/utils/money.js';

describe('Test suite : formatMoney', () => {
    it('converts cents itnto dollars', () => {
        expect(formatMoney(2085)).toEqual('20.85');
    });

    it('works with 0', () => {
        expect(formatMoney(0)).toEqual('0.00');
    });

    it('rounds to the nearest cent', () => {
        expect(formatMoney(2000.5)).toEqual('20.01');
    });
});
