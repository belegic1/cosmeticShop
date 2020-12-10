import mongoose from 'mongoose'

const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log(`Database is connected on ${conn.connection.host}`
        .cyan.underline);
    } catch (error) {
        console.error(`${error.message}`.red.underline.bold);
        process.exit(1)
    }
}

export default connectDb