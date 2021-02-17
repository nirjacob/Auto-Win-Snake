function Snake() {
    //initializers
    this.x=0;
    this.y=0;
    this.xSpeed=snakeSize*1;
    this.ySpeed = 0;
    this.prevMove='Right';
    this.totalLength=0;
    this.tail= [];
    this.isPause=false;
    this.startHamilton = false;

    this.startHPos=function(hamiltonPath){
        this.x=hamiltonPath[0][0];
        this.y=hamiltonPath[0][1];
    }
    //draw snake
    this.draw=function(){
        if(this.startHamilton){
            ctx.fillStyle = "cyan";
        }else{
            ctx.fillStyle = "green";
        }
        for(let i=0;i<this.totalLength;i++){
            ctx.fillRect(this.tail[i].x,this.tail[i].y,snakeSize,snakeSize);
            ctx.strokeRect(this.tail[i].x,this.tail[i].y,snakeSize,snakeSize);
        }
        ctx.fillRect(this.x,this.y,snakeSize,snakeSize);//draw curr pos
        ctx.strokeRect(this.x,this.y,snakeSize,snakeSize);
    }
    this.collision= function(){
        for(let i = 0;i<this.totalLength;i++){
             if(this.x===this.tail[i].x && this.y=== this.tail[i].y){
                this.gameOver();
            }
            if(this.tail[i].x===food.x &&this.tail[i].y===food.y){
                i=0;
                food.location();
            } 
        }
    } 
    this.gameOver=function(){
        console.log('gameover');
        this.x=0;
        this.y=0;
        this.tail = [];
        this.totalLength=0;
        this.xSpeed=0;
        this.ySpeed=0;
        this.prevMove = 'none';
    }
    //draw snake and control drawing speed
    this.update= function(){
        for(let i=0;i<this.tail.length-1;i++){
            this.tail[i]=this.tail[i+1];
        }
        this.tail[this.totalLength-1] = {x:this.x,y:this.y};
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
        if(this.x>=cvs.width ||this.y>=cvs.height||this.x<=-1||this.y<=-1){
            this.gameOver();
        }
    }
    this.eat=function(food){
        if(this.x===food.x&&this.y===food.y){
            this.totalLength++;
            return true;
        }
        return false;
    }
    
    //controls
    this.actionUpdate = function(action){
        switch(action){
            case 'Up':
                if(this.prevMove==='Down'){break;}//cancels Down then Up movement
                this.xSpeed=0;
                this.ySpeed=-snakeSize*1;
                this.prevMove='Up';
                break;
            case 'Down':
                if(this.prevMove==='Up'){break;}//cancels Up then Down movement
                this.xSpeed=0;
                this.ySpeed=snakeSize;
                this.prevMove='Down';
                break;
            case 'Left':
                if(this.prevMove==='Right'){break;}//cancels right then left movement
                this.xSpeed=-snakeSize;
                this.ySpeed=0;
                this.prevMove='Left';
                break;
            case 'Right':
                if(this.prevMove==='Left'){break;}//cancels left then right movement
                this.xSpeed=snakeSize;
                this.ySpeed=0;
                this.prevMove='Right';
                break;
            case 'e':
                this.totalLength++;//instantly eats
                this.update();
                snake.draw();
                break;
            case 'c':
                this.isPause=false;
                break;

            case 'h':
                this.isPause=true;
                this.startHamilton=true;
                break;
            case 't':

                this.x=food.x;
                this.y=food.y;
                break;
            }
        }
        this.updateHamilton=function(hamiltonPath,i){
            for(let i=0;i<this.tail.length-1;i++){
                this.tail[i]=this.tail[i+1];
            }
            this.tail[this.totalLength] = {x:hamiltonPath[i][0],y:hamiltonPath[i][1]};
            this.x =hamiltonPath[i][0];
            this.y =hamiltonPath[i][1];
            if(this.x>=cvs.width ||this.y>=cvs.height||this.x<=-1||this.y<=-1){
                this.gameOver();
            }
        }

        

}






