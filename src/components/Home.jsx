import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import Login from "./Login";
import Signup from "./Signup";

// Global style to remove default margin and padding
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    font-family: 'Arial', sans-serif;
  }
`;

const RightSide = styled.div`
  flex: 1;
  /* background-color: #ff6f61; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    flex: 1.4;
  }
`;

const AuthContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
  text-align: center;

  h2 {
    margin-bottom: 1.5rem;
    color: #6a0d91;
  }

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 1rem;
  }
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  color: #ff6f61;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  transition: color 0.3s ease;
  font-weight: bold;

  &:hover {
    color: #ff3f3f;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <GlobalStyle />

      <RightSide>
        <AuthContainer>
          {isLogin ? (
            <>
              <Login switchToSignup={toggleAuthMode} />
              <p>
                Don't have an account?{" "}
                <ToggleLink onClick={toggleAuthMode}>Sign Up</ToggleLink>
              </p>
            </>
          ) : (
            <>
              <Signup switchToLogin={toggleAuthMode} />
              <p>
                Already have an account?{" "}
                <ToggleLink onClick={toggleAuthMode}>Log In</ToggleLink>
              </p>
            </>
          )}
        </AuthContainer>
      </RightSide>
    </>
  );
};

export default Home;
