import React from 'react';
import {GameContextStore} from '../contexts/GameContext';

import GameBoard from './GameBoard/GameBoard';
import Controls from './Controls/Controls';
import Modal from './Modal/Modal';
import Field from './Field/Field';
import Tutorial from './Tutorial/Tutorial';
import LeaderBoard from './LeaderBoard/LeaderBoard';

class App extends React.Component{
    render(){
        return(
            <div>
                <GameContextStore>
                    <GameBoard />
                    <Controls />
                    <Modal>
                        <div>
                            <Field playerName="Player 1"/>
                            <Tutorial />
                            <LeaderBoard />
                        </div>
                    </Modal>
                </GameContextStore>
            </div>
        )
    }
}

export default App;