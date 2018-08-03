const expect = require('expect'),
    { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 2,
            name: 'Sarit',
            room: 'Node JS'
        }, {
            id: 8,
            name: 'Keren',
            room: 'Music'
        }, {
            id: 48,
            name: 'Pini',
            room: 'Node JS'
        }];
    });

    it('Should add new user', () => {
        let users = new Users(),
            user = {
                id: '123',
                name: 'Sarit',
                room: 'node Js'
            };

        let resUser = users.addUser(user.id, user.name, user.room);
        //second users = the users array
        expect(users.users).toEqual([user]);
    });

    it('Should return users in Node JS room', () => {
        let userList = users.getUserList('Node JS');

        expect(userList).toEqual(['Sarit', 'Pini']);
    });
    
    it('Should return users in Music room', () => {
        let userList = users.getUserList('Music');

        expect(userList).toEqual(['Keren']);
    });

    it('Should remove user', () => {
        let userId = 100;
        let user = users.removeUser(userId);

        expect(user).toEqual(undefined);
        expect(users.users.length).toBe(3);
    });

    it('Should not remove user', () => {
        let userId = 12;
        let user = users.removeUser(userId);

        expect(user).toEqual(undefined);
        expect(users.users.length).toBe(3);
    });

    it('Should find user', () => {
        let userId = 2;
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('Should not not find  user', () => {
        let userId = 6886;
        let user = users.getUser(userId)

        expect(user).toEqual(undefined);
    });
});     