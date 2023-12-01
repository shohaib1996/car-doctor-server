const express = require('express');
const applyMiddleware = require('./middlewares/applyMiddleware');
const connectToDb = require('./db/connectDb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


const authenticationRoutes = require('./routes/authentication/index')
const servicesRoutes = require('./routes/services/index')
const bookingRoutes = require('./routes/booking/index')

applyMiddleware(app)
app.use(authenticationRoutes)
app.use(servicesRoutes)
app.use(bookingRoutes)





app.get("/health", (req, res) => {
    res.send("Doctor is running")
})

app.all("*", (req, res, next) => {
    const error = new Error(`the requested url is invalid: [${req.url}] `)
    error.status=404
    next(error)
    // console.log(req.url);
})
app.use((err, req, res, next)=> {
    res.status(err.status || 500).json({
        message: err.message
    })
})

const main = async() => {
    await connectToDb()
    app.listen(port, () => {
        console.log(`Car doctor is running on port ${port}`)
    })
}

main()