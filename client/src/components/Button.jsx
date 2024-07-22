import { useNavigate } from "react-router-dom";

const Button = (props) => {
    const { type, id } = props;
    const nav = useNavigate();

    const handleDestination = () => {
        let destination = '';
        switch(type) {
            case 'create':
                destination = '/create';
                break;
            case 'join':
                destination = '/join';
                break;
            // cases for going to lobby
            case 'join game':
            case 'return':
            case 'create game':
                destination = `/lobbies/${id}`;
                break;
            // cases for going back to landing
            case 'leave':
            case 'back':
                destination = '/';
                break;
            case 'start':
                destination = `/lobbies/${id}/play`;
                break;
            case 'skip':
                destination = '/skip';
                break;
        }
        return destination;
    }

    return (
        <div>
            <button onClick={() => nav(handleDestination())}>{type}</button>
        </div>
    );
}

export default Button;