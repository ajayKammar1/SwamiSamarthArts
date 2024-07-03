import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import QRCodeGen from "./QRCodeGen";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  min-width: 400px;
  width: 40%;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.185);
  background-color: #f5f0f0d6;
  text-align: center;

  @media print {
    width: 70%;
  }

  ${(props) =>
    props.isPrinting &&
    css`
      width: 70%;
    `}
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: none;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.288);
`;

const Info = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const Label = styled.span`
  flex: 1;
  font-weight: bold;
  color: #555;
  display: flex;
  justify-content: space-between;
`;

const Value = styled.span`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  margin: 20px 10px;
  padding: 10px 30px;
  background-color: #7ceec8;
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

const ViewDetails = () => {
  const [data, setData] = useState();
  const [addURL, setURL] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");
  const { id, bill } = useParams();
  const Role = localStorage.getItem("role");
  const Navigete = useNavigate();
  useEffect(() => {
    axios
      .get(`/Order/${id}/${bill}`)
      .then((res) => {
        setData(res.data);
        setURL(window.location.href);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.error);
      });
  }, [id, bill]);

  const handlePrint = () => {
    setQRCodeURL(window.location.href);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const DeleteOrder = () => {
    axios
      .delete(`/Order/${id}`)
      .then((res) => {
        setData(res.data);
        Navigete("/Order/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container isPrinting={qrCodeURL !== ""}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ProfileImage src={data && data.imageUrl} alt="Profile" />
          <QRCodeGen URL={addURL} setQRCodeURL={setQRCodeURL} />
        </div>
        <Info>
          <Label>Name:</Label>
          <Value>{data && data.name}</Value>
        </Info>
        <Info>
          <Label>Contact No:</Label>
          <Value>{data && data.contactNo}</Value>
        </Info>
        <Info>
          <Label>Bill No:</Label>
          <Value>{data && data.billNo}</Value>
        </Info>
        <Info>
          <Label>Additional Details:</Label>
          <Value>{data && data.additionalDetails}</Value>
        </Info>
        <Info>
          <Label>Ganpati Module:</Label>
          <Value>{data && data.ganpatiModule}</Value>
        </Info>
        <Info>
          <Label>Price:</Label>
          <Value>{data && data.price} ₹</Value>
        </Info>
        <Info>
          <Label>Advance:</Label>
          <Value>{data && data.advance} ₹</Value>
        </Info>
        <Info>
          <Label>Balance:</Label>
          <Value>{data && data.balance} ₹</Value>
        </Info>
        <Info>
          <Label>Room:</Label>
          <Value>{data && data.room}</Value>
        </Info>
      </Container>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Button onClick={handlePrint} color="#20e230">
          Print
        </Button>
        {Role === "Admin" ? (
          <Button
            onClick={() => {
              Navigete("/OrderForm/Edit");
              localStorage.setItem("Order", JSON.stringify(data));
            }}
            color="#a184f0"
          >
            Edit
          </Button>
        ) : (
          ""
        )}
        {Role === "Admin" ? (
          <Button onClick={DeleteOrder} color="#e71a1a">
            Delete
          </Button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ViewDetails;
