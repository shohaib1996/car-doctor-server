// const express = require('express');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config()
// const app = express()
// const port = process.env.PORT || 5000;

// middleware 
// app.use(cors({
//     origin: ["http://localhost:5173"],
//     credentials: true
// }))
// app.use(express.json())
// app.use(cookieParser());
// {
//     origin: ["http://localhost:5173"],
//     credentials: true
// }




// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lapzl7c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// custom middleware
// const logger = async (req, res, next) => {
//     console.log("called:", req.hostname, req.originalUrl);
//     next()
// }
// const verifyToken = async (req, res, next) => {
//     const token = req.cookies?.token;
//     if (!token) {
//         return res.status(401).send({ message: "not authorized" })
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             console.log(err);
//             return res.status(401).send({ message: 'unauthorized access' })
//         }

//         console.log("value in the token", decoded);
//         req.user = decoded
//         next()

//     })
// const verifyToken = async (req, res, next) => {
//     const token = req.cookies?.token;
//     console.log("recieved token", token);
//     if (!token) {
//         return res.status(401).send({ message: "not authorized" })
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             console.log(err);
//             return res.status(401).send({ message: "unauthorized access" })
//         }
//         console.log("value in the token", decoded)
//         req.user = decoded
//         next()
//     })
// }
// }
const logger = async (req, res, next) => {
    console.log("called:", req.hostname, req.originalUrl)
    next()
}

// const verifyToken = async (req, res, next) => {
//     const token = req.cookies?.token;
//     console.log("token token", token );
//     if (!token) {
//         return res.status(401).send({ message: "not authorized" })
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             console.log(err);
//             return res.status(401).send({ message: "unauthorized access" })
//         }
//         console.log("value in token", decoded);
//         req.user = decoded
//         next()
//     })
// }


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const serviceCollection = client.db("carDoctor").collection("services")
        const bookingCollection = client.db("carDoctor").collection("bookings")
        // aUTH Related api 

        // app.post("/jwt", logger, async (req, res) => {
        //     const user = req.body;
        //     console.log(user);
        //     const token = jwt.sign({
        //         user
        //     }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        //     res
        //         .cookie("token", token, {
        //             httpOnly: true,
        //             secure: false
        //             // sameSite: "none"
        //         })
        //         .send({ success: true })
        // })
        // app.post("/jwt",logger, async (req, res) => {
        //     const user = req.body;
        //     console.log(user);
        //     const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
        //     res
        //         .cookie("token", token, {
        //             httpOnly: true,
        //             secure: false
        //         })
        //         .send({ success: true })
        // })

        // AUTH Related api 
        // console.log(process.env.ACCESS_TOKEN_SECRET);
        app.post("/jwt", async (req, res) => {
            const user = req.body;
            // console.log(user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
            res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                })
                .send({ success: true })
        })
        app.post("/logout", async (req, res) => {
            const user = req.body;
            console.log("user logged out", user);
            res
                .clearCookie("token", { maxAge: 0 })
                .send({ success: true })
        })

        // services related api
        app.get("/services", async (req, res) => {
            const cursor = serviceCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            // const options = {

            //     projection: { title: 1, price: 1 },
            // };
            const result = await serviceCollection.findOne(query)
            res.send(result)
        })
        // Booking

        app.post("/bookings", async (req, res) => {
            const booking = req.body;
            // console.log(booking);
            const result = await bookingCollection.insertOne(booking)
            res.send(result)
        })
        app.get("/bookings", async (req, res) => {
            // console.log( req.query?.email);
            // console.log("from valid token", req.user.user?.email);
            console.log('req.query.email:', req.query?.email);
            console.log('req.user.email:', req.user?.email);

            if (req.query.email !== req.user.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email }
            }
            // console.log(query);
        
            const result = await bookingCollection.find(query).toArray();
            res.send(result);

        })
        // app.get("/bookings", logger, verifyToken, async (req, res) => {
        //     // console.log("cookies", req.cookies?.token);
        //     console.log('req.user.email:', req.user?.email);
        //     console.log('req.query.email:', req.query?.email);
        //     if (req.query.email !== req.user.email) {
        //         return res.status(403).send({ message: 'forbidden access' })
        //     }
        //     let query = {};
        //     if (req.query?.email) {
        //         query = { email: req.query.email }
        //     }
        //     console.log("Token", req.cookies?.token);
        //     const result = await bookingCollection.find(query).toArray();
        //     res.send(result);

        // })
        app.patch("/bookings/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updateBooking = req.body;
            const updateDoc = {
                $set: {
                    status: updateBooking.status
                }
            }
            const result = await bookingCollection.updateOne(filter, updateDoc)
            res.send(result)
        })
        app.delete("/bookings/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await bookingCollection.deleteOne(query)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Doctor is running")
})

app.listen(port, () => {
    console.log(`Car doctor is running on port ${port}`)
})