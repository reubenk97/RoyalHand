import { useState } from "react";
import Button from "../components/Button";

const JoinLobby = () => {
    const [newPlayer, setNewPlayer] = useState({
        lobbyId: '',
        nickname: '',
        avatar: ''
    });

    return (
        <div className="lobby">
            <h1>Join a Lobby</h1>
            <form>
                <div>
                    <label htmlFor="lobbyId">Lobby ID</label>
                    <label htmlFor="nickname">Nickname</label>
                    <label htmlFor="avatar">Avatar</label>
                </div>
                <div>
                    <input id="lobbyId" name="lobbyId" value={newPlayer.lobbyId} onChange={e => setNewPlayer(prevNewPlayer => ({...prevNewPlayer, [e.target.name] : e.target.value}))}/>
                    <input id="nickname" name="nickname" onChange={e => setNewPlayer(prevNewPlayer => ({...prevNewPlayer, [e.target.name] : e.target.value}))}/>
                    <select id="avatar" name="avatar" onChange={e => setNewPlayer(prevNewPlayer => ({...prevNewPlayer, [e.target.name] : e.target.value}))}>
                        <option value="A1">🧔</option>
                        <option value="A2">👩</option>
                        <option value="A3">🧒</option>
                        <option value="A4">👧</option>
                    </select>
                </div>
            </form>
            <div className="button-group">
                <Button type={'back'}>Back</Button>
                <Button type={'join game'} id={newPlayer.lobbyId}>Join Game</Button>
            </div>
        </div>
    );
}

export default JoinLobby;