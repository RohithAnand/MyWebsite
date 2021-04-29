const mongoose=require('mongoose');

var UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    username:{
        type:String,
        required:true
     },
    password:{
        type:String,
        required:true
     },
    admin:{
        type:Number
    }

});

// var Page=mongoose.exports=mongoose.model('Pages',PageSchema);

module.exports = mongoose.model('User',UserSchema);


// console.log(module.exports)


