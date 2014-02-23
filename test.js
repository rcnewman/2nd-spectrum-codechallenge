
var newDisplay = fs.readFileSync('views/percentage.html','utf-8');

function renderDisplay(request, response){
	response.writeHead(200,{
		'Content-type': 'text/html; charset=utf-8'
	});
	parseBody(request, function(body){
		var post = {
			title: body.title,
			content: body.content
		}
		console.log('Title: ' + post.title);
	});
	response.end(newDisplay);
}
//utils
function render404(request,response){
	response.writeHead(404);
	response.end('404 File Not Found');
}
function parseBody(request,callback){
	var body = '';
	request.on('data',function(chunk) {
		body += chunk;
	});
	request.on('end',function(){
		callback(qs.parse(body));
	});
}


//Routes
var newShotChanceRegex =  new RegExp('^/shotchance/?$');


//Server
var server = http.createServer(function (request, response) {
	var pathname = url.parse(request.url).pathname;
	if(newShotChanceRegex.test(pathname)){
		renderDisplay(request,response);
	} else{
		render404(request,response);
	}
});

server.listen(8000);
console.log('Server running at 127.0.0.1:8000/');