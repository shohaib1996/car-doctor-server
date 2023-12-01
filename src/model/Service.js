const { Schema, default: mongoose } = require("mongoose");



const ServiceSchema = new Schema({
    service_id:{
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    facility: [
        {
            name:{
                type:String ,
                required: true
            } ,
            details: {
                type:String ,
                required: true
            }
        },
    ]
})

const Service = mongoose.model("Service", ServiceSchema)
module.exports = Service