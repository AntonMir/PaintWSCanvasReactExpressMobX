import React from 'react';
// styled
import '@styles/toolbar.scss'
// tools
import toolstate from '../store/toolstate';
import canvasstate from '../store/canvasstate';
import Brash from '../tools/brash';
import Rect from '../tools/rect';
import Circle from '../tools/circle';
import Eraser from '../tools/eraser';
import Line from '../tools/line';



const Toolbar = () => {

    const changeColor = (e) => {
        toolstate.setStrokeColor(e.target.value)
        toolstate.setFillColor(e.target.value)
    }
    return (
        <div className="toolbar">
            <button 
                className="toolbar__btn brush" 
                onClick={() => toolstate.setTool( new Brash (canvasstate.canvas))}
            ></button>
            <button 
                className="toolbar__btn rect" 
                onClick={() => toolstate.setTool( new Rect (canvasstate.canvas))}
            ></button>
            <button 
                className="toolbar__btn circle" 
                onClick={() => toolstate.setTool( new Circle (canvasstate.canvas))}
            ></button>
            <button 
                className="toolbar__btn eraser" 
                onClick={() => toolstate.setTool( new Eraser (canvasstate.canvas))}
            ></button>
            <button 
                style={{marginRight: 10}} 
                className="toolbar__btn line" 
                onClick={() => toolstate.setTool( new Line (canvasstate.canvas))}
            ></button>
            <input type="color" onChange={changeColor}/>
            <button className="toolbar__btn undo" onClick={() => canvasstate.undo()}></button>
            <button className="toolbar__btn redo" onClick={() => canvasstate.redo()}></button>
            <button className="toolbar__btn save"></button>
        </div>
    );
}

export default Toolbar;
