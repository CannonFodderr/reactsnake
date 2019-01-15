import React from 'react';
import GameContext from '../../contexts/GameContext';

class VolumeControls extends React.Component{
    renderControls = () => {
        return (
        <div>
            <label>
                <input type="checkbox" className="nes-checkbox" checked={this.context.isMuted} onChange={() => {this.context.muteAudio()}}/>
                <span>Mute Sound</span>
            </label>
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