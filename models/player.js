var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var playerSchema = new Schema({
	playerName: String,
	teamId: Schema.Types.ObjectId
});

var Player = mongoose.model('Player',playerSchema);
