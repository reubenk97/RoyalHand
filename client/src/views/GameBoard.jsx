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
            <div className="player-hand">
                <Button type={'leave'} />
                <div>VC</div>
                <div>Player 1 Hand</div>
                {/* <div>Player 1 Section</div> */}
            </div>
            <div className="game-middle">
                {/* <div>Deck</div> */}
                <div className="card-pile">Play Pile</div>
                <div className="card-pile">Discard Pile</div>
            </div>
            <div>
                {/* <div>Host Section</div> */}
                <div>Host Hand</div>
            </div>
            {/* <div>Player 2 Hand</div>
            <div>Player 3 Hand</div> */}
        </div>
    );
}

export default GameBoard;