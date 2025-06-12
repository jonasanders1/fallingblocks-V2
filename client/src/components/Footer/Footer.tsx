import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterSection>
          <h3>Falling Blocks</h3>
          <p>The ultimate online Tetris experience</p>
        </FooterSection>

        <FooterSection>
          <h4>Quick Links</h4>
          <FooterLinks>
            <Link to="/">Home</Link>
            <Link to="/game-options">Play</Link>
            <Link to="/leaderboard">Leaderboard</Link>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h4>Connect</h4>
          <FooterLinks>
            <a
              href="https://github.com/jonasanders1"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jonas-andersen-65a335262/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          © 2024 Falling Blocks. Total Ripoff of Tetris. Hope i don't get sued
          :)
        </p>
      </FooterBottom>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.containers.primary};
  padding: 3rem 2rem 1rem;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.containers.secondary};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.text.secondary};
    font-size: 0.9rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    color: ${({ theme }) => theme.text.secondary};
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.text.accent};
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.containers.secondary};

  p {
    color: ${({ theme }) => theme.text.secondary};
    font-size: 0.9rem;
  }
`;

export default Footer;
