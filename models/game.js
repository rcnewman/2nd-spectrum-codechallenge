var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var gameSchema = new Schema({
	homeTeam: String,
	awayTeam: String,
	date: [{year: Number,
			month: Number,
			day: Number}]
});
var Game = mongoose.model('Game',gameSchema);