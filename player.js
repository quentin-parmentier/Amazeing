export class Player{

    constructor(max_size) {
        this.x = 0;
        this.y = 0;
        this.isAlive = true;
        this.color = "#6f6f6f";
        this.genome = [];

        //Create the steps 0:top, 1:right, 2:bot, 3:left
        for (let index = 0; index < max_size; index++) {
            genome[index] = Math.floor(Math.random() * Math.floor(4));
        }

    }

    set moove(fnc, walls, maze_size){

        switch (fnc) {
            case 0:
                goTop();
                break;
            
            case 1:
                goRight();
                break;
            
            case 2:
                goBot();
                break;
                
            case 3:
                goLeft();
                break;

        }

        var found = walls.find(function(element) {
            return element.x == this.x && element.y == this.y;
        });

        if(x>maze_size || y>maze_size || x<0 || y<0 || found != undefined){
            this.isAlive = false;
        }

    }

    set goTop(){
        this.y -= 1;
    }

    
    set goRight(){
        this.x += 1;
    }

    
    set goBot(){
        this.y += 1;
    }

    
    set goLeft(){
        this.x -= 1;
    }
}