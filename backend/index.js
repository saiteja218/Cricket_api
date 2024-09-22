const express=require('express');
const connectdb = require('./config/db');
const cors = require('cors');// Import the cors package
const playerRouter=require('./routes/playersRoutes');
const player = require('./models/playerModel');



const app=express(); 
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Enable CORS for all routes
// app.use(cors({
//     origin: 'http://localhost:5173'
//   }));

app.use(express.json()); 

app.use('/api/v1/players',playerRouter);



app.listen(5000,()=>{
    console.log(`server listening at port 5000`)
})

connectdb();

//saiteja218 
