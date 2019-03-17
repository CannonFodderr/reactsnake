import React from 'react';
import GameContext from '../../contexts/GameContext';
import './Tail.css';
// 
class Tail extends React.Component{
    renderTail = tailArr => {
        return tailArr.map((tailBlock, index) => {
            if(tailBlock === tailBlock[tailArr.length]){
                return <div></div>
            } else {
                return <div 
                className="nes-btn is-warning"
                key={index}
                style={{
                    height: this.context.gridBlockSize,
                    width: this.context.gridBlockSize,
                    position: "absolute",
                    transform: `translate(${this.context.gridArr[tailBlock].x}px, ${this.context.gridArr[tailBlock].y}px)`,
                    top: "0px",
                    left: "0px"
                }}
                ></div>
            }
        });
    }
    render(){
        return(
            <div>{this.renderTail(this.context.tailArr)}</div>
            )
        }
    }
    
    Tail.contextType = GameContext;
    export default Tail;