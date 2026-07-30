const db = require("../config/database");

const Admin = {
    login: (username, callback) => {
        const sql = "SELECT * FROM admin WHERE username = ?";
        db.query(sql, [username], callback);
    }
};

module.exports = Admin;