import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../style.css";
const Container = styled.div`
  background: linear-gradient(to left, #0000ffbc, #ff0000a6);
  color: white;
  width: 100%;
  display: flexbox;
  text-align: center;
`;
const Menu = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
  background-color: black;
`;
const LI = styled.li`
  margin-right: 5px;
  padding: 5px;
  color: white;
`;
const Title = styled.h2`
  padding: 0.5em;
`;
const NavBAr = () => {
  return (
    <Container>
      <Title>|| श्री स्वामी समर्थ आर्ट्स ||</Title>
      {/* <SubTitle></SubTitle> */}
      <Menu>
        <NavLink to={"/"}>
          {" "}
          <LI>Home</LI>
        </NavLink>
        {/* <NavLink to={"/Photos"}>
          {" "}
          <LI>Photos</LI>
        </NavLink> */}
        <NavLink to={"/Order"}>
          <LI>Order</LI>
        </NavLink>
      </Menu>
    </Container>
  );
};

export default NavBAr;
