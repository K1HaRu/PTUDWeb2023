const ToStringCreator = require('../utils/toStringCreator');

class Account {
    constructor({
        id,
        username,
        password,
        email,
        name,
        dob,
        role,
        createdAt,
        updatedAt,
    }) {
        this.self = {
            id,
            username,
            password,
            email,
            name,
            dob,
            role,
            createdAt,
            updatedAt,
        };
    }
    withUsername(username) {
        this.self.username = username;
    }
    withPassword(password) {
        this.self.password = password;
    }
    withEmail(email) {
        this.self.email = email;
    }
    withRole(role) {
        this.self.role = role;
    }
    build() {
        return this;
    }
    static builder() {
        return new Account({});
    }

    get id() {
        return this.self.id;
    }
    get username() {
        return this.self.username;
    }
    get password() {
        return this.self.password;
    }
    get email() {
        return this.self.email;
    }
    get name() {
        return this.self.name;
    }
    get dob() {
        return this.self.dob;
    }
    get role() {
        return this.self.role;
    }
    get createdAt() {
        return this.self.createdAt;
    }
    get updatedAt() {
        return this.self.updatedAt;
    }
    set username(username) {
        this.self.username = username;
    }

    toString() {
        return new ToStringCreator(this)
            .append('id', this.id)
            .append('username', this.username)
            .append('password', this.password)
            .append('email', this.email)
            .append('name', this.name)
            .append('dob', this.dob)
            .append('role', this.role)
            .append('created_at', this.createdAt)
            .append('updated_at', this.updatedAt)
            .toString();
    }
}
module.exports = Account;