var fs = require('graceful-fs');//Fixes 'too many open files' error
var csv = require('csv');
var Shot = require('./shot.js');
var async = require('async');
var filter = require('./filter.js');

var loader = function(){
//var dirs = ['./data/quick'];
var dirs = ['./data/2007-2008.regular_season'];//,'./data/2007-2008.regular_season','./data/2008-2009.regular_season','./data/2009-2010.regular_season'];
console.log('Populating memory with data from csv... this may take a while');
var start = new Date().getTime();

async.each(dirs,function(directory,callback){
	fs.readdir(directory,function(err,files){
		async.each(files, function(file,callback){
			csv()
			.from.stream(fs.createReadStream(directory + '/' + file))
			.to.array(function(data){
				var year = file.substring(0,4);
				var month = file.substring(4,6);
				var day = file.substring(6,8);

				//Create Shots for Freethrows and Shots
				data.forEach(function(d){
					if(d[13] == 'shot' || d[13] == 'free throw')//d[13] == etype
					{	//Improvement: take column names from first row
						Shot.shotsArray.push(new Shot.shotsClass(
						d[11],//shotTime
						d[10],//period
						d[12],//team
						d[23],//shooterName
						d[13],//eType 
						d[29],//shotType
						d[27],//result
						d[30],//xCoord
						d[31],//yCoord
						day,
						month,
						year));
					}
				});//end data.foreach
				callback();//should callback to async.each(files)
			},{header: true}).on('error',function(error){
				console.log(error.message);
			});//end csv()
			
		},function(err){//callback for async.each(files)
			callback();//callback to dirs.foreach 
		});//End Files.foreach
	});//end readDir();

},function(err){
	var end = new Date().getTime();
	console.log('File Loading took ' + (end - start) + ' milliseconds');
});
}

exports.loader = loader;