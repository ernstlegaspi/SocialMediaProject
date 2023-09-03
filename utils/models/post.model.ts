import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	caption: {
		type: String,
		required: true
	},
	likeCount: {
		type: Number,
		default: 0
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post
