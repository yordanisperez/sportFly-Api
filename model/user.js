const {Schema,model} = require('mongoose');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    roles:[Schema.Types.ObjectId],
    clubs:[Schema.Types.ObjectId],
    email:{
        type: String,
        required:true,
    },
    sub:{
        type: String,
        required:true,      
    }
})

module.exports = model('User', UserSchema);