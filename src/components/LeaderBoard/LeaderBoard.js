import React from 'react';
import GameContext from '../../contexts/GameContext';

class LeaderBoard extends React.Component{
    renderLeaderBoards(){
        if(this.context.leaderBoards.length === 0){
            return <tr style={{textAlign:"center", background: "#3e3e"}}><td>Loading...</td></tr>
        } else {
            return this.context.leaderBoards.map((item, index) => {
                if(index === 0){
                    return <tr key={item._id} style={{textAlign:"center", background: "#3e3e"}}><td>{item.name}</td><td> {item.score}</td></tr>
                }
                return <tr key={item._id} style={{textAlign:"center"}}><td>{item.name}</td><td> {item.score}</td></tr>
            });
        }
    }
    render(){
        return(
            <div>
            <h3 style={{textAlign:"center"}}>LEADERBOARDS</h3>
            <table className="nes-table is-centered is-bordered" style={{width: "100%"}}>
                <tbody>
                <tr style={{background:"#000", color:"#fff", borderRadius: "25%", letterSpacing:"0.5em"}}>
                    <th>NAME</th>
                    <th>SCORE</th>
                </tr>
                {this.renderLeaderBoards()}
                </tbody>
            </table>
            </div>
        )
    }
}

LeaderBoard.contextType = GameContext;
export default LeaderBoard;