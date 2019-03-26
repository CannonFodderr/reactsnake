import React, {createContext} from 'react';
import leaderboards from '../api/leaderboards';
import axios from 'axios';
import { trigger, setSynthVolume } from '../audio/tone';
const Context = createContext();

const config = {
    isMuted: false,
    volume: -10
}

const fetchLeaderboards = async () => {
    const response = await leaderboards.get('/leaderboards');
    return response.data;
}

const gameOverConditions = ({playerHeadPosition, boardSize, gridBlockSize, playerDirection, tailArr}) => {
    if(!playerHeadPosition){
        return true;
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
    // Tail Conditions
    for(let i = 0; i < tailArr.length - 2; i++){
        if(tailArr[i] === playerHeadPosition.id){
            return true;
        }
    }
}
const scoreConditions = state => {
    if(state.playerHeadPosition && state.playerHeadPosition.id === state.pickupPosition.id){
        return true;
    }
    return false;
}
const getRandomCoords = state => {
    const i = Math.floor(Math.random() * state.gridArr.length - 1);
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
    leaderBoards: [],
    fps: 10,
    interval: null,
    now: Date.now(),
    then: null,
    isMuted: config.isMuted,
    volume: config.volume
}

export class GameContextStore extends React.Component{
    state = INITIAL_STATE;
    setBorders = gameBoardBorders => {
        this.setState({gameBoardBorders});
        this.generateGrid();
    }
    generateGrid = (gridBlockSize) => {
        const gridRowNumItems = Math.round(this.state.boardSize / this.state.gridBlockSize);
        function generateGridCol(arr = [], index = 0){
            if(index >= gridRowNumItems) return arr;
            for(let i = 0; i <= gridRowNumItems -1; i++){
                let x = i * gridBlockSize;
                let y = index * gridBlockSize;
                arr.push({x, y, id: arr.length});
            }
            index++;
            return generateGridCol(arr, index);
        }
        let gridArr = generateGridCol();
        this.setState({gridArr, gridRowNumItems});
    }
    setBoardSize = () => {
        if(window.innerHeight > window.innerWidth){
            const boardSize = Math.round(window.innerWidth * 98 / 100);
            this.setState({boardSize});
        } else {
            const boardSize = Math.round(window.innerHeight * 98 / 100);
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
    startAnimation = () => {
        this.setState({interval: 1000 / this.state.fps, then: Date.now()})
        this.step();
    }
    stopAnimation = () => {
        window.cancelAnimationFrame(this.step);
    }
    step = () => {
        window.requestAnimationFrame(this.step);
        if(this.state.showMenu){
            return;
        }
        this.setState({now: Date.now()});
        let elpased = this.state.now - this.state.then;
        if(elpased > this.state.interval){
            this.setState({then: this.state.now})
            if(gameOverConditions(this.state)){
                if(!this.state.isMuted){
                    trigger("D3");
                }
                return this.reset();
            }
            
            if(scoreConditions(this.state)){
                const score = this.state.score + this.state.pickupValue;
                if(!this.state.isMuted){
                    trigger("D4");
                }
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
        }
    }
    muteAudio = () => {
        if(this.state.isMuted){
            config.isMuted = false;
            this.setState({ isMuted: false });
        } else {
            config.isMuted = true;
            this.setState({ isMuted: true });
        }
    }
    adjustAudioVolume = value => {
        const volume = this.state.volume + value
        if(volume >= -60 && volume <= 40){
            INITIAL_STATE.volume = volume;
            setSynthVolume(volume);
            this.setState({volume});
        }
    }
    reset = () => {
        this.stopAnimation();
        if(this.state.score > 0){
            const data = {name:this.state.playerName, score:this.state.score};
            axios.post('https://afternoon-earth-75642.herokuapp.com/leaderboards', data);
        }
        this.setState(INITIAL_STATE);
        this.setState({isMuted: config.isMuted});
        fetchLeaderboards().then((leaderBoards)=>{
            this.setState({leaderBoards});
        }).then(()=>{
            this.testIsOnMobile();
            this.setBoardSize();
            const gridBlockSize = this.state.boardSize / 20;
            this.setState({gridBlockSize});
            this.generateGrid(gridBlockSize);
            this.setPickupPosition();
            this.setState({playerDirection: {x:0, y:0}});
            this.centerPlayerPosition();
            this.startAnimation();
        })
    }
    componentDidMount(){
        window.addEventListener('resize', () => { this.reset()});
        this.reset();
    }
    render(){
        return(
            <Context.Provider 
            value={{ 
                ...this.state,
                setBorders: this.setBorders,
                setPlayerDirection: this.setPlayerDirection,
                setShowMenu: this.setShowMenu,
                setPlayerName: this.setPlayerName,
                muteAudio: this.muteAudio,
                adjustAudioVolume: this.adjustAudioVolume
            }}>
            {this.props.children}
            </Context.Provider>
            )
        }
    }
    
    export default Context;
    
    