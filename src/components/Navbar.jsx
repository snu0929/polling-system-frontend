import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled-components for the Navbar
const Nav = styled.nav`
  background-color: #6a0d91;
  padding: 20px 15px;
  margin-bottom: 20px;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  color: white;
  font-size: 18px;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavList>
        {/* Each `Link` navigates to a different route */}
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/create-poll">Create Poll</Link>
        </NavItem>
        <NavItem>
          <Link to="/polls">Polls List</Link>
        </NavItem>
        <NavItem>
          <Link to="/profile">Profile</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;
