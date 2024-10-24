import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { io } from "socket.io-client";

export const VotePollPage = () => {
  const { pollId } = useParams();

  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();
  const handleViewResults = () => {
    navigate(`/polls/results/${pollId}`);
  };

  useEffect(() => {
    const fetchPoll = async () => {
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
        console.log("Fetched poll data:", response.data.poll);
      } catch (error) {
        setError("error fetching poll");
      }
    };

    const socketConnection = io(
      "https://polling-system-backend-3jgu.onrender.com/"
    );
    setSocket(socketConnection);
    console.log("Connected to socket", socketConnection);

    socketConnection.on("pollUpdated", (updatedPoll) => {
      console.log("Socket event received:", updatedPoll);
      if (updatedPoll._id === pollId) {
        setPoll(updatedPoll);
        console.log("Poll updated via socket:", updatedPoll);
      }
    });
    fetchPoll();
    return () => {
      socketConnection.disconnect();
    };
  }, [pollId]);

  const handleVote = async () => {
    if (selectedOption == null) {
      setError("Please select an option so vote");
      return;
    }

    try {
      const response = await axios.post(
        `https://polling-system-backend-3jgu.onrender.com/polls/vote/${pollId}`,
        { optionIndex: selectedOption },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccessMessage("Vote cast successfully");
      setPoll(response.data.poll);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message == "User has already voted"
      ) {
        setError("You have already voted on this poll.");
      } else if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Error casting Vote");
      }
    }
  };

  if (!poll) {
    return <p>Loading poll...</p>;
  }
  return (
    <PollContainer>
      <Title>{poll.title}</Title>
      <OptionList>
        {poll.options.map((option, index) => (
          <OptionItem key={index}>
            <label>
              <input
                type="radio"
                name="pollOption"
                value={index}
                onChange={() => setSelectedOption(index)}
              />
              {option.option}-{option.votes} votes
            </label>
          </OptionItem>
        ))}
      </OptionList>
      <VoetButton onClick={handleVote} disabled={!poll}>
        Vote
      </VoetButton>
      <ResultsButton onClick={handleViewResults}>View Results</ResultsButton>
      {error && <ErrorMessage style={{ color: "red" }}>{error}</ErrorMessage>}
      {successMessage && (
        <SuccessMessage style={{ color: "green" }}>
          {successMessage}
        </SuccessMessage>
      )}
    </PollContainer>
  );
};

const PollContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;
const OptionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OptionItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  background-color: #f1f1f1;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e1e1e1;
  }
`;

const VoetButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
export const ResultsButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;
