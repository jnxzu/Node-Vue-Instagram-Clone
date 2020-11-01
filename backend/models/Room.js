const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

let RoomSchema = new Schema({
    user1: 
    {
        type: String,
        required: true,
        max: 20
    },
    user2: 
    {
        type: String,
        required: true,
        max: 20
    },
},{timestamps: true});

delete mongoose.connection.models['Room'];
const Room = mongoose.model("Room", RoomSchema);

// mały „postprocessing” błędów mongoosowych
Room.processErrors = (err) => {
    let msg = {};
    for (let key in err.errors) {
        msg[key] = err.errors[key].room;
    }
    return msg;
};

global.RoomSchema = global.RoomSchema || Room;
module.exports = global.RoomSchema;