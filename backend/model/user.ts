import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	password: String,
	image: String,
	tag: String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}],
	email: {
		type: String,
		unique: true,
		required: true
	},
	createdAt: {
		type: Date,
		default: new Date()
	},
	updatedAt: {
		type: Date,
		default: new Date()
	}
})

export default mongoose.model('User', schema)
