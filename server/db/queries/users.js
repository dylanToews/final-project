// db/queries/users.js

const db = require("../../configs/db.config");

const getAllUsers = () => {
	return db.query("SELECT * FROM users;").then(data => {
		return data.rows;
	});
}

const getUserByEmail = email => {
	return db.query("SELECT * FROM users WHERE email = $1;", [email]).then(data => {
		return data.rows;
	});
}

module.exports = { getAllUsers, getUserByEmail }