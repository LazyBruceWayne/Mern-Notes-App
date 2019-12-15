const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userID: String,
    note: String,
	usernote: String,
	category:String,
	created: {
		type: Date,
		default: Date.now
	  }
});

module.exports = mongoose.model('Note', NoteSchema);