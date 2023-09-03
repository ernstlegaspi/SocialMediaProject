import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
	posts: [{
		type: Schema.Types.ObjectId,
		ref: "Post"
		// Creator of post
	}],
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
		// Comments to a post
	}],
	image: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	hashedPassword: String
})

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

export default userModel
