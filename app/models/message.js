var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessagebSchema = new Schema({
	created:{
		type:Date,
		default:Date.now
	},
	message:{
		type: String
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Messageb', MessagebSchema);