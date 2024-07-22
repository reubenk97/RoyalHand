import { useState } from "react";

const Form = () => {
    const [newPlayer, setNewPlayer] = useState({
        nickname: '',
        avatar: ''
    })

    return (
        <div>
            <form>
                <label>Nickname</label>
                <input name="nickname" value={newPlayer.nickname} onChange={e => setNewPlayer(prevNewPlayer => ({...prevNewPlayer, [e.target.name]: e.target.value}))} />
            </form>
        </div>
    );
}

export default Form;