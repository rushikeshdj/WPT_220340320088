
const express = require('express');
const app = express();

app.listen(8081, function () {
	console.log("server listening at port 8081...");
});

app.use(express.static('abc1'));

let db = {
	host: 'localhost',
	user: 'root',
	password: '3981',
	database: 'exam',
	port: 3306
};

let mysql = require('mysql2');
let con = mysql.createConnection(db);

app.get('/insert', function (req, res) {

	let bookid = req.query.bookid;
	let bookname = req.query.bookname;
	let price = req.query.price;
	var result = {
		status: false,

	};

	con.query('insert into book values (?,?,?)', [bookid, bookname, price],
		(err, row) => {
			if (err) {
				console.log("Error " + err)

			}
			else {
				if (row.affectedRows > 0) {
					result.status = true;
					console.log(result.status)
				}
			}

			res.send(result);
		});


});




