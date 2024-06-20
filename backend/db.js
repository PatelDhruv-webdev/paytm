
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/paytm')


const userSchema = new mangoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password:{
        type : String,
  	    required : true,
  	    minlength : 6


    },
    firstName :{
        type : String,
        trim : true ,
        required : true,
        maxLength: 50
    },
    lastName : {
        type : String,
        trim : true ,
        required : true,
        maxLength: 50
    }

});


const bankSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);


module.export =  {
    User,
    Account,
}