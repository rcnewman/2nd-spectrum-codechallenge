//var module = require('module');

function Shot(shotTime, period, team, shooterName,eType,shotType,result,xCoord,yCoord,day,month,year)
{
	this.shotTime = shotTime;
	this.period = period
	this.team = team;
	this.shooterName = shooterName;
	this.eType = eType;
	this.shotType = shotType;
	this.result = result;
	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.day = day;
	this.month = month;
	this.year = year;
};

var shots = [];
exports.shotsArray = shots;
exports.shotsClass = Shot;