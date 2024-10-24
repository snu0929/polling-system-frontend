import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import styled from "styled-components";

const CommentsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CommentsHeader = styled.h3`
  margin-bottom: 15px;
  color: #333;
`;

const CommentsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 5px;
    %:last-child {
      border-bottom: none;
    }
  }
`;
const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;
const InputContainer = styled.div`
  display: flex;
  margin-top: 15px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;

    &:focus {
      border-color: #6a0d91;
      outline: none;
    }
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #6a0d91;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #430958;
    }
  }
`;

const CommentsSection = ({ pollId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing comments from your backend
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://polling-system-backend-3jgu.onrender.com/polls/${pollId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComments(response.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();

    // Set up socket connection
    const socket = io("https://polling-system-backend-3jgu.onrender.com");

    // Listen for new comments
    socket.on("newComment", (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });

    return () => {
      socket.disconnect();
    };
  }, [pollId]);

  const handleCommentSubmit = async () => {
    if (!text.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `https://polling-system-backend-3jgu.onrender.com/polls/${pollId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setText(""); // Clear the input field
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Error posting comment");
    }
  };

  return (
    <CommentsContainer>
      <CommentsHeader>Comments</CommentsHeader>
      <CommentsList>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </CommentsList>
      {error && <ErrorMessage style={{ color: "red" }}>{error}</ErrorMessage>}
      <InputContainer>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </InputContainer>
    </CommentsContainer>
  );
};

export default CommentsSection;
