const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected ${connection.connection.host}`)
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }

}

module.exports = { connectDB };