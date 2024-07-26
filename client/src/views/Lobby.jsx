import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import io from 'socket.io-client';

const Lobby = (props) => {
    const { playerInfo } = props;
    const { lobbyId } = useParams();
    const [socket] = useState(() => io(':8000'));
    const [playerList, setPlayerList] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const onPlayers = (players) => {
            setPlayerList(players);
        }
        const onDisconnect = () => {
            console.log("disconnect");
        }
        const onStart = () => {
            nav('/lobbies/1/play');
        }

        socket.emit("new player", playerInfo);

        socket.on("players", onPlayers);
        socket.on("disconnect", onDisconnect);
        socket.on("start game", onStart);

        return () => {
            socket.off("players", onPlayers);
            socket.off("disconnect", onDisconnect);
            socket.off("start game", onStart);
        };
    }, [socket]);

    const handleStartGame = () => {
        socket.emit("start");
        nav('/lobbies/1/play');
    }

    return (
        <div className="lobby">
            <div className="lobby-head">
                <h3>Lobby</h3>
                <p>Lobby ID: {lobbyId}</p>
            </div>
            <fieldset className="player-group">
                <legend>Players ({playerList.length}/4)</legend>
                {playerList.map((player, idx) => 
                    <div key={idx}>
                        {/* <p>{player.id}</p> */}
                        {/* Player tile host - avatar and nickname */}
                        <h3>{player.avatar}</h3>
                        <p>{player.nickname}</p>
                    </div>
                )}
            </fieldset>
            <div className='lobby-game-footer'>
                <div>
                    <label htmlFor="gameMode">Game Mode: </label>
                    <select name="gameMode" id="gameMode">
                        <option>VC</option>
                        <option disabled>Lucky</option>
                    </select>
                </div>
                <div className="button-group">
                    <Button type={'leave'}>Leave</Button>
                    {playerInfo.uuid == playerList[0]?.uuid ? <button onClick={handleStartGame} disabled={playerList?.length > 1 ? false : true}>Start Game</button> : null}
                </div>
            </div>
        </div>
    );
}

export default Lobby;