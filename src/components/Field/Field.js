import React from 'react';
import GameContext from '../../contexts/GameContext';

class Field extends React.Component{
    render(){
        return(
            <div className="nes-field">
                <label htmlFor="playerName" style={{textAlign:"center"}}>Enter your name:</label>
                <input 
                className="nes-input" 
                name="playerName" 
                style={{textAlign:"center"}}
                placeholder={this.props.playerName} 
                onChange={(e) => {this.context.setPlayerName(e.target.value)}}
                maxLength="8"
                />
            </div>
        )
    }
}

Field.contextType = GameContext;
export default Field;