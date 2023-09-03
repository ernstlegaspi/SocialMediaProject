import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	replies: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}],
	comment: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	likeCount: {
		type: Number,
		default: 0
	}
})

const commentModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default commentModel
