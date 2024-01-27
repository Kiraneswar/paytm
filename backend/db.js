let mongoose=require("mongoose");
mongoose.connect("mongoose url");

let userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstname:{
        type:String,
        require:true,
        maxLength:50,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        maxLength:50,
        trim:true
    }
});

let User=mongoose.model('User',userSchema);

module.exports={
    User
};
