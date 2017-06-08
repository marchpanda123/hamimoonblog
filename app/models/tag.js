var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
	created:{
		type:Date,
		default:Date.now
	},
	tagName:{
		type: String
	}
});

module.exports = mongoose.model('Tag', TagSchema);