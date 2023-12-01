

const mongoose = require('mongoose')
require('dotenv').config()

const getConnectionString = () => {
    const connectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lapzl7c.mongodb.net/?retryWrites=true&w=majority`

    return connectionURI

}
const connectToDb = async() => {
    console.log("connecting to database...");
    const uri = getConnectionString()
    await mongoose.connect(uri, {dbName: process.env.DB_NAME})
    console.log("connected to database");
}

module.exports = connectToDb