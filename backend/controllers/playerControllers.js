const Player=require("../models/playerModel")

const getPlayers= async (req,res)=>{
    try {
        const data= await Player.find({});
        res.status(200).send({
            success:true,
            message:"Data of Players",
            data
        })
    } catch (error) {
          res.status(500).send({
            success:false,
            message:"Internal server error",
            error
          })
        
    }
}

const addplayer= async (req,res)=>{
    try {
        const {first_name,last_name,email,phone,role,available} =req.body;
        if(!first_name || !last_name||!email||!phone || !role ||available === undefined){
            res.status(404).send({
                success:false,
                message:"Each field is mandatory",
            })
        }

        await new Player({
            first_name,last_name,email,phone,role,available
        }).save();

        res.status(200).send({
            success:true,
            message:"Data added successfully!",
        })

        

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({
            success:false,
            message:"Internal server error",
            error
          })
    }
}


const updatePlayers= async (req,res)=>{
    try {
        const id=req.params.id;
        await Player.updateOne({_id:id},{$set:req.body});

        res.status(200).send({
            success:true,
            message:"Data updated successfully!",
        })
        
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({
            success:false,
            message:"Internal server error",
            error
          })
    }
}

const deletePlayer= async (req,res)=>{
    try {
        const id=req.params.id;
        await Player.deleteOne({_id:id})
        res.status(200).send({
            success:true,
            message:"Player deleted successfully!",
        })
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({
            success:false,
            message:"Internal server error",
            error
          })
    }
}

module.exports={getPlayers,addplayer,updatePlayers,deletePlayer};