import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: calc(100% - 12px);
  padding: 6px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function LoginPage() {
  const Navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const UserID = event.target.elements.UserID.value;
    const password = event.target.elements.password.value;

    try {
      // Make POST request using Axios
      const response = await axios.post("http://localhost:4000/user/login", {
        UserID,
        password,
      });

      // Handle successful response (e.g., redirect, show success message)
      localStorage.setItem("role", response.data.user.role);
      console.log(response.data.user.role);
      alert(response.data.message);
      Navigate("/Order");
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Error during login:", error.response.data.message);
      alert(` Login Error: ${error.response.data.message}`);
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>UserID:</Label>
            <Input type="text" name="UserID" />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input type="password" name="password" />
          </FormGroup>
          <Button type="submit">Login</Button>
        </form>
      </FormContainer>
    </Container>
  );
}

export default LoginPage;
