import React, { useContext } from "react";
import { AppContext } from "../../App";
import { HARD_MODE, HARD_NUM_LETTERS, NORMAL_MODE, NORMAL_NUM_LETTERS } from "../../constants/GameConstants";
import Tile from '../tile/Tile'
import '../board/Board.css'

//This component represents normal mode board or hard mode board and has Tile component as child.
function Board() {
    const { gameDifficulty } = useContext(AppContext);
    const boardRows = [];
    const numTiles = gameDifficulty === HARD_MODE ? HARD_NUM_LETTERS : NORMAL_NUM_LETTERS;

    for(let row = 0; row < 5 + (gameDifficulty === NORMAL_MODE ? 1 : 0); row++){
        const rowTiles = [];
        for(let col = 0; col < numTiles; col++) {
            rowTiles.push(
                <Tile attemptedValue={row} letterPosition = {col} key = {`${row}+${col}`}/>
            );
        }
        boardRows.push(<div className="board-row" key={row}>{rowTiles}</div>)
    }

    return (
        <div className="board"> {boardRows} </div>
    )
}

export default Board