import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;