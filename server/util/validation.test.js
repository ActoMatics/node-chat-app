let expect = require('expect'),
    { isRealString } = require('./validation');


describe('isRealString', () => {

    it('Should reject non-string value', () => {
        let res = isRealString(9);
        expect(res).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        let res = isRealString('      ');
        expect(res).toBe(false);
    });

    
    it('Should allow string with non-space characters', () => {
        let res = isRealString('   test'   );
        expect(res).toBe(true);
    });
});    