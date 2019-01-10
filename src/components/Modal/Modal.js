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
        let className = "nes-container modal"
        if(!this.context.showMenu){
            className = "nes-container modal hidden";
        }
        return (
            <React.Fragment>
            <div className={className} style={{width: "100vw", minHeight: "100vh"}}>
            <h1 style={{textAlign:"center"}}>SNAAAAAKE</h1>
            <button style={{width: "100%"}} className="nes-btn is-error" onClick={() => {this.context.setShowMenu()}}>
                {/* <i className="nes-icon close is-small"  /> */}
                <span className="start-btn">START</span>
            </button>
                {this.props.children}
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