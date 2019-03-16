const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

//school
//work
//languages
//comments/reviews
//likes
//rooms

//create schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    bio: {
        type: String,
        required: false,
        max: 300
    },
    languages: {
        type: [String],
        required: true
    }
})

ProfileSchema.plugin(timeStamp);

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
