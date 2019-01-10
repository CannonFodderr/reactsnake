import React from 'react';
import GameContext from '../../contexts/GameContext';
import "./Controls.css";
import { touchController } from '../../controllers/playerController';

class Controls extends React.Component{
    handleUserInput = (cmd) => {
        const input = touchController(cmd, this.context.playerDirection, this.context.playerHeadPosition, this.context.gridRowNumItems )
            if(input.id){
                this.context.setPlayerDirection({x: input.x, y: input.y})
            }
    }
    renderControls = () => {
        if(!this.context.isOnMobile || this.context.showMenu){
            return <div></div>
        }
        return(
            <table className="nes-table is-bordered is-centered is-dark controls-table" style={{width: this.context.boardSize}}>
                <tbody>
                    <tr>
                        <td></td>
                        <td><button onTouchStart={() => {this.handleUserInput("UP")}} className="nes-btn is-primary up controls-btn">↑</button></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><button onTouchStart={() => {this.handleUserInput("LEFT")}} className="nes-btn is-primary left controls-btn">←</button></td>
                        <td></td>
                        <td><button onTouchStart={() => {this.handleUserInput("RIGHT")}} className="nes-btn is-primary right controls-btn">→</button></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button onTouchStart={() => {this.handleUserInput("DOWN")}} className="nes-btn is-primary down controls-btn">↓</button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        )
    }
    render(){
        return(
            <div className=" nes-container controls">{this.renderControls()}</div>
        )
    }
}

Controls.contextType = GameContext;
export default Controls;
