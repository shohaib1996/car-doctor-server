const express = require("express");
const Service = require("../../model/Service");
const router = express.Router();


router.get("/services", async (req, res) => {
    const cursor = await Service.find()
    res.send(cursor)
})
router.get("/services/:id", async (req, res) => {
    const id = req.params.id;
    const service = await Service.findById(id);
    // const options = {

    //     projection: { title: 1, price: 1 },
    // };
    res.send(service);
})

module.exports = router