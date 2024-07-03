import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow-x: scroll;
`;
const Table = styled.table`
  box-shadow: 0px 0px 8px gray;
  margin: 20px;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
`;
const Row = styled.tr``;

const TH = styled.th`
  background-color: #020211;
  color: white;
  width: 120px;
  padding: 0.5rem 0;
`;
const TD = styled.td`
  text-align: center;
`;
const Add = styled.button`
  margin-right: 30px;
  padding: 0.7rem;
  border: none;
  border-radius: 0.5rem;
  background-color: "#85ee70";
  color: #000000d1;
  font-weight: 800;
  box-shadow: 0px 0px 3px black;
  display: flex;
`;

const Button = styled.button`
  margin: auto;
  padding: 10px 30px;
  background-color: #7ceec8;
  width: 100px;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* box-shadow: 0px 0px 8px gray; */
  transition: 0.5s ease;
  font-size: 16px;
  &:hover {
    background-color: ${(prop) => prop.color};
    box-shadow: 0px 0px 8px gray;
    color: wheat;
  }
`;
const Input = styled.input`
  width: 25%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 20px;
`;

const Customers = () => {
  const navigate = useNavigate();
  const Role = localStorage.getItem("role");
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("/Order")
      .then((response) => {
        setOrders(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(Orders);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    // Filter data based on the query
    const filteredItems = Orders.filter(
      (item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.billNo.includes(inputValue) ||
        item.contactNo.includes(inputValue) ||
        item.ganpatiModule.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.room.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log(filteredData);
    setFilteredData(filteredItems);
  };

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        {Role === "Admin" ? (
          <Add onClick={() => navigate("/OrderForm/Add")}>Add Order</Add>
        ) : (
          ""
        )}
      </div>
      <Table>
        <Row>
          <TH>Sl No</TH>
          <TH>Bill No</TH>
          <TH>Name</TH>
          <TH>Contact No</TH>
          <TH>Adishnal Delails</TH>
          <TH>Image</TH>
          <TH>Ganpati Module</TH>
          <TH>Price</TH>
          <TH>Advance</TH>
          <TH>Balence</TH>
          <TH>Room</TH>
          {/* <TH>Action</TH> */}
        </Row>
        {filteredData &&
          filteredData.map((i, index) => {
            return (
              <Row key={index}>
                <TD>{index + 1}</TD>
                <TD>{i.billNo}</TD>
                <TD>{i.name}</TD>
                <TD>{i.contactNo}</TD>
                <TD>{i.additionalDetails}</TD>
                <Link to={`/Order/${i._id}/${i.billNo}`}>
                  {" "}
                  <TD>
                    <img src={i.imageUrl} width={100} alt="" />
                  </TD>
                </Link>
                <TD>{i.ganpatiModule}</TD>
                <TD>{i.price}</TD>
                <TD>{i.advance}</TD>
                <TD>{i.balance}</TD>
                <TD>{i.room}</TD>
                {/* <TD>
                    <button>a</button>
                    <button>a</button>
                    <button>a</button>
                  </TD> */}
              </Row>
            );
          })}
      </Table>
      <div style={{ display: "flex" }}></div>{" "}
      <Button onClick={() => window.print()} color="#20e230">
        Print
      </Button>
    </Container>
  );
};

export default Customers;
