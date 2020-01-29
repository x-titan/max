function Display (canvas) {
    this.context = canvas.getContext('2d')
    this.buffer = document.createElement('canvas').getContext('2d')
    this.size = {
        w: undefined,
        h: undefined
    }
    this.zone = {
        w: undefined,
        h: undefined
    }

    this.drawRectangle = (x, y, size, color) => {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), size, size);

    };
    this.resize = (params) => {
        if (params.height / params.width > params.ratio) {
            this.context.canvas.height = params.width * params.ratio;
            this.context.canvas.width = params.width;
        } else {
            this.context.canvas.height = params.height;
            this.context.canvas.width = params.height / params.ratio;
        }

    }
    this.render = () => {
        return this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height)
    }
    this.context.imageSmoothingEnabled = false
}

Display.prototype = {
    constructor : Display
}