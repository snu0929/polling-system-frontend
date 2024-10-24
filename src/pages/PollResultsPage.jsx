import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import CommentsSection from "../components/CommentsSection";
import styled from "styled-components";
export const PollResultsPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const fetchPollResults = async () => {
      try {
        const response = await axios.get(
          `https://polling-system-backend-3jgu.onrender.com/polls/${pollId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPoll(response.data.poll);
      } catch (error) {
        setError("Error fetching poll results");
      }
    };
    fetchPollResults();
    const socketConnection = io(
      "https://polling-system-backend-3jgu.onrender.com/"
    );
    setSocket(socketConnection);
    socketConnection.on("pollUpdated", (updatedPoll) => {
      if (updatedPoll._id === pollId) {
        setPoll(updatedPoll);
      }
    });
    return () => {
      socketConnection.disconnect();
    };
  }, [pollId]);

  if (!poll) {
    return <Container>Loading poll results...</Container>;
  }
  return (
    <Container>
      <Header>
        <Title>Poll results for: {poll.title}</Title>
      </Header>
      <ResultsSection>
        <h3>Results:</h3>
        <ul>
          {poll.options.map((option, index) => (
            <ResultsItem key={index}>
              <span>{option.option}</span>
              <span>{option.votes} votes</span>
            </ResultsItem>
          ))}
        </ul>
        <p>
          Total Votes:{" "}
          {poll.options.reduce((total, opt) => total + opt.votes, 0)}
        </p>
      </ResultsSection>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <CommentsSection pollId={poll._id} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0, 1);
  background-color: #fff;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;
const ResultsSection = styled.section`
  margin: 20px 0;
  h3 {
    margin-bottom: 10px;
    color: #555;
  }
`;
const ResultsItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
  span {
    color: #555;
  }
  &.winner {
    font-weight: bold;
    color: #4caf50;
  }
`;
