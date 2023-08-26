
function clicked(event) {
    event.preventDefault();

    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "user_schema"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //Insert a record in the "customers" table:
        var sql = "INSERT INTO users (username, password) VALUES ('"+username.value+"', '"+password.value+"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
}

submit = document.getElementById("submitButton");
username = document.getElementById("inputUser");
password = document.getElementById("inputPassword");
