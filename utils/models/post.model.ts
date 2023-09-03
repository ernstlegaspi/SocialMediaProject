import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	caption: {
		type: String,
		required: true
	},
	comments: {
		type: Schema.Types.ObjectId,
		ref: 'Comment'
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
