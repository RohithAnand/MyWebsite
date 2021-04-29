const mongoose=require('mongoose');

var PageSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    slug:{
        type:String
    }, 
    content:{
        type:String,
        required:true
     },
    sorting:{
        type:Number
    }

});

// var Page=mongoose.exports=mongoose.model('Pages',PageSchema);

module.exports = mongoose.model('Page',PageSchema);


// console.log(module.exports)


