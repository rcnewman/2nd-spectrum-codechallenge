var http = require('http');
var fs = require('fs');
var sio = require('socket.io');
var filter = require('./filter.js');
var Shot = require('./shot.js');
var loader = require('./loader.js').loader;

//Load Files
loader();

var port = 8000;
var server = http.createServer(function (req, res) {
	fs.readFile('index.html',function(err,page){
		res.writeHead(200,{	'Content-Type': 'text/html; charset=utf-8'});
		res.write(page);
		res.end();
	});
});
server.listen(8000,function(){
	console.log('Server up on port 8000');
});
io = sio.listen(server);


io.sockets.on('connection', function (client) {
	client.on('change',function(data){
		console.log('calculating percentage');
   	    var filtered = filter.filterShots(data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8]);
   	    newpercentage = filter.calculatePercentage(filtered);
   	    client.emit('percentage',newpercentage);
	})
	client.on('get teams',function(){
		console.log('getting teams');
		var teams = filter.teamNames();
		client.emit('teams', teams);
	})
	client.on('retrieve players',function(team){
		console.log('getting players for team ' + team);
		var players = filter.playerNames(team);
		client.emit('players',players);
	})
	client.on('retrieve shotTypes',function(shooterName){
		console.log('retrieving shottypes for player ' + shooterName);
		var shotTypes = filter.getShotTypes(shooterName);
		client.emit('shotTypes',shotTypes);
	})
	client.on('message',function(msg){
		console.log(msg);
	})
});
