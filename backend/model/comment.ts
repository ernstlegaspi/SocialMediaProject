import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	body: String,
	commentsCount: Number,
	likeCount: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
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

export default mongoose.model('Comment', schema)
