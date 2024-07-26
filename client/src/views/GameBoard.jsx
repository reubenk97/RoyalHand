import { useEffect, useState } from "react";
import pokerBack from "../assets/poker-background.avif";
import io from 'socket.io-client';
import axios from 'axios';
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
        axios.get("https://www.deckofcardsapi.com/api/deck/new/draw/?count=26")
            .then(res => {
                console.log(res.data);
                for(let i = 0; i < res.data.cards.length-1; i+=2) {
                    setPlayerOneHand(prevOneHand => [...prevOneHand, res.data.cards[i]]);
                    setPlayerTwoHand(prevTwoHand => [...prevTwoHand, res.data.cards[i+1]]);
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const onPlayers = (players) => {
            setPlayerOne(players[0]);
            setPlayerTurn(players[0]);
            setPlayerTwo(players[1]);
        }

        socket.emit("player list");
        socket.on("players", onPlayers);

        socket.emit("player hands", playerOneHand, playerTwoHand);
        socket.on("current hands", (pOneHand, pTwoHand) => {
            setPlayerOneHand(pOneHand);
            setPlayerTwoHand(pTwoHand);
        })

        socket.on("current pile and turn", (pileCard, currTurn) => {
            setPlayPileCard(pileCard);
            setPlayerTurn(currTurn);
        })

        return () => {
            socket.off("players", onPlayers);
        }
    }, [socket])

    const playerMove = (card) => {
        console.log("player " + playerInfo.nickname + " made a move with " + card.code);
        if (playerInfo.uuid == playerOne.uuid) {
            setPlayerOneHand(prevHand => prevHand.filter(handCard => !(handCard.code == card.code)));
        }
        else {
            setPlayerTwoHand(prevHand => prevHand.filter(handCard => !(handCard.code == card.code)));
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
                    {playerInfo.uuid == playerTurn?.uuid ? <div className="turn">Your Turn!</div> : <div className="turn">Waiting on {playerTurn?.nickname}'s Turn...</div>}
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