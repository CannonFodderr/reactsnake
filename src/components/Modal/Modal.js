import React from 'react';
import GameContext from '../../contexts/GameContext';
import './Modal.css';

class Modal extends React.Component{
    componentDidMount() {
        window.addEventListener('keypress', (e) => {
            switch(e.which){
                case 13: return this.context.setShowMenu();
                default: return null;
            }
        })
    }
    renderModal() {
        if(!this.context.showMenu){
            return(
                <div></div>
            )
        }
        let className = "nes-container modal"
        if(!this.context.showMenu){
            className = "nes-container modal hidden";
        }
        return (
            <React.Fragment>
            <div className={className} style={{maxWidth: "99vw", minHeight: "100vh"}}>
            <h1 style={{textAlign:"center"}}>SNAAAAAKE</h1>
            <h4 style={{textAlign:"center"}}><a href="https://github.com/CannonFodderr/reactsnake">Fork me on GitHub</a></h4>
            <button style={{width: "100%"}} className="nes-btn is-error" onClick={() => {this.context.setShowMenu()}}>
                <span className="start-btn">START</span>
            </button>
                {this.props.children}
                <hr/>
                <h4>By<a href="https://www.linkedin.com/in/idan-izhaki/"> Idan Izhaki</a></h4>
            </div>
            </React.Fragment>
        )
    }
    render(){
        return(
            <div>
                {this.renderModal()}
            </div>
        )
    }
}

Modal.contextType = GameContext;
export default Modal;