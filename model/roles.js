const {Schema,model} = require('mongoose');


const RollSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    abrev:{
        type:String,
        required:true,
    },

})

module.exports = model('Roll', RollSchema);