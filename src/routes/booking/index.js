const express = require("express");
const Booking = require("../../model/Booking");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();



router.post("/bookings", async (req, res) => {
    const bookingData = req.body;
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();
    res.send(savedBooking);

});
router.get("/bookings", verifyToken, async (req, res) => {
    console.log('req.query.email:', req.query?.email);
    console.log('req.user.email:', req.user?.email);

    if (req.query.email !== req.user.email) {
        return res.status(403).send({ message: 'forbidden access' });
    }
    let query = {};
    if (req.query?.email) {
        query = { email: req.query.email };
    }

    const result = await Booking.find(query);
    res.send(result);

});
router.patch("/bookings/:id", async (req, res) => {
    const id = req.params.id;
    const filter = await Booking.findById(id)
    const updateBooking = req.body;
    const updateDoc = {
        $set: {
            status: updateBooking.status,
        },
    };
    const updatedBooking = await Booking.findOneAndUpdate(filter, updateDoc);

    res.send(updatedBooking);

});
router.delete("/bookings/:id", async (req, res) => {
    const id = req.params.id;
    const booking = await Booking.findByIdAndDelete(id);
    res.send({ deletedCount: 1, message: "Booking deleted successfully", deletedBooking: booking });

});

module.exports = router