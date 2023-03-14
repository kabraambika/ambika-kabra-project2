import React, { useContext } from "react";
import { AppContext } from "../../App";
import { HARD_MODE, NORMAL_MODE } from "../../constants/GameConstants";
import Tile from '../tile/Tile'
import '../board/Board.css'

function Board() {
    const { gameDifficulty } = useContext(AppContext);
    return (
        <div className="board">
            <div className="board-row">
                <Tile attemptedValue={0} letterPosition={0}/>
                <Tile attemptedValue={0} letterPosition={1}/>
                <Tile attemptedValue={0} letterPosition={2}/>
                <Tile attemptedValue={0} letterPosition={3}/>
                <Tile attemptedValue={0} letterPosition={4}/>
                <Tile attemptedValue={0} letterPosition={5}/>
                {gameDifficulty === HARD_MODE && <Tile attemptedValue={0} letterPosition={6}/>}
            </div>
            <div className="board-row">
                <Tile attemptedValue={1} letterPosition={0}/>
                <Tile attemptedValue={1} letterPosition={1}/>
                <Tile attemptedValue={1} letterPosition={2}/>
                <Tile attemptedValue={1} letterPosition={3}/>
                <Tile attemptedValue={1} letterPosition={4}/>
                <Tile attemptedValue={1} letterPosition={5}/>
                {gameDifficulty === HARD_MODE && <Tile attemptedValue={1} letterPosition={6} />}
            </div>
            <div className="board-row">
                <Tile attemptedValue={2} letterPosition={0} />
                <Tile attemptedValue={2} letterPosition={1} />
                <Tile attemptedValue={2} letterPosition={2}/>
                <Tile attemptedValue={2} letterPosition={3}/>
                <Tile attemptedValue={2} letterPosition={4}/>
                <Tile attemptedValue={2} letterPosition={5}/>
                {gameDifficulty === HARD_MODE && <Tile attemptedValue={2} letterPosition={6}/>}
            </div>
            <div className="board-row">
                <Tile attemptedValue={3} letterPosition={0}/>
                <Tile attemptedValue={3} letterPosition={1}/>
                <Tile attemptedValue={3} letterPosition={2}/>
                <Tile attemptedValue={3} letterPosition={3}/>
                <Tile attemptedValue={3} letterPosition={4}/>
                <Tile attemptedValue={3} letterPosition={5}/>
                {gameDifficulty === HARD_MODE && <Tile attemptedValue={3} letterPosition={6}/>}
            </div>
            <div className="board-row">
                <Tile attemptedValue={4} letterPosition={0}/>
                <Tile attemptedValue={4} letterPosition={1}/>
                <Tile attemptedValue={4} letterPosition={2}/>
                <Tile attemptedValue={4} letterPosition={3}/>
                <Tile attemptedValue={4} letterPosition={4}/>
                <Tile attemptedValue={4} letterPosition={5}/>
                {gameDifficulty === HARD_MODE && <Tile attemptedValue={4} letterPosition={6}/>}
            </div>
            {
                gameDifficulty === NORMAL_MODE &&
                <div className="board-row">
                    <Tile attemptedValue={5} letterPosition={0}/>
                    <Tile attemptedValue={5} letterPosition={1}/>
                    <Tile attemptedValue={5} letterPosition={2}/>
                    <Tile attemptedValue={5} letterPosition={3}/>
                    <Tile attemptedValue={5} letterPosition={4}/>
                    <Tile attemptedValue={5} letterPosition={5}/>
                </div>
            }
        </div>
    )
}

export default Board