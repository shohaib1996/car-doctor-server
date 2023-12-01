const { Schema, default: mongoose } = require("mongoose");

const bookingSchema = new Schema({

    customerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    service:{
        type: String,
        required: true
    },
    service_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }



});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking


// customerName: name,
//     email,
//     date,
//     service: title,
//         service_id: _id,
//             price,
//             img