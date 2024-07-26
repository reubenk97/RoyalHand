import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


const CreateLobby = (props) => {
    const {setPlayerInfo} = props;
    const [formInfo, setFormInfo] = useState({
        maxPlayers:'2',
        uuid: '',
        nickname: '',
        avatar: '🧔'
    })
    const nav = useNavigate();

    const handleMaxPlayers = e => {
        setFormInfo(prevFormInfo => ({...prevFormInfo, [e.target.name]:e.target.value}));
    }

    const handleNickname = e => {
        setFormInfo(prevFormInfo => ({...prevFormInfo, [e.target.name]:e.target.value}));
    }

    const handleAvatar = e => {
        setFormInfo(prevFormInfo => ({...prevFormInfo, [e.target.name]:e.target.value}));
    }

    const handleSubmit = e => {
        e.preventDefault();
        setPlayerInfo({uuid: self.crypto.randomUUID(), nickname : formInfo.nickname, avatar : formInfo.avatar});
        nav('/lobbies/1');
    }

    return (
        <div className="lobby">
            <h1>Create a Lobby</h1>
            <form>
                <div className="left-col">
                    <label htmlFor="maxPlayers">Max Players</label>
                    <label htmlFor="nickname">Nickname</label>
                    <label htmlFor="avatar">Avatar</label>
                </div>
                <div className="right-col">
                    <select id="maxPlayers" name="maxPlayers" onChange={handleMaxPlayers} value="2">
                        <option value="1" disabled>1</option>
                        <option value="2">2</option>
                        <option value="3" disabled>3</option>
                        <option value="4" disabled>4</option>
                    </select>
                    <input id="nickname" name="nickname" onChange={handleNickname} autoComplete="off"/>
                    <select id="avatar" name="avatar" onChange={handleAvatar}>
                        <option value="🧔">🧔</option>
                        <option value="👩">👩</option>
                        <option value="🧒">🧒</option>
                        <option value="👧">👧</option>
                    </select>
                </div>
            </form>
            <div className="button-group">
                <Button type={'back'}>Back</Button>
                <button type="submit" onClick={handleSubmit}>Create Game</button>
                {/* <Button type={'create game'} id={1}>Create Game</Button> */}
            </div>
        </div>
    );
}

export default CreateLobby;