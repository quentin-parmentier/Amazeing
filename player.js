export default class Player{

    constructor(max_size) {
        this.x = 0;
        this.y = 0;
        this.isAlive = true;
        this.color = "#6f6f6f";
        this.genome = [];
        this.score = 0;

        //Create the steps 0:top, 1:right, 2:bot, 3:left
        for (let index = 0; index < max_size; index++) {
            this.genome[index] = Math.floor(Math.random() * Math.floor(4));
        }

    }

    moove(fnc, walls, maze_size){

        switch (fnc) {
            case 0:
                this.goTop();
                break;
            
            case 1:
                this.goRight();
                break;
            
            case 2:
                this.goBot();
                break;
                
            case 3:
                this.goLeft();
                break;

        }

        var found = walls.find((element) => {
            return element.x == this.x && element.y == this.y;
        });

        if(this.x>maze_size || this.y>maze_size || this.x<0 || this.y<0 || found != undefined){
            this.isAlive = false;
        }

        return this.isAlive;
    }

    goTop(){
        this.y -= 1;
    }

    
    goRight(){
        this.x += 1;
    }

    
    goBot(){
        this.y += 1;
    }

    
    goLeft(){
        this.x -= 1;
    }

    get getGenome() {
        return this.genome;
    }

    calculScore(end_pos,step){

    }
}