import { useEffect } from "react";
import Button from "../components/Button";
import cardsBack from '../assets/cards-background.jpg';

const Home = (props) => {
    const { setBackImage } = props;

    useEffect(() => {
        setBackImage(cardsBack);
    }, []);

    return (
        <div className="home">
            <h1 className="title">Royal Hand</h1>
            <Button type={'create'} />
            <Button type={'join'} />
        </div>
    );
}

export default Home;