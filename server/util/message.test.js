let expect = require('expect'),
    {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

    it('Should generate the correct message object', () => {
        let from = 'Sarit',
            text = 'This is a cool test!',
            message = generateMessage(from, text);
        
            expect(typeof message.createdAt).toBe('number');
            expect(message).toMatchObject({from, text});
    })
});


describe('generateLocationMessage', () => {

    it('Should generate correct location object', () => {
        let from = 'Sarit - Location test',
            latitude = 20,
            longitude = 100,
            url =`https://www.google.com/maps?q=20,100`,
            message = generateLocationMessage(from, latitude, longitude);
        
            expect(typeof message.createdAt).toBe('number');
            expect(message).toMatchObject({from, url});
    });
});