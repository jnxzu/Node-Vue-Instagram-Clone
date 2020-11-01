const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    sender: 
    {
        type: String,
        required: true,
        max: 20
    },
    recipent: 
    {
        type: String,
        required: true,
        max: 20
    },
    content: {
        type: String,
        required: true,
        max: 255
    },
    
},{timestamps: true});

delete mongoose.connection.models['Message'];
const Message = mongoose.model("Message", MessageSchema);

// mały „postprocessing” błędów mongoosowych
Message.processErrors = (err) => {
    let msg = {};
    for (let key in err.errors) {
        msg[key] = err.errors[key].message;
    }
    return msg;
};

global.MessageSchema = global.MessageSchema || Message;
module.exports = global.MessageSchema;
