import Tool from "@tools/tool"

export default class Circle extends Tool {
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
    }

    mouseDownHandler(e) {
        // пользователь опустил мыш
        this.mouseDown = true;
        this.ctx.beginPath(); // начали рисовать новую линию
        // запоминаем стартовую позицию
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        // сохраняем наш квадрат
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        // пользователь водит мышкой
        if(this.mouseDown) {
            // запоминаем конечную позицию
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            // выщитываем ширину и высоту
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            // радиус круга 
            let r = Math.sqrt(width**2 + height**2)
            // если мыш опущена, рисуем
            this.draw(this.startX, this.startY, r);
        }
    }

    draw(x, y, r) {
        const img = new Image();
        img.src = this.saved;
        img.onload = async function() {
            // очищаем канвас
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            // выгружаем сохраненные фотки
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            // рисуем
            this.ctx.beginPath();
             // круг
            this.ctx.arc(x, y, r, 0, 2*Math.PI);
            // обводим линию
            this.ctx.fill();
            this.ctx.stroke();
        }.bind(this)
       
    }
}