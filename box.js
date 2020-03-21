class Box{
    constructor(x,w,speed,mass){
        this.x = x;
        this.y = height - w;
        this.w = w;
        this.speed = speed;
        this.mass = mass
    }

    update(){
        this.x += this.speed;
    }

    show() {
        fill(255-this.x, 0, 0);
        rect(this.x,this.y,this.w,this.w);
    }

    collide(otherBlock){
        //when the two blocks collide
        return otherBlock.x <= this.x + this.w
    }

    getSpeedAfterImpactWith(otherBlock){
        return (2*otherBlock.mass*otherBlock.speed + (this.mass - otherBlock.mass) * this.speed) /(this.mass + otherBlock.mass) //speed resulted from the conservation of energy and momentum
    }

    hitsWall(){
        return this.x <= 0
    }
}

