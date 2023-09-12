const lib = require('../src/lib/lib');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Fedex');
        //expect(result).toMatch(/Fedex/);
        expect(result).toContain('Fedex');
    });
});

describe('getCurrencies', () => {
    const expected = ['USD', 'AUD', 'EUR'];
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});

describe('getProduct', () => {
    it('should return the product with the given ID', () => {
        const result = lib.getProduct(1);
        //expect(result).toEqual({ id: 1, price: 10 });
        //expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach((x) => expect(() => lib.registerUser(x)).toThrow());
    });

    it('should return a user object if valid username is provided', () => {
        const result = lib.registerUser('fedex');
        expect(result).toMatchObject({ userName: 'fedex' });
        expect(result).toHaveProperty('id');
        expect(result.id).toBeGreaterThan(0);
    });
});
