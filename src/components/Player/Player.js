import React from 'react';
import GameContext from '../../contexts/GameContext';
import './Player.css';
import { keyboardController } from '../../controllers/playerController';

class Player extends React.Component{
    handleInput = (e) => {
        if(!this.context.showMenu){
            const input = keyboardController(e, this.context.playerDirection, this.context.playerHeadPosition, this.context.gridRowNumItems )
            if(input.id){
                this.context.setPlayerDirection({x: input.x, y: input.y});
            }
        } else {
            this.context.setPlayerDirection({x: 0, y: 0});
        }
    }
    renderPlayerPosition = () => {
        if(!this.context.playerHeadPosition){
            return <div></div>
        }
        const gridBlock = this.context.gridArr[this.context.playerHeadPosition.id]
        if(gridBlock && gridBlock.id){
            return gridBlock;
        } else {
            return this.context.playerHeadPosition
        }
    }
    componentDidMount(){
        window.addEventListener('keydown', (e) => { this.handleInput(e) })
    }
    render(){
        return(
            <div 
            className="nes-btn is-primary"
            style={{
                width: this.context.gridBlockSize,
                height: this.context.gridBlockSize,
                position: "absolute",
                left: this.renderPlayerPosition().x,
                top: this.renderPlayerPosition().y
            }}
            ></div>
        )
    }
}

Player.contextType = GameContext;
export default Player;