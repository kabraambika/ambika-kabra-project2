import './App.css'
import { useParams } from 'react-router'
import { useContext } from 'react'
import Keyboard from './components/keyboard/Keyboard'
import Board from './components/board/Board'
import GameError from './components/modals/GameError'
import GameOver from './components/modals/GameOver'
import { AppContext } from './context/GameState'
import { useGameDifficulty, useGameReset, useWordSet } from './lib/GameLogic'

//Entry point for game
function App() {
  const { state, dispatch } = useContext(AppContext);
  const pathParameters = useParams();
  
  useGameDifficulty(pathParameters.difficulty, dispatch);
  useGameReset(state.gameReset, state.gameDifficulty, state.gameBoard, dispatch);
  useWordSet(state.gameDifficulty, dispatch);
  return (
    <div className="App">
        <div className={"app-container d-flex justify-content-center " + (state.gameOver.gameOver ? " game-over-container" : "")}>
          {state.gameError.isError && <div className='position-absolute game-error-container'><GameError/></div>}
          {state.gameOver.gameOver ? <div className='gameover-overlay'><GameOver/></div> : <><Board/><Keyboard/></>}
        </div>
    </div>
  )
}

export default App
