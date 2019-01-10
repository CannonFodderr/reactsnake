import React from 'react';
import GameContext from '../../contexts/GameContext';

class Footer extends React.Component{
    render(){
        return(
                <div 
                style={{width: this.context.boardSize}}
                className="nes-container is-centered is-dark"><a target="_blank" href="https://idanprofile.herokuapp.com/">By Idan Izhaki</a></div>
            )
    }
}

Footer.contextType = GameContext;
export default Footer