// es 6 classes - allows to add constructors 

class Users {
    constructor () {
        // in a constructor this refers to the instance of it, not to the class itself
        this.users= [];
    }

    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        let user = this.users.filter(user => user.id == id)[0];;
        
        if(user) {
            // create a new array without the id of the user 
            this.users =this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser (id) {
        return this.users.filter(user => user.id == id)[0];
    }

    getUserList (room) {
        // returns the user only if its inside the room
        let users = this.users.filter(user => user.room === room);
        // returns the users name
        let namesArray = users.map(user => user.name);

        return namesArray;
    }
};




module.exports = {
    Users
};