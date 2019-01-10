import React from 'react';
import GameContext from '../../contexts/GameContext';

class ScoreBoard extends React.Component{
    render(){
        return(
            <div 
            className="nes-container is-rounded"
            style={{width: "fit-content"}}
            ><h5>{this.context.playerName}</h5>
            SCORE: {this.context.score}</div>
        )
    }
}

ScoreBoard.contextType = GameContext;
export default ScoreBoard;