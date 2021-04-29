const mongoose=require('mongoose');

var ProductSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    slug:{
        type:String
    }, 
    desc:{
        type:String,
        required:true
     },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    }
});

// var Page=mongoose.exports=mongoose.model('Pages',PageSchema);

module.exports = mongoose.model('Product',ProductSchema);


// console.log(module.exports)
