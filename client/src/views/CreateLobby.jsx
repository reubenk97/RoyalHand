import Button from "../components/Button";


const CreateLobby = () => {

    return (
        <div className="lobby">
            <h1>Create a Lobby</h1>
            <form>
                <div>
                    <label htmlFor="maxPlayers">Max Players</label>
                    <label htmlFor="nickname">Nickname</label>
                    <label htmlFor="avatar">Avatar</label>
                </div>
                <div>
                    <select id="maxPlayers" name="maxPlayers">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <input id="nickname" name="nickname" />
                    <select id="avatar" name="avatar">
                        <option value="A1">🧔</option>
                        <option value="A2">👩</option>
                        <option value="A3">🧒</option>
                        <option value="A4">👧</option>
                    </select>
                </div>
            </form>
            <div className="button-group">
                <Button type={'back'}>Back</Button>
                <Button type={'create game'} id={1}>Create Game</Button>
            </div>
        </div>
    );
}

export default CreateLobby;