const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapter = new fs("db.json")
const db = low(adapter);

const User = {};

User.createUser = (email, password) => {
    return db.get('users').push({ id: db.get('users').value().length + 1, password, email }).write();
}

User.loginUser = (email) => db.get('users').find({ email }).value();

module.exports = User;
