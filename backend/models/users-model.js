const db = require('./conn-model'),
    bcrypt = require('bcryptjs');

class User {
    constructor(id, firstname, lastname, phone, email, password, coursename) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.coursename = coursename;
    }

    async checkPassword(hashedPassword) {
        //syntact: bcrypt.comapresynce(part one, part two)
        //first argument is what user puts in form, second is hashed password. Returns true or false
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async getUserByEmail() {
        try {
            const userData = await db.one(`
            select id, firstname, lastname, phone, password, coursename
                from users
            where email = $1`, 
            [this.email]);
            return userData;
        } catch (err) {
            return err.message;
        }
    }

    async save() {
        try {
            const response = await db.one(
                `insert into users
                    (firstname, lastname, phone, email, password, coursename)
                values
                    ($1, $2, $3, $4, $5, $6)
                returning id
                `, [this.firstname, this.lastname, this.phone, this.email, this.password, this.coursename]);
            console.log('user was created with id:', response.id);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getAll() {
        try {
            let response = await db.any(`select * from users`);
            return response;
        } catch(err) {
            return err.message
        }
    }


    async checkIfCreated() {
        try {
            const response = await db.one(`SELECT email FROM users WHERE email =$1`, [this.email]);
            return response;
        } catch(err) {
            return err.message
        }
    }

    async getUserInfo() {
        try {
            const userData = await db.one(`
            select id, firstname, lastname, phone, email, password, coursename
                from users
            where id = $1`, 
            [this.id]);
            return userData;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = User;