class Box{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.speed = 0
    }

    get speed(){
        return this.speed;
    }

    set speed(new_speed){
        this.speed = new_speed
    }
    show() {
        Image()
    }
}

bigger_box = new Box(100, 100)
smaller_box = new Box(10, 10)