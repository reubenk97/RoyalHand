import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const JoinLobby = (props) => {
    const {setPlayerInfo} = props;
    const [newPlayer, setNewPlayer] = useState({
        lobbyId: '',
        nickname: '',
        avatar: '🧔'
    });
    const nav = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        setPlayerInfo({nickname : newPlayer.nickname, avatar : newPlayer.avatar});
        nav('/lobbies/1');
    }

    return (
        <div className="lobby">
            <h1>Join a Lobby</h1>
            <form>
                <div className="left-col">
                    <label htmlFor="lobbyId">Lobby ID</label>
                    <label htmlFor="nickname">Nickname</label>
                    <label htmlFor="avatar">Avatar</label>
                </div>
                <div className="right-col">
                    <input id="lobbyId" name="lobbyId" value={newPlayer.lobbyId} onChange={e => setNewPlayer(prevNewPlayer => ({...prevNewPlayer, [e.target.name] : e.target.value}))}/>
                    <input id="nickname" name="nickname" onChange={e => setNewPlayer(prevNewPlayer => ({...prevNewPlayer, [e.target.name] : e.target.value}))}/>
                    <select id="avatar" name="avatar" onChange={e => setNewPlayer(prevNewPlayer => ({...prevNewPlayer, [e.target.name] : e.target.value}))}>
                        <option value="🧔">🧔</option>
                        <option value="👩">👩</option>
                        <option value="🧒">🧒</option>
                        <option value="👧">👧</option>
                    </select>
                </div>
            </form>
            <div className="button-group">
                <Button type={'back'}>back</Button>
                <button type="submit" onClick={handleSubmit}>Join Game</button>
            </div>
        </div>
    );
}

export default JoinLobby;