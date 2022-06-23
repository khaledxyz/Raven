const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(chalk.yellow(`    Connected to MongoDB: ${connection.connection.host}`));
    }
    catch(error){
        console.log(chalk.red(error));
        process.exit(1);
    }
};

module.exports = { connectDB };