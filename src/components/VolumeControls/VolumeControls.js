import React from 'react';
import GameContext from '../../contexts/GameContext';

class VolumeControls extends React.Component{
    renderCheckBox = () => {
        return(
            <label>
                <input type="checkbox" className="nes-checkbox" checked={this.context.isMuted} onChange={() => {this.context.muteAudio()}}/>
                <span>Mute Sound</span>
            </label> 
        )
    }
    renderControls = () => {
        if(this.context.isMuted){
            return <div>{this.renderCheckBox() }</div>
        }
        return (
        <div>
            { this.renderCheckBox () }
            <div>
            <button className="nes-btn" onClick={() => {this.context.adjustAudioVolume(-5)}}>-</button>
            <button className="nes-btn" onClick={() => {this.context.adjustAudioVolume(5)}}>+</button>
            <progress className="nes-progress is-primary" value={this.context.volume + 60} max="100"></progress>
            </div>
        </div>
        )
    }
    render(){
        return (
            <div>
                {this.renderControls()}
            </div>
        )
        }
    }
    
    VolumeControls.contextType = GameContext;
    export default VolumeControls;