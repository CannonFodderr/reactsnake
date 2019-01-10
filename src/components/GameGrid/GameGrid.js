import React from 'react';
import GameContext from '../../contexts/GameContext';

class GameGrid extends React.Component{
    renderGrid = gridArr => {
        return gridArr.map(gridItem => {
            return <div 
            key={gridItem.id} 
            style={{
            position:"absolute", 
            top: gridItem.y, 
            left: gridItem.x, 
            width: this.context.gridBlockSize,
            height: this.context.gridBlockSize
        }} 
            className="wireframe"></div>
        });
    }
    render(){
        return(
            <div>{this.renderGrid(this.context.gridArr)}</div>
        )
    };
};

GameGrid.contextType = GameContext;
export default GameGrid;