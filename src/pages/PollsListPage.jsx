import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const PollContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const PollCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const PollTitle = styled.h3`
  margin: 0 0 10px;
  color: #6a0d91;
`;

export const PollCreatedBy = styled.p`
  margin: 5px 0;
  font-style: italic;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const Button = styled.button`
  background-color: #6a0d91;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6a0d91;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export const PollsListPage = () => {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          "https://polling-system-backend-3jgu.onrender.com/polls/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPolls(response.data);
      } catch (error) {
        setError("Error fetching polls");
        console.log("error", error);
      }
    };
    fetchPolls();
  }, []);
  if (error) {
    return <ErrorMessage style={{ color: "red" }}>{error}</ErrorMessage>;
  }

  return (
    <PollContainer>
      <Title>Available Polls</Title>
      {polls.length > 0 ? (
        polls.map((poll) => (
          <PollCard key={poll._id}>
            <PollTitle>{poll.title}</PollTitle>
            <PollCreatedBy>
              Created By: {poll.createdBy?.userName}
            </PollCreatedBy>
            <ButtonContainer>
              <Link to={`/polls/vote/${poll._id}`}>
                <Button>Vote</Button>
              </Link>
              <Link to={`/polls/results/${poll._id}`}>
                <Button>Results</Button>
              </Link>
            </ButtonContainer>
          </PollCard>
        ))
      ) : (
        <p>No polls available.</p>
      )}
    </PollContainer>
  );
};
