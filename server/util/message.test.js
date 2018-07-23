let expect = require('expect'),
    {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('Should generate the correct message object', () => {
        let from = 'Sarit',
            text = 'This is a cool test!',
            message = generateMessage(from, text);
        
            expect(typeof message.createdAt).toBe('number');
            expect(message).toMatchObject({from, text});
    })
});