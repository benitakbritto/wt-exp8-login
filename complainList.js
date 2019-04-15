var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const jsdom = require("jsdom");
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	database : '?????'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/complainList.html'));
});

app.post('/', function(request, response) {
	
		connection.query('SELECT * FROM complaints', function(error, results, fields) {
						for(i=0; i<fields.length; i++)
						{
							const dom = new JSDOM(`<body>
  												<script> var parent = document.createElement("div");
  												document.body.appendChild(parent);
  												var divArray = [document.createElement("div"),
																document.createElement("div"),
																document.createElement("div"),
																document.createElement("div"),
																document.createElement("div"),
																document.createElement("div"),
																document.createElement("div"),
																document.createElement("div"),
																document.createElement("div"),
																document.createElement("div"),];
												parent.appendChild(divArray);
												divArray[0].innerHTML = response.send(results[i].c_id);
												divArray[1].innerHTML = response.send(results[i].user_id_by);
												divArray[2].innerHTML = response.send(results[i].cc_id);
												divArray[3].innerHTML = response.send(results[i].c_description);
												divArray[4].innerHTML = response.send(results[i].complaint_date);
												divArray[5].innerHTML = response.send(results[i].complaint_allotment_date);
												divArray[6].innerHTML = response.send(results[i].complaint_completed_date);
												divArray[7].innerHTML = response.send(results[i].complaint_status);
												divArray[8].innerHTML = response.send(results[i].deleted);
												divArray[9].innerHTML = response.send(results[i].user_id_alloted_to);
  												</script>
												</body>`);
						}
						console.log("successful");
						response.end();
				});
			};			