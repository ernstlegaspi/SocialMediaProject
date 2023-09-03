import mongoose from 'mongoose'

let isConnected = false

export const connect = async () => {
	mongoose.set('strictQuery', true)

	if(isConnected) {
		console.log('ALREADY CONNECTED TO DATABASE')

		return
	}

	try {
		await mongoose.connect(process.env.DB_URL!)

		isConnected = true
		console.log('Connected')
	}
	catch(error: any) {
		console.log(error)
	}
}

export const disconnect = async () => {
	if(!isConnected) {
		console.log(`Not connected in the database`)

		return
	}
	
	try {
		if(process.env.NODE_ENV !== 'production') {
			console.log("not disconnected")
			
			return
		}
		
		await mongoose.disconnect()

		isConnected = false
	}
	catch(error: any) {
		console.log(`Disconnect: ${error}`)
	}
}
