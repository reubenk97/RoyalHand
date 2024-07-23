import { useEffect } from "react";
import pokerBack from "../assets/poker-background.avif";
import Button from "../components/Button";

const GameBoard = (props) => {
    const { setBackImage } = props;

    useEffect(() => {
        setBackImage(pokerBack);
    }, [])

    return (
        <div className="game-board">
            <div className="game-board-top">
                <div className="game-board-header">
                    <Button type={'leave'} />
                    <h2>VC</h2>
                    <p className="tooltip">i</p>
                </div>
                <div className="player-hand">
                    <div>Player 1 Avatar</div>
                    <div>Player 1 Name</div>
                    <div>Player 1 Hand</div>
                    {/* <div>Player 1 Section</div> */}
                </div>
            </div>
            <div className="game-board-middle">
                {/* <div>Deck</div> */}
                <div className="card-pile">Play Pile</div>
                <div className="card-pile">Discard Pile</div>
            </div>
            <div className="player-hand">
                {/* <div>Host Section</div> */}
                <div>Host Avatar</div>
                <div>Host Name</div>
                <div>Host Hand</div>
            </div>
            {/* <div>Player 2 Hand</div>
            <div>Player 3 Hand</div> */}
        </div>
    );
}

export default GameBoard;