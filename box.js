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

    collide(other_block){
        //when the two blocks collide
        return other_block.x <= this.x + this.w
    }

    get_speed_after_impact_with(other_block){
        return (2*other_block.mass*other_block.speed + (this.mass - other_block.mass) * this.speed) /(this.mass + other_block.mass) //speed resulted from the conservation of energy and momentum
    }

    hits_wall(){
        return this.x <= 0
    }
}

