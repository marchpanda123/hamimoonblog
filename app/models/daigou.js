var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DaigouProductSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String
	},
	daigouPage: {
		type: String
	},
	content: {
		type: String
	}
});

var DaigouTagSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	productName: {
		type: String,
		default: '',
		trim: true
	},
	tagProduct: [DaigouProductSchema]
});

var DaigouSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	daigouClass: {
		type: String
	},
	classPage: {
		type: String
	},
	subTitle: {
		type: String
	},
	daigouIntro :{
		type: String
	},
	classTag: [DaigouTagSchema]
});

module.exports = mongoose.model('Daigou', DaigouSchema);
module.exports = mongoose.model('DaigouTag', DaigouTagSchema);