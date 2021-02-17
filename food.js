function Food(){
    this.x;
    this.y;
    this.location = function(){
        this.x = (Math.floor(Math.random()*(rows-1))+1)*snakeSize;
        this.y = (Math.floor(Math.random()*(columns-1))+1)*snakeSize;
        console.log('food curr location:',this.x,this.y);
    }
    this.draw= function(){
        if(snake.startHamilton){
            ctx.fillStyle = "white";
        }else{
            ctx.fillStyle = "red";

        }
        ctx.fillRect(this.x,this.y,foodSize,foodSize);
        ctx.strokeRect(this.x,this.y,foodSize,foodSize);

    }
}
