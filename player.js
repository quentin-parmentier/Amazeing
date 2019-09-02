export default class Player{

    constructor(max_size) {
        this.x = 0;
        this.y = 0;
        this.isAlive = true;
        this.color = "#6f6f6f";
        this.genome = [];
        this.score = 0;
        this.deadStep = 0;

        //Create the steps 0:top, 1:right, 2:bot, 3:left
        for (let index = 0; index < max_size; index++) {
            this.genome[index] = Math.floor(Math.random() * Math.floor(4));
        }

    }

    moove(fnc, walls, maze_size, end_pos, step){

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
            this.deadStep = step;
            this.isAlive = false;
        }

        if(end_pos.x == this.x && end_pos.y == this.y){
            return -1;
        }

        return this.isAlive;
    }

    goTop(){
        this.x -= 1;
    }

    
    goRight(){
        this.y += 1;
    }

    
    goBot(){
        this.x += 1;
    }

    
    goLeft(){
        this.y -= 1;
    }

    get getGenome() {
        return this.genome;
    }

    get getIsAlive(){
        return this.isAlive;
    }

    get getScore(){
        return this.score;
    }

    set setGenome(newGenome){
        this.genome = newGenome;
    }

    calculScore(end_pos){
        let distance = Math.abs(this.x - end_pos.x) + Math.abs(this.y - end_pos.y)
        this.score = distance*10 + this.deadStep
    }
}