import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Trophy, Clock, Layers } from "lucide-react";
import Button from "@/components/Shared/Button/Button";

interface Score {
  score: number;
  date: string;
  mode: string;
  timeLimit?: number;
  linesCleared: number;
  playTime: number; // in seconds
}

interface LocationState {
  newScore: boolean;
  score: number;
  rank: number;
}

const Leaderboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [newScoreIndex, setNewScoreIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    const storedScores = localStorage.getItem("tetrisScores");
    if (storedScores) {
      const parsedScores = JSON.parse(storedScores);
      // Sort scores by score in descending order
      const sortedScores = parsedScores.sort(
        (a: Score, b: Score) => b.score - a.score
      );
      setScores(sortedScores);

      // If we have a new score, animate it
      if (state?.newScore) {
        setNewScoreIndex(state.rank - 1);
        // Remove the animation class after animation completes
        const timer = setTimeout(() => {
          setNewScoreIndex(null);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [state]);

  const formatDate = (dateString: string) => {
    try {
      const timestamp = globalThis.Date.parse(dateString);
      if (isNaN(timestamp)) {
        return "Unknown date";
      }
      return new globalThis.Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  const formatMode = (mode: string, timeLimit?: number) => {
    if (mode === "timed" && timeLimit) {
      const minutes = Math.floor(timeLimit / 60);
      return `${minutes} min`;
    }
    return mode === "endless" ? "Endless" : mode;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.ceil(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <PageContainer>
      <Header>
        <Title>
          <Trophy size={32} />
          Personal Best Scores
        </Title>
      </Header>

      {scores.length === 0 ? (
        <EmptyState>
          <p>No scores yet. Play a game to see your scores here!</p>
          <Button
            onClick={() => navigate("/game-options")}
            text="Play Now"
            $active={true}
          />
        </EmptyState>
      ) : (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Rank</TableHeaderCell>
                <TableHeaderCell>Score</TableHeaderCell>
                <TableHeaderCell>Mode</TableHeaderCell>
                <TableHeaderCell>
                  <StatHeader>
                    <Clock size={16} />
                    Time
                  </StatHeader>
                </TableHeaderCell>
                <TableHeaderCell>
                  <StatHeader>
                    <Layers size={16} />
                    Lines
                  </StatHeader>
                </TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores.map((score, index) => (
                <TableRow 
                  key={index}
                  $isNew={newScoreIndex === index}
                >
                  <TableCell>
                    <Rank>#{index + 1}</Rank>
                  </TableCell>
                  <TableCell>
                    <ScoreValue>{score.score.toLocaleString()}</ScoreValue>
                  </TableCell>
                  <TableCell>
                    <Mode>{formatMode(score.mode, score.timeLimit)}</Mode>
                  </TableCell>
                  <TableCell>
                    <StatValue>{formatTime(score.playTime)}</StatValue>
                  </TableCell>
                  <TableCell>
                    <StatValue>{score.linesCleared}</StatValue>
                  </TableCell>
                  <TableCell>
                    <Date>{formatDate(score.date)}</Date>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text.primary};
  font-size: 2rem;
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${({ theme }) => theme.containers.primary};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  p {
    color: ${({ theme }) => theme.text.secondary};
    font-size: 1.2rem;
    margin: 0;
  }
`;

const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.containers.primary};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.containers.secondary};
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.containers.secondary};
  }
`;

const TableRow = styled.tr<{ $isNew?: boolean }>`
  transition: all 0.3s ease;
  transform-origin: top;
  animation: ${({ $isNew }) => $isNew ? 'slideIn 0.5s ease-out' : 'none'};

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.containers.secondary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.containers.tertiary} !important;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  border-bottom: 2px solid ${({ theme }) => theme.containers.tertiary};
  
  &:nth-child(1) { width: 8%; }   /* Rank */
  &:nth-child(2) { width: 20%; }  /* Score */
  &:nth-child(3) { width: 15%; }  /* Mode */
  &:nth-child(4) { width: 15%; }  /* Time */
  &:nth-child(5) { width: 12%; }  /* Lines */
  &:nth-child(6) { width: 20%; }  /* Date */
`;

const TableCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.text.primary};
`;

const Rank = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.text.accent};
`;

const ScoreValue = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.text.primary};
`;

const Mode = styled.span`
  text-transform: capitalize;
  color: ${({ theme }) => theme.text.secondary};
`;

const Date = styled.span`
  color: ${({ theme }) => theme.text.secondary};
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text.primary};

  svg {
    color: ${({ theme }) => theme.text.accent};
  }
`;

const StatValue = styled.div`
  color: ${({ theme }) => theme.text.secondary};
  font-weight: 500;
`;

export default Leaderboard;
