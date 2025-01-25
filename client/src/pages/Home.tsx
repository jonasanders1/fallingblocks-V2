import { Link } from "react-router-dom";
import Button from "../components/Shared/Button/Button";
import { styled } from "styled-components";

const Home = () => {
  return (
    <StyledHome>
      <h1>Welcome to Tetris Battle</h1>
      <p>
        Welcome to Tetris Battle, the ultimate online Tetris experience!
        Challenge your friends and players from around the world in this
        addictive and classic puzzle game.
      </p>
      <Link to="/game">
        <Button text="Play Now" />
      </Link>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
  & > * {
    text-align: center;
  }
`;

export default Home;
