const { Console } = require("console");
const {readFileSync , writeFileSync} = require("fs");
const { Module } = require("module");
const path = require("path");

const DbJson = readFileSync(path.join(__dirname, "db/data.json"), "utf8");

const data = JSON.parse(DbJson);

function getGames(number = undefined){
    const games = [];
    let Cantgames = number==undefined? data.length: number;

    for(let i = 0 ; i < Cantgames.length; i++){
        //writeFileSync(path.join(__dirname, "log.txt") , `${JSON.stringify(data[i])} \n` , {flag:"a"} );
        games.push(data[i]);
    }

    return games;

}

function getGamesByGenres(genre ,games = undefined){
    const gamesFiltered = [];
    const genreGames = games==undefined? data: games;
    for(let i = 0 ; i < genreGames.length; i++){
        const generos = genreGames[i].genres;
        let NameGame = genreGames[i];
        for (const genero of generos) {
            if(genero == genre){
                gamesFiltered.push(NameGame);
            }
        }
    } 
    
    if(gamesFiltered[0] == null){
        return false
    }else{
        return gamesFiltered
    }

}

function getGamesByDev(dev, games = undefined){
    const gamesFiltered = [];
    const devGames = games==undefined? data: games;
    console.log(typeof (dev));
    for(let i = 0 ; i < devGames.length ; i++){
        if(dev == devGames[i].developer){
            gamesFiltered.push(devGames[i]);
        }        
    }
    if(gamesFiltered.length < 1){
        return false
    }else{
        return gamesFiltered
    }
}

function getGamesByPlataform(plat, games = undefined){
    const gamesFiltered = [];
    const platGames = games==undefined? data: games;
    for(let i = 0; i < platGames.length ; i++){
        const platsNames = platGames[i].platforms;
        for(let j = 0 ; j < platsNames.length ; j++){
            if(plat.toLowerCase() == platsNames[j].name.toLowerCase()){
                gamesFiltered.push(platGames[i]);
            }
        }
    }

    if(gamesFiltered.length < 1){
        return false
    }else{
        return gamesFiltered
    }
}

function getGamesByDate(min = "1-7-1940" , max = "10-2-2022" , games = undefined){
    const gamesFiltered = [];
    const juegosLanzados = games==undefined? data: games;

    console.log("min :" + min);
    console.log("max :" + max);

    let minFecha = new Date(min);
    let maxFecha = new Date(max);

    let minTime = minFecha.getTime();
    let maxTime = maxFecha.getTime();
 
    if(maxTime < minTime){
        return "ERROR: La primer fecha es mayor a la segunda fecha"
    }

    for(let i = 0; i < juegosLanzados.length ; i++){
        const {day , month , year} = juegosLanzados[i].release;
        let realeaseFecha = month + " " + day + " " + year;
        let dateGame = new Date(realeaseFecha);

        console.log(dateGame);

        let timeGame = dateGame.getTime();

        if(minTime < timeGame && maxTime >= timeGame){
           gamesFiltered.push(juegosLanzados[i]);
        }

    }

    return gamesFiltered;

}

function orderByTitle(games = undefined){
    let gamesFiltered = [];
    const orderedGames = games==undefined? data: games;
    const abc = ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "h" , "i" , "j" , "k" , "l" , "m" ,"n" , "o" , "p" , "q" , "r" , "s" , "t" , "v" , "w" , "x" , "y" , "z"];
    gamesFiltered = orderedGames.sort((a , b) => {
        return a.title.localeCompare(b.title)
    });
    /*const titleGames = []
    let contAbc = 0;
    let contGames = 0;
    let titleSingle;

    while(orderedGames.length != 7){
        titleSingle = titleGames[contGames];
        console.log("Ordered games length =>" , orderedGames.length);
        
        console.log("title single value =>" , titleSingle);
        console.log("cont abc value =>" , contAbc);
        console.log("cont games value =>" , contGames);
        console.log("title games value =>" , titleGames);
        
        if(titleGames.length == 0){
            break;
        }else if(contGames == titleGames.length){
            console.log("Entre al primer if");
            contAbc++;
            contGames = 0;
        }else if(contAbc >= abc.length){
            contAbc = 0;
        }else if(titleGames.length == 0){
            contGames = 0;
        }else if(titleSingle[0].toLowerCase() == abc[contAbc].toLowerCase()){
            console.log("Entre al segundo if");
            orderedGames.push(titleSingle);
            titleGames.splice(contGames , 1);
        }else{
            console.log("Entre al tercer if"); 
            contGames++;
        }
    }*/

    return gamesFiltered;
}

function orderByDate(games = undefined){
    const gamesFiltered = [];
    const gamesDates= [];
    const orderedDatesGames = games==undefined? data: games;;
    var n, i, k, aux;
    n = orderedDatesGames.length; 

    for(let j = 0 ; j < orderedDatesGames.length ; j++){
        const {day , month , year} = orderedDatesGames[j].release;
        let fecha = month + "-" + day + "-" + year;

        gamesDates.push(fecha);
    }

    for (k = 1; k < n; k++) {
        for (i = 0; i < n; i++) {
            let fechaActual = new Date(gamesDates[i]);
            let fechaSiguiente = new Date(gamesDates[i + 1]);
            if(fechaActual.getTime() > fechaSiguiente.getTime()){
                aux = gamesDates[i];
                gamesDates[i] = gamesDates[i + 1];
                gamesDates[i + 1] = aux;
            }
        }
    }

    let contFecha = 0;
    let contOrdFechas = 0;
    while(contOrdFechas != gamesDates.length){
        const {day , month , year} = orderedDatesGames[contFecha].release;
        let fecha = month + "-" + day + "-" + year;
        let gameDFecha = new Date (gamesDates[contOrdFechas]);
        let gameOrgFecha = new Date (fecha);

        if(gameDFecha.getTime() ==  gameOrgFecha.getTime()){
            gamesFiltered.push(orderedDatesGames[contFecha]);
            contOrdFechas++;
            contFecha = 0;
        }else{
            contFecha++;
        }
    }
    
    return gamesFiltered;
}
 


//module.export(gameFunctions);
module.exports = {
    data,
    getGames, 
    getGamesByGenres, 
    getGamesByDev, 
    getGamesByPlataform, 
    getGamesByDate, 
    orderByTitle, 
    orderByDate  
}