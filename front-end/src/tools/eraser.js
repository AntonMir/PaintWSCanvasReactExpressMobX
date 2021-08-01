import Tool from "@tools/tool"

export default class Eraser extends Tool {
    constructor(canvas) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        // пользователь поднял мыш
        this.mouseDown = false;
        this.ctx.strokeStyle = '#000';
    }

    mouseDownHandler(e) {
        // пользователь опустил мыш
        this.mouseDown = true;
        this.ctx.beginPath(); // начали рисовать новую линию
        // передаем координаты мышки
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }

    mouseMoveHandler(e) {
        // пользователь водит мышкой
        if(this.mouseDown) {
            // если мыш опущена, рисуем
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }

    draw(x, y) {
        // линия
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle="#fff";
        this.ctx.stroke();
    }
}