import Player from "./player.js";

var MAZE;
var MAZE_SIZE = 20;
var POP = [];
var NB_POP = 100;
var START_POS = [];
var END_POS = {x:19,y:19};
var WALLS = [{x:2,y:2},{x:2,y:3},{x:1,y:3},{x:5,y:7},{x:8,y:10},{x:9,y:10}];

//Boucle Vars

//Is someone alive
var ISA = true;

var GAME_ENDED = false;
var GENERATION = 0;

var STEP = 0;
// MAx size of genom
var MAX_STEP = 100;
var TOP_SELECT = 20;


//Creating the world
function createWorld(){

    //Creating the world
    MAZE = new Array(MAZE_SIZE);
    for (let y = 0; y < MAZE_SIZE; y++) {
        MAZE[y] = new Array(MAZE_SIZE);
        for (let x = 0; x < MAZE_SIZE; x++) {
            MAZE[y][x] = 0;
        } 
    }

    //End of the game
    let x_end = END_POS.x;
    let y_end = END_POS.y;
    MAZE[y_end][x_end] = 1;

    //Creating walls
    WALLS.forEach(element => {
        let x = element.x;
        let y = element.y;
        MAZE[y][x] = 2;
    });

    //Creating the population
    for (let index = 0; index < NB_POP; index++) {
        POP.push(new Player(MAX_STEP));
    }
}

function renderWorld(){

    let maze = "<table id=world>";
    for (let y = 0; y < MAZE_SIZE; y++) {
        maze += "<tr>"
        for (let x = 0; x < MAZE_SIZE; x++) {
            
            if(MAZE[y][x] == 2){
                maze += "<td class=wall id="+x+"_"+y+">"
            }else if(MAZE[y][x] == 1){
                maze += "<td class=end id="+x+"_"+y+">"
            }else{
                maze += "<td id="+x+"_"+y+">"
            }
            maze += "</td>"
        }
        maze += "</tr>"
    }

    maze += "</table>"

    $("#my_maze").append(maze)
}

function renderPlayers(){
    POP.forEach(element => {
        $("#"+element.x+"_"+element.y).addClass("toto");
    });
}

function play(){

    while(GENERATION < 5 && !GAME_ENDED){

        STEP = 0;
        ISA = true;
        GENERATION ++;
        console.log("GENERATION : " + GENERATION)

        while(ISA && STEP < MAX_STEP && !GAME_ENDED){

            ISA = false;

            POP.forEach(element => {

                if(element.getIsAlive){
                    let fncMoove = element.getGenome[STEP];
                    let isAlive = element.moove(fncMoove, WALLS, MAZE_SIZE, END_POS, STEP);

                    if(isAlive == -1){
                        GAME_ENDED = true;
                        console.log(element);
                    }

                    if(!ISA && !GAME_ENDED){
                        ISA = isAlive;
                    }
                }
            });

            renderPlayers();
            STEP++;
        }


        //We can calcul the score now
        POP.forEach(element => {
           element.calculScore(END_POS); 
        });

        console.log("Tous le monde est mort")
        console.log(POP)

        let topTwenty = getTop();
        console.log("Le TOP Niveau")
        console.log(topTwenty)
        POP = [];
        console.log(POP)
        creatingBabies(topTwenty);
    }
}

function getTop(){

    var listTop = new Array();

    POP.sort((a, b) => a.getScore > b.getScore ? 1 : -1);
    listTop = POP.slice(0,TOP_SELECT);
    return listTop;

}

function creatingBabies(topTwenty){

    topTwenty.forEach(element => {
        let genome = element.getGenome;
        let newPlayer = new Player(MAX_STEP)
        newPlayer.setGenome = genome;
        
        POP.push(newPlayer)
    });

    for (let index = 0; index < NB_POP - TOP_SELECT; index++) {
        let newPlayer = new Player(MAX_STEP)
        let newGenome = new Array();
        let parentOne = POP[Math.floor(Math.random() * Math.floor(TOP_SELECT))];
        let parentTwo = POP[Math.floor(Math.random() * Math.floor(TOP_SELECT))];
        let firstPart = Math.floor(Math.random() * Math.floor(2));

        if(firstPart == 0){
            parentOne.getGenome.slice(0,MAX_STEP/2).forEach(element => {
                newGenome.push(element);
            });

            parentTwo.getGenome.slice(MAX_STEP/2,MAX_STEP).forEach(element => {
                newGenome.push(element);
            });
        }else{
            parentTwo.getGenome.slice(0,MAX_STEP/2).forEach(element => {
                newGenome.push(element);
            });

            parentOne.getGenome.slice(MAX_STEP/2,MAX_STEP).forEach(element => {
                newGenome.push(element);
            });
        }
        
        newPlayer.setGenome = newGenome;
        POP.push(newPlayer)
    }

    console.log("Les bébés sont fait !")
    console.log(POP)

}

createWorld();
renderWorld();

renderPlayers();

play();


