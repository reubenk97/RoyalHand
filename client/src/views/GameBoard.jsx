import { useEffect, useState } from "react";
import pokerBack from "../assets/poker-background.avif";
import Button from "../components/Button";
import io from 'socket.io-client';
import axios from 'axios';

const GameBoard = (props) => {
    const { setBackImage, playerInfo } = props;
    const [socket] = useState(() => io(':8000'));
    const [playerOne, setPlayerOne] = useState({});
    const [playerTwo, setPlayerTwo] = useState({});
    const [playerOneHand, setPlayerOneHand] = useState([]);
    const [playerTwoHand, setPlayerTwoHand] = useState([]);

    useEffect(() => {
        setBackImage(pokerBack);
        const onPlayers = (players) => {
            setPlayerOne(players[0]);
            setPlayerTwo(players[1]);
        }

        socket.emit("player list");

        axios.get("https://www.deckofcardsapi.com/api/deck/new/draw/?count=26")
            .then(res => {
                console.log(res.data);
                for(let i = 0; i < res.data.cards.length-1; i+=2) {
                    setPlayerOneHand(prevOneHand => [...prevOneHand, res.data.cards[i]]);
                    setPlayerTwoHand(prevTwoHand => [...prevTwoHand, res.data.cards[i+1]]);
                }
            })
            .catch(err => console.log(err))
        socket.emit("player hands");

        socket.on("players", onPlayers);
    }, [socket])

    return (
        <div className="game-board">
            <div className="game-board-top">
                <div className="game-board-header">
                    {/* <Button type={'leave'} />
                    <h2>VC</h2>
                    <p className="tooltip">i</p> */}
                </div>
                {playerInfo.uuid == playerTwo.uuid ? 
                <div className="player-hand">
                    <div>{playerOne?.nickname}</div>
                    <div>{playerOne?.avatar}</div>
                    <div>{playerOneHand?.map((card, idx) => <img key={idx} src="https://www.deckofcardsapi.com/static/img/back.png" style={{width: 75}} /> )}</div>
                </div> :
                <div className="player-hand">
                    <div>{playerTwo?.nickname}</div>
                    <div>{playerTwo?.avatar}</div>
                    <div>{playerTwoHand?.map((card, idx) => <img key={idx} src="https://www.deckofcardsapi.com/static/img/back.png" style={{width: 75}} /> )}</div>
                </div>
                }
            </div>
            <div className="game-board-middle">
                {/* <div>Deck</div> */}
                <div className="card-pile">Play Pile</div>
                <div className="card-pile">Discard Pile</div>
            </div>
            {playerInfo.uuid == playerOne.uuid ? 
                <div className="player-hand">
                    <div>{playerOne?.nickname}</div>
                    <div>{playerOne?.avatar}</div>
                    <div>{playerOneHand?.map((card, idx) => <img key={idx} src={card.image} alt="card" style={{width: 75}}/> )}</div>
                </div> :
                <div className="player-hand">
                    <div>{playerTwo?.nickname}</div>
                    <div>{playerTwo?.avatar}</div>
                    <div>{playerTwoHand?.map((card, idx) => <img key={idx} src={card.image} alt="card" style={{width: 75}}/> )}</div>
                </div>
                }
            {/* <div>Player 2 Hand</div>
            <div>Player 3 Hand</div> */}
        </div>
    );
}

export default GameBoard;