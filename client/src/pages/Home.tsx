import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Gamepad2,
  Users,
  Palette,
  Trophy,
  ArrowLeftRight,
  RotateCw,
  ArrowDown,
  Space,
  Pause,
} from "lucide-react";
import Button from "@/components/Shared/Button/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <StyledHome>
      <PageContainer>
        <HeroSection>
          <Title>Falling Blocks</Title>
          <Subtitle>Classic Tetris with a modern twist</Subtitle>
          <ButtonContainer>
            <Button
              onClick={() => navigate("/game-options")}
              text="Play Now"
              $active={true}
              icon={<Gamepad2 size={24} />}
            />
            <Button
              onClick={() => navigate("/leaderboard")}
              text="Leaderboard"
              icon={<Trophy size={24} />}
            />
          </ButtonContainer>
        </HeroSection>

        <FeaturesSection>
          <h2>Game Features</h2>
          <FeaturesGrid>
            <FeatureCardWrapper>
              <FeatureCard>
                <IconWrapper>
                  <Gamepad2 size={32} />
                </IconWrapper>
                <h3>Classic Gameplay</h3>
                <p>
                  Experience the timeless Tetris mechanics with smooth controls
                </p>
              </FeatureCard>
            </FeatureCardWrapper>

            <FeatureCardWrapper>
              <FeatureCard>
                <IconWrapper>
                  <Users size={32} />
                </IconWrapper>
                <h3>Multiplayer</h3>
                <p>Challenge your friends in exciting head-to-head matches</p>
                <ComingSoonTag>Coming Soon</ComingSoonTag>
              </FeatureCard>
            </FeatureCardWrapper>

            <FeatureCardWrapper>
              <FeatureCard>
                <IconWrapper>
                  <Palette size={32} />
                </IconWrapper>
                <h3>Customizable</h3>
                <p>Choose your theme and customize your gaming experience</p>
              </FeatureCard>
            </FeatureCardWrapper>

            <FeatureCardWrapper>
              <FeatureCard>
                <IconWrapper>
                  <Trophy size={32} />
                </IconWrapper>
                <h3>Leaderboards</h3>
                <p>Compete for the highest score and climb the ranks</p>
              </FeatureCard>
            </FeatureCardWrapper>
          </FeaturesGrid>
        </FeaturesSection>

        <InstructionsSection>
          <h2>How to Play</h2>
          <InstructionsGrid>
            <InstructionCard>
              <CardHeader>
                <Gamepad2 size={24} />
                <h3>Controls</h3>
              </CardHeader>
              <ControlList>
                <ControlItem>
                  <ControlIcon>
                    <ArrowLeftRight size={20} />
                  </ControlIcon>
                  <ControlInfo>
                    <ControlName>Move</ControlName>
                    <ControlDescription>Left/Right arrows</ControlDescription>
                  </ControlInfo>
                </ControlItem>
                <ControlItem>
                  <ControlIcon>
                    <RotateCw size={20} />
                  </ControlIcon>
                  <ControlInfo>
                    <ControlName>Rotate</ControlName>
                    <ControlDescription>Up arrow</ControlDescription>
                  </ControlInfo>
                </ControlItem>
                <ControlItem>
                  <ControlIcon>
                    <ArrowDown size={20} />
                  </ControlIcon>
                  <ControlInfo>
                    <ControlName>Soft Drop</ControlName>
                    <ControlDescription>Down arrow</ControlDescription>
                  </ControlInfo>
                </ControlItem>
                <ControlItem>
                  <ControlIcon>
                    <Space size={20} />
                  </ControlIcon>
                  <ControlInfo>
                    <ControlName>Hard Drop</ControlName>
                    <ControlDescription>Space bar</ControlDescription>
                  </ControlInfo>
                </ControlItem>
                <ControlItem>
                  <ControlIcon>
                    <Pause size={20} />
                  </ControlIcon>
                  <ControlInfo>
                    <ControlName>Pause</ControlName>
                    <ControlDescription>P key</ControlDescription>
                  </ControlInfo>
                </ControlItem>
              </ControlList>
            </InstructionCard>

            <InstructionCard>
              <CardHeader>
                <Trophy size={24} />
                <h3>Scoring</h3>
              </CardHeader>
              <ScoreList>
                <ScoreItem>
                  <ScoreValue>100</ScoreValue>
                  <ScoreDescription>Single line</ScoreDescription>
                </ScoreItem>
                <ScoreItem>
                  <ScoreValue>300</ScoreValue>
                  <ScoreDescription>Double lines</ScoreDescription>
                </ScoreItem>
                <ScoreItem>
                  <ScoreValue>500</ScoreValue>
                  <ScoreDescription>Triple lines</ScoreDescription>
                </ScoreItem>
                <ScoreItem>
                  <ScoreValue>800</ScoreValue>
                  <ScoreDescription>Tetris (4 lines)</ScoreDescription>
                </ScoreItem>
                <ScoreItem>
                  <ScoreValue>+50</ScoreValue>
                  <ScoreDescription>Combo bonus per combo</ScoreDescription>
                </ScoreItem>
              </ScoreList>
            </InstructionCard>
          </InstructionsGrid>
        </InstructionsSection>
      </PageContainer>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
`;

const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.text.primary},
    ${({ theme }) => theme.text.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text.secondary};
  max-width: 600px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FeaturesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    font-size: 2.5rem;
    text-align: center;
    color: ${({ theme }) => theme.text.primary};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const FeatureCardWrapper = styled.div`
  position: relative;
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.containers.primary};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.text.secondary};
    line-height: 1.6;
  }
`;

const ComingSoonTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${({ theme }) => theme.text.accent};
  color: ${({ theme }) => theme.background.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const InstructionsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    font-size: 2.5rem;
    text-align: center;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 1rem;
  }
`;

const InstructionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const InstructionCard = styled.div`
  background-color: ${({ theme }) => theme.containers.primary};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.containers.secondary};

  svg {
    color: ${({ theme }) => theme.text.accent};
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text.primary};
    margin: 0;
  }
`;

const ControlList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ControlItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.containers.secondary};
  border-radius: 2rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ControlIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.accent};
`;

const ControlInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ControlName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const ControlDescription = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text.secondary};
`;

const ScoreList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ScoreItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.containers.secondary};
  border-radius: 2rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ScoreValue = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.text.accent};
`;

const ScoreDescription = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 0.9rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.containers.secondary};
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text.accent};
`;

export default Home;
