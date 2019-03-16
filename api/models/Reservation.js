const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

//CheckIn
//CheckOut
//rooms
//number of guests
//charge
//belongs to a user/guest

const ReservationSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    checkIn:{
        type: Date,
        required: true
    },
    checkOut:{
        type: Date,
        required: true
    },
    room: [
        {
           roomNum: {
               type: Number,
               required: true
           },
           numOfbeds: {
               type: Number,
               required: false
           }
        }

    ],
    numOfGuests: {
        type: Number,
        required: true
    },
    priceOfRoom: {
        type: Number,
        required: true
    }

});

ReservationSchema.plugin(timeStamp);
module.exports = Reservation = mongoose.model('reservations', ReservationSchema);