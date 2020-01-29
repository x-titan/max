import { Entity, Hero } from "./entity.js";
import Camera from "./camera.js";
import { createMap } from "./create.js";


export default class Game {
    constructor() {
        this.entity = {
            enemy: [],
            friend: []
        }
        this.state = {}
        this.objects = []
        this.hero = new Hero('new hero')
        this.opts = {
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth,
            map: '#112458'
        }
        this.camera = new Camera()
        this.set = (params) => {
            if (!params) {
                return
            }
            if (params.hero) {
                this.hero = params.hero
            }
            if (params.entity) {
                this.entity = params.entity
            }
            if (params.objects) {
                this.objects = params.objects
            }
        }
        this.update = (ctx) => {
            this.draw(ctx)
        }
        this.draw = (ctx) => {
            ctx.beginPath()
            ctx.fillStyle = this.opts.map
            ctx.rect(0, 0, this.opts.width, this.opts.height)
            ctx.closePath()
        }
    }
}

createMap()
