const express = require("express");
const { data , getGames , getGamesByGenres , getGamesByDev , getGamesByPlataform , getGamesByDate , orderByDate , orderByTitle} = require("./functions");
const dotenv = require("dotenv"); 
dotenv.config({path:`${__dirname}\\.env`});


const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());


app.get("/games", (req, res) => {
    //const games = getGames();
    const {cant , genre , developer , plataform , minDate , maxDate , order} = req.query;
    let games = [];

    
    
    if(cant){
        games.length=parseInt(cant);
        games = getGames(games.length?games:undefined);
    }else{
        games = getGames(data);
    } 
    
    if(genre){
        games = getGamesByGenres(genre , games.length?games:undefined);
        console.log(games);
    }

    if(developer){
        games = getGamesByDev(developer , games.length?games:undefined);
    }

    if(plataform){
        games = getGamesByPlataform(plataform , games.length?games:undefined);
    }

    if(minDate || maxDate){
        games = getGamesByDate(minDate , maxDate , games.length?games:undefined);
    }

    if(order){
        if(order == "title"){
            games = orderByTitle(games.length?games:undefined);
        }

        if(order == "date"){
            games = orderByDate(games.length?games:undefined);
        }
    }

    res.status(200).json({
        count: games.length,
        games
    })
})



app.post("/games", (req, res) => {
    const games = getGames(data);
    console.log(games.length);
    games.push(req.body);
    console.log(games.length);
    res.status(200).send("Peticion compekltada");
})
 
let port = process.env.PORT || 3001;
 const serever = app.listen(
    port,
    () => console.log('servidor lanzado en el puerto ', port)
) 