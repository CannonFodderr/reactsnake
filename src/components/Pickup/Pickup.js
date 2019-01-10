import React from 'react';
import GameContext from '../../contexts/GameContext';
import '../Pickup/Pickup.css';


class Pickup extends React.Component{
    render(){
        return(
            <div 
            className="nes-btn is-success" 
            style={{
                width: this.context.gridBlockSize, 
                height: this.context.gridBlockSize,
                position:"absolute",
                top: this.context.pickupPosition.y,
                left: this.context.pickupPosition.x
            }}></div>
        )
    }
}

Pickup.contextType = GameContext;
export default Pickup;