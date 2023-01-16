// db/queries/users.js
const db = require("../../configs/db.config");

const getUserByEmail = email => {
	return db.query("SELECT * FROM users WHERE email = $1;", [email]).then(data => {
		if (data.rows[0]) {
      return data.rows[0];
    }

	});
}

module.exports = { getUserByEmail }