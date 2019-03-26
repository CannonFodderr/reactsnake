import React from 'react';
import GameContext from '../../contexts/GameContext';
import './GameBoard.css';

// import GameGrid from '../GameGrid/GameGrid';
import Player from '../Player/Player';
import Tail from '../Tail/Tail';
import Pickup from '../Pickup/Pickup';
import ScoreBoard from '../ScoreBoard/ScoreBoard';

class GameBoard extends React.Component{
    renderGameBoard = () => {
        if(this.context.showMenu){
            return <div></div>
        }
        return (
            <div 
            ref={(divElement) => this.divElement = divElement}
            className="nes-container is-dark"
            style={{width: this.context.boardSize, height: this.context.boardSize, margin: "0", border:"none"}}
            >
                {/* <GameGrid /> */}
                <ScoreBoard />
                <Pickup />
                <Tail />
                <Player />
            </div>
        )
    }

    render(){
        return(
            <div>{this.renderGameBoard()}</div>
        )
    };
};

GameBoard.contextType = GameContext;
export default GameBoard;