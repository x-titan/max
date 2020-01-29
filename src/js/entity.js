import { Vec2 } from "./math.js";

export class Entity {
    constructor(params) {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.draw = (ctx) => {
        };
        this.good = ()=>{
            console.log(params)
        }
        this.good()
    }
}


export class Hero extends Entity{
    constructor(params) {
        super(params)
        this.name = 'Hero'
        this.skin = {}
    }
}
