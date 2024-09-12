const mongoose = require('mongoose');

const uri = "mongodb+srv://saiteja:saiteja218@cluster0.himld.mongodb.net/tejasdb?retryWrites=true&w=majority";

const connectdb= async ()=>{
    try {
       await mongoose.connect(uri);
       console.log("connected to database");
    } catch (error) {
        console.log("there is an error"+error)
        
    }


}

module.exports =  connectdb;

