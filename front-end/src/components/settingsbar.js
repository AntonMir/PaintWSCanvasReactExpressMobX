import React from 'react';
// styled
import '@styles/settingsbar.scss'
import toolstate from '../store/toolstate';

const Settingsbar = () => {
    return (
        <div className="settings-bar">
            <label style={{margin: '0 0 0 20px'}}  to="line-width">Толщина линии</label>
            <input 
                onChange={e => toolstate.setLineWidth(e.target.value)}
                style={{margin: '0 10px 0 10px'}} 
                id="line-width" 
                type="number" 
                defaultValue={1} 
                min={1} 
                max={50}
            />
            <label style={{margin: '0 10px 0 10px'}}  to="stroke-color">Цвет обводки</label>
            <input 
                onChange={e => toolstate.setStrokeColor(e.target.value)}
                style={{margin: '0 10px 0 10px'}} 
                id="stroke-color" 
                type="color" 
            />
        </div>
    );
}

export default Settingsbar;
