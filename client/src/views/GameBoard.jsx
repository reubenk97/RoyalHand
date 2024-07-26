import { useEffect, useState } from "react";
import pokerBack from "../assets/poker-background.avif";
import io from 'socket.io-client';
import Button from "../components/Button";

const GameBoard = (props) => {
    const { setBackImage, playerInfo } = props;
    const [socket] = useState(() => io(':8000'));
    const [playerOne, setPlayerOne] = useState({});
    const [playerTwo, setPlayerTwo] = useState({});
    const [playerOneHand, setPlayerOneHand] = useState([]);
    const [playerTwoHand, setPlayerTwoHand] = useState([]);
    const [playerTurn, setPlayerTurn] = useState({});
    const [playPileCard, setPlayPileCard] = useState();

    useEffect(() => {
        setBackImage(pokerBack);
    }, [])

    useEffect(() => {
        const onPlayers = (players) => {
            setPlayerOne(players[0]);
            setPlayerTurn(players[0]);
            setPlayerTwo(players[1]);
        };
        const onPlayerHands = (p1Hand, p2Hand) => {
            setPlayerOneHand(p1Hand);
            setPlayerTwoHand(p2Hand);
        };
        const onSetOneHand = (pOneHand) => {
            setPlayerOneHand(pOneHand);
        };
        const onSetTwoHand = (pTwoHand) => {
            setPlayerTwoHand(pTwoHand);
        };
        const onSetPileCardAndTurn =  (pileCard, currTurn) => {
            setPlayPileCard(pileCard);
            setPlayerTurn(currTurn);
        };

        socket.emit("player list");
        socket.on("players", onPlayers);
        socket.on("player hands", onPlayerHands);
        socket.on("current 1 hand", onSetOneHand);
        socket.on("current 2 hand", onSetTwoHand);
        socket.on("current pile and turn", onSetPileCardAndTurn);

        return () => {
            socket.off("players", onPlayers);
            socket.off("player hands", onPlayerHands);
            socket.off("current 1 hand", onSetOneHand);
            socket.off("current 2 hand", onSetTwoHand);
            socket.off("current pile and turn", onSetPileCardAndTurn);
        }
    }, [socket])

    const playerMove = (card) => {
        console.log("player " + playerInfo.nickname + " made a move with " + card.code);
        if (playerInfo.uuid == playerOne.uuid) {
            let updatedPlayerOneHand = playerOneHand.filter(handCard => !(handCard.code == card.code));
            socket.emit("player hand 1 update", updatedPlayerOneHand);
            // setPlayerOneHand(prevHand => prevHand.filter(handCard => !(handCard.code == card.code)));
        }
        else {
            let updatedPlayerTwoHand = playerTwoHand.filter(handCard => !(handCard.code == card.code));
            socket.emit("player hand 2 update", updatedPlayerTwoHand);
            // setPlayerTwoHand(prevHand => prevHand.filter(handCard => !(handCard.code == card.code)));
        }
        socket.emit("player move", card);
    }

    return (
        <div className="game-board">
            <div className="game-board-top">
                <div className="game-board-header">
                    <Button type={'leave'} />
                    <h3>Donkey</h3>
                    <p className="tooltip">i</p>
                </div>
                {playerInfo.uuid == playerTwo.uuid ? 
                <div className="player-hand">
                    <div>{playerOne?.nickname}</div>
                    <div>{playerOne?.avatar}</div>
                    <div>{playerOneHand?.map((card, idx) => <img key={idx} src="https://www.deckofcardsapi.com/static/img/back.png" className="card-img in-hand" /> )}</div>
                </div> :
                <div className="player-hand">
                    <div>{playerTwo?.nickname}</div>
                    <div>{playerTwo?.avatar}</div>
                    <div>{playerTwoHand?.map((card, idx) => <img key={idx} src="https://www.deckofcardsapi.com/static/img/back.png" className="card-img in-hand" /> )}</div>
                </div>
                }
            </div>
            <div className="game-board-middle">
                {/* <div>Deck</div> */}
                <div className="card-piles">
                    <div className="card-pile"><img src={playPileCard?.image} className="card-img"/></div>
                    <div className="card-pile">Discard</div>
                </div>
                <div className="turn-info">
                    {playerInfo.uuid == playerTurn?.uuid ? <div className="turn" style={{color: "chartreuse"}}>Your Turn!</div> : <div className="turn">Waiting on {playerTurn?.nickname}'s Turn...</div>}
                    {/* {playerInfo.uuid == playerTurn?.uuid ? <button>Skip</button> : null} */}
                </div>
            </div>
            {playerInfo.uuid == playerOne.uuid ? 
                <div className="player-hand">
                    <div>{playerOne?.nickname}</div>
                    <div>{playerOne?.avatar}</div>
                    <div>{playerOneHand?.map((card, idx) => <img key={idx} src={card.image} alt="card" className="card-img in-hand your-hand" onClick={playerInfo.uuid == playerTurn?.uuid ? () => playerMove(card) : null}/> )}</div>
                </div> :
                <div className="player-hand">
                    <div>{playerTwo?.nickname}</div>
                    <div>{playerTwo?.avatar}</div>
                    <div>{playerTwoHand?.map((card, idx) => <img key={idx} src={card.image} alt="card" className="card-img in-hand your-hand" onClick={playerInfo.uuid == playerTurn?.uuid ? () => playerMove(card) : null}/>)}</div>
                </div>
                }
            {/* <div>Player 2 Hand</div>
            <div>Player 3 Hand</div> */}
        </div>
    );
}

export default GameBoard;