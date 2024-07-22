import { useParams } from 'react-router-dom';
import Button from '../components/Button';

const Lobby = () => {
    const { id } = useParams();

    return (
        <div className="lobby">
            <div className="lobby-head">
                <h3>Lobby</h3>
                <p>Lobby ID: {id}</p>
            </div>
            <fieldset className="player-group">
                <legend>Players (4/4)</legend>
                <div>
                    {/* Player tile host - avatar and nickname */}
                    <img></img>
                    <p>Host</p>
                </div>
                <div>
                    {/* Player tile 1 - avatar and nickname */}
                    <img></img>
                    <p>Player 1</p>
                </div>
                <div>
                    {/* Player tile 2 - avatar and nickname */}
                    <img></img>
                    <p>Player 2</p>
                </div>
                <div>
                    {/* Player tile 3 - avatar and nickname */}
                    <img></img>
                    <p>Player 3</p>
                </div>
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
                    <Button type={'start'} id={id}>Start Game</Button>
                </div>
            </div>
        </div>
    );
}

export default Lobby;