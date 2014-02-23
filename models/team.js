var mongoose = require('mongoose')
	, Schema = mongoose.Schema;


var teamSchema = new Schema({
	teamName: String,
});


var Team = mongoose.model('Team',teamSchema);