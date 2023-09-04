import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import user from '../routes/user'

const app = express()
const port = process.env.PORT || 3001

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URL)
	.then(() => app.listen(port, () => console.log(`Server is running in port: ${port}`)))
	.catch(() => console.log("Can not connect to the database"))

app.use(`/auth`, user)
