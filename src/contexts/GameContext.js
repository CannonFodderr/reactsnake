import React, {createContext} from 'react';
import leaderboards from '../api/leaderboards';
import axios from 'axios';

const Context = createContext();

const fetchLeaderboards = async () => {
    const response = await leaderboards.get('/leaderboards');
    return response.data;
}

const gameOverConditions = ({playerHeadPosition, boardSize, gridBlockSize, playerDirection, tailArr}) => {
    if(!playerHeadPosition){
        return true;
    }
    // Tail Conditions
    for(let i = 0; i < tailArr.length - 2; i++){
        if(tailArr[i] === playerHeadPosition.id){
            return true;
        }
    }
    // Bounds Conditions
    if(playerHeadPosition.x <= 0 && playerDirection.x === -1){
        return true;
    }
    if(playerHeadPosition.x + gridBlockSize + 1 >= boardSize && playerDirection.x === 1){
        return true;
    }
    if(playerHeadPosition.y <= 0 && playerDirection.y < 0){
        return true;
    }
    if(playerHeadPosition.y + gridBlockSize  >= boardSize && playerDirection.y > 0){
        return true;
    }
}
const scoreConditions = state => {
    if(state.playerHeadPosition && state.playerHeadPosition.id === state.pickupPosition.id){
        return true;
    }
    return false;
}
const getRandomCoords = state => {
    const i = Math.round(Math.random() * state.gridArr.length);
    return state.gridArr[i];
}

const INITIAL_STATE = {
    isOnMobile: false,
    isGameOver: true,
    showMenu: true,
    score: 0,
    boardSize: 300,
    gridBlockSize: 25,
    gridRowNumItems: 0,
    gridArr: [],
    playerDirection: {x: 0, y: 0},
    playerHeadPosition: {x: 0, y: 0, id: 0},
    pickupPosition: {x: 0, y: 0, id: 0},
    pickupValue: 1,
    tailArr: [],
    playerName: "Player 1",
    leaderBoards: []
}

export class GameContextStore extends React.Component{
    state = INITIAL_STATE;
    setBorders = async gameBoardBorders => {
        await this.setState({gameBoardBorders});
        this.generateGrid();
    }
    generateGrid = async () => {
        const gridRowNumItems = Math.round(this.state.boardSize / this.state.gridBlockSize);
        const gridArr = [];
        for(let i = 0; i <= gridRowNumItems -1; i++){
            for(let j = 0; j <= gridRowNumItems -1; j++){
                let y = i * this.state.gridBlockSize;
                let x = j * this.state.gridBlockSize;
                gridArr.push({x, y, id: gridArr.length});
            }
        }
        this.setState({gridArr, gridRowNumItems});
    }
    setBoardSize = () => {
        if(window.innerHeight > window.innerWidth){
            const boardSize = Math.round(window.innerWidth * 99 / 100);
            this.setState({boardSize});
        } else {
            const boardSize = Math.round(window.innerHeight * 99 / 100);
            this.setState({boardSize});
        }
    }
    setPlayerDirection = (playerDirection) => {
        this.setState({playerDirection});
    }
    centerPlayerPosition = () => {
        const centerPosition = Math.round(this.state.gridArr.length / 2) + Math.round(this.state.gridBlockSize / 2);
        this.setState({playerHeadPosition: this.state.gridArr[centerPosition + 12]});
    }
    setPickupPosition = () => {
        let pickupPosition = getRandomCoords(this.state);
        // Prevent pickup spawning in tail
        if(pickupPosition && pickupPosition.id in this.state.tailArr ){
            this.setPickupPosition();
        } else {
            this.setState({pickupPosition});
        }
    }
    generateTailArr = () => {
        if(!this.state.playerHeadPosition){
            return;
        }
        if(!this.state.tailArr.indexOf(this.state.playerHeadPosition.id)){
            const tailArr = [ ...this.state.tailArr, this.state.playerHeadPosition.id ];
            if(tailArr.length > this.state.score){
                tailArr.shift();
            }
        }
        const tailArr = [ ...this.state.tailArr, this.state.playerHeadPosition.id ];
        if(tailArr.length > this.state.score){
            tailArr.shift();
        }
        this.setState({tailArr});
    }
    setShowMenu = () => {
        if(this.state.showMenu){
            this.setState({showMenu: false});
        } else {
            this.setState({showMenu: true});
        }
    }
    setPlayerName = playerName => {
        INITIAL_STATE.playerName = playerName;
        this.setState({playerName, isGameOver: false});
    }
    testIsOnMobile = () => {
        // device detection
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.setState({isOnMobile: true});
           } else {
               this.setState({isOnMobile: false});
           }
    }
    reset = async () => {
        if(this.state.score > 0){
            const data = {name:this.state.playerName, score:this.state.score};
            await axios.post('https://afternoon-earth-75642.herokuapp.com/leaderboards', data);
        }
        fetchLeaderboards().then((leaderBoards)=>{
            this.setState({leaderBoards});
        });
        this.setState(INITIAL_STATE);
        await this.testIsOnMobile();
        await this.setBoardSize();
        const gridBlockSize = await this.state.boardSize / 20;
        await this.setState({gridBlockSize});
        await this.generateGrid();
        await this.setPickupPosition();
        await this.centerPlayerPosition();
    }
    componentDidMount(){
        window.addEventListener('resize', () => { this.reset()})
        this.reset().then(() => {
            setInterval(() => {
                if(this.state.showModal){
                    return;
                }
                this.generateTailArr();
                if(gameOverConditions(this.state)){
                    console.log("Game Over")
                    return this.reset();
                }
                if(scoreConditions(this.state)){
                    const score = this.state.score + this.state.pickupValue;
                    this.setPickupPosition()
                    this.setState({score});
                }
                if(this.state.playerDirection.y === -1){
                    const playerHeadPosition = this.state.gridArr[this.state.playerHeadPosition.id - this.state.gridRowNumItems]
                    this.setState({playerHeadPosition});
                    this.generateTailArr();
                }
                if(this.state.playerDirection.y === 1){
                    const playerHeadPosition = this.state.gridArr[this.state.playerHeadPosition.id + this.state.gridRowNumItems]
                    this.setState({playerHeadPosition});
                    this.generateTailArr();
                }
                if(this.state.playerDirection.x === -1){
                    const playerHeadPosition = this.state.gridArr[this.state.playerHeadPosition.id - 1]
                    this.setState({playerHeadPosition});
                    this.generateTailArr();
                }
                if(this.state.playerDirection.x === 1){
                    const playerHeadPosition = this.state.gridArr[this.state.playerHeadPosition.id + 1]
                    this.setState({playerHeadPosition});
                    this.generateTailArr();
                }
            }, 100)
        });
    }
    render(){
        return(
            <Context.Provider 
            value={{ 
                ...this.state,
                setBorders: this.setBorders,
                setPlayerDirection: this.setPlayerDirection,
                setShowMenu: this.setShowMenu,
                setPlayerName: this.setPlayerName
                }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Context;

