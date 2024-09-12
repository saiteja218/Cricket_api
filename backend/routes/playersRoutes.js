const express = require('express');
const { getPlayers, addplayer, updatePlayers, deletePlayer } = require('../controllers/playerControllers');


const Router=express.Router();

Router.get('/get-players', getPlayers);

Router.post('/add-players',addplayer)

Router.put('/update-players/:id',updatePlayers);

Router.delete('/delete-player/:id',deletePlayer)


module.exports=Router;