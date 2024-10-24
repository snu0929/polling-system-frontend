import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const PollContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;
const Button = styled.button`
  padding: 10px 20px;
  background-color: #6a0d91;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #590c79;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

export const CreatePoll = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);
  const [error, setError] = useState("");

  const handleAddOptions = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!title || options.some((option) => option.trim() === "")) {
      setError("Please enter a title");
      return;
    }

    setError("");
    try {
      const response = await axios.post(
        "https://polling-system-backend-3jgu.onrender.com/polls/create",
        {
          title,
          options: options.map((option) => ({ option })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setOptions([""]);
      console.log("Response:", response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error creating poll";
      setError(errorMessage);
      console.log("Error:", errorMessage);
    }
  };

  return (
    <PollContainer>
      <Title>Create a Poll</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Poll Title</Label>
        <div>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Options:</Label>
          {options.map((option, index) => (
            <div key={index}>
              <Input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <Button type="button" onClick={handleAddOptions}>
            add Option
          </Button>
        </div>
        {error && <ErrorMessage style={{ color: "red" }}>{error}</ErrorMessage>}
        <Button type="submit">Create Poll</Button>
      </Form>
    </PollContainer>
  );
};

export default CreatePoll;
