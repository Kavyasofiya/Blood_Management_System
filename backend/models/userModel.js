const db=require("../config/database");

exports.findByEmail=(email,callback)=>{

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        callback
    );

};

exports.create=(user,callback)=>{

    db.query(

        "INSERT INTO users(name,email,password) VALUES(?,?,?)",

        [
            user.name,
            user.email,
            user.password
        ],

        callback

    );

};