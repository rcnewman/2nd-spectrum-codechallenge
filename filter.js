var Shot = require('./shot.js');
var shotsArray = Shot.shotsArray;

var sortByTeams = function(){
	shotsArray = shotsArray.sort(function(a,b){
		return a.team.localeCompare(b.team);
	});
	return shotsArray;
}

var teamNames = function(){
	shotsArray = sortByTeams();
	var teams = [];
	shotsArray.forEach(function(d){
		if(teams.indexOf(d.team) === -1){
			teams.push(d.team);
		}
	});
	return teams;
};
var filterShots = function(team,shooterName,eType,shotType,xCoord,yCoord,day,month,year)
{
	var filteredShotsArray = shotsArray;
	if(team){
		filteredShotsArray = filterByTeam(team,filteredShotsArray);
	}
	if(shooterName){
		filteredShotsArray = filterByPlayer(shooterName,filteredShotsArray);
	}
	if(eType){
		filteredShotsArray = filterByEventType(eType,filteredShotsArray);
	}
	if(shotType && eType === 'shot'){
		filteredShotsArray = filterByShotType(shotType,filteredShotsArray);
	}
	//if((xCoord || yCoord) && shotType != "free throw"){
	//	filteredShotsArray = filterByLocation(xCoord,yCoord,filteredShotsArray);
	//}
	if(day || month || year){
		filteredShotsArray = filterByDate(day,month,year,filteredShotsArray);
	}
	return filteredShotsArray;
};
var filterByTeam = function(team, array){
	var teamShotsArray = array.filter(function(shot)
	{
		return shot.team == team;
	});
	return teamShotsArray;
};
var filterByPlayer = function(shooterName,array){
	var playerShotsArray = array.filter(function(shot)
	{
		return shot.shooterName == shooterName;
	});
	return playerShotsArray;
};
var filterByEventType = function(eType, array){
	var eventTypeShotsArray = array.filter(function(shot)
	{
		return shot.eType == eType;
	});
	return eventTypeShotsArray;
};
var filterByShotType = function(shotType, array){
	var shotTypeShotsArray = array.filter(function(shot)
	{
		return shot.shotType == shotType;
	});
	return shotTypeShotsArray;
};
var filterByLocation = function(xCoord,yCoord, array){
	var locationShotsArray = array.filter(function(shot)
	{
		return (shot.xCoord == xCoord && shot.yCoord == yCoord);
	});
	return locationShotsArray;
};
var filterByDate = function(day,month,year, array){
	var dateShotsArray = array.filter(function(shot)
	{
		var y = parseInt(shot.year);
		var m = parseInt(shot.month);
		var d = parseInt(shot.day);
		if(y > year){
			return false;
		}
		else if(y == year){
			if(m > month){
				return false;			
			}
			else if(m == month){
				if(d > day){
					return false;
				} else{
					return true;
				}
			} 
			else{
				return true;
			}
		} 
		else{
			return true;
		}
	});
	return dateShotsArray;
};
var playerNames = function(team){
	var players = [];
	shotsArray.forEach(function(d){
		if(players.indexOf(d.shooterName) === -1){
			if(team === '' || d.team === team){
				players.push(d.shooterName);
			}
		}
	});
	return players;
};
var getShotTypes = function(shooterName){
	var shotTypes = [];
	shotsArray.forEach(function(d){
		if(shotTypes.indexOf(d.shotType) === -1){
			if(shooterName === '' || d.shooterName === shooterName){
				shotTypes.push(d.shotType);
			}
		}
	});
	return shotTypes;
};
var calculatePercentage = function(array){
	var total = array.length;
	
	if(total > 0){
		var made = 0;
		array.forEach(function(shot)
		{
			if(shot.result === "made"){
				made++;
			}
		});
		if (made > 0){
			console.log("Made " + made + " total " + total);
			return (made / total);	
		} else{
			return '0%';
		}
	}
	return ("No shots taken");
}

exports.getShotTypes = getShotTypes;
exports.teamNames = teamNames;
exports.playerNames = playerNames;
exports.filterShots = filterShots;
exports.calculatePercentage = calculatePercentage;