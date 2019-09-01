import Player from "./player.js";

var MAZE;
var MAZE_SIZE = 20;
var POP = [];
var NB_POP = 500;
var START_POS = [];
var END_POS = {x:19,y:19};
var WALLS = [{x:2,y:2},{x:2,y:3},{x:1,y:3},{x:5,y:7},{x:8,y:10},{x:9,y:10}];

//Boucle Vars

//Is someone alive
var ISA = true;

var GAME_ENDED = false;
var GENERATION = 1;

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

    console.log(MAZE);

    //Creating the population
    for (let index = 0; index < NB_POP; index++) {
        POP.push(new Player(MAX_STEP));
    }

    console.log(POP);
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
    while(ISA && STEP < MAX_STEP){
        ISA = false;

        POP.forEach(element => {
            let fncMoove = element.getGenome[STEP];
            let isAlive = element.moove(fncMoove, WALLS, MAZE_SIZE);
            console.log(isAlive)
            if(!ISA){
                ISA = isAlive;
            }
        });

        renderPlayers();
        STEP++;
    }
}

createWorld();
renderWorld();

renderPlayers();

play();


