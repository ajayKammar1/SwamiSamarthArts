import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
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
  padding: 10px 20px;
  background-color: #00a2ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #00b345;
  }
`;

const EntryForm = () => {
  const navigate = useNavigate();

  const OrderData = JSON.parse(localStorage.getItem("Order"));
  const { state } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    additionalDetails: "",
    image: null,
    billNo: "",
    ganpatiModule: "",
    price: "",
    advance: "",
    balance: "",
    room: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("/Order", data);
      // fetchOrders();
      setFormData({
        name: "",
        contactNo: "",
        additionalDetails: "",
        image: null,
        billNo: "",
        ganpatiModule: "",
        price: "",
        advance: "",
        balance: "",
        room: "",
      });
      navigate("/Order");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    try {
      const res = await axios.patch(`/Order/${OrderData._id}`, data);
      console.log(res);
      navigate("/Order"); // Redirect to the orders page after successful update
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", marginTop: 20 }}>
        <Add onClick={() => navigate("/Order")}>All Order</Add>
      </div>
      <FormContainer>
        <Form onSubmit={state === "Edit" ? handleUpdate : handleSubmit}>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={state === "Edit" ? OrderData?.name : ""}
            required={state === "Edit" ? false : true}
          />

          <Label>contact No</Label>
          <Input
            type="number"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder={state === "Edit" ? OrderData?.contactNo : ""}
            required={state === "Edit" ? false : true}
          />

          <Label>additional Details</Label>
          <Input
            type="text"
            name="additionalDetails"
            value={formData.additionalDetails}
            placeholder={state === "Edit" ? OrderData?.additionalDetails : ""}
            onChange={handleChange}
            required={state === "Edit" ? false : true}
          />

          <Label>Image</Label>
          <Input
            type="file"
            name="image"
            onChange={handleFileChange}
            required={state === "Edit" ? false : true}
          />

          <Label>Bill No</Label>
          <Input
            type="number"
            name="billNo"
            value={formData.billNo}
            placeholder={state === "Edit" ? OrderData?.billNo : ""}
            required={state === "Edit" ? false : true}
            onChange={handleChange}
          />

          <Label>Ganpati Module</Label>
          <Input
            type="text"
            name="ganpatiModule"
            value={formData.ganpatiModule}
            placeholder={state === "Edit" ? OrderData?.ganpatiModule : ""}
            required={state === "Edit" ? false : true}
            onChange={handleChange}
          />

          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            placeholder={state === "Edit" ? OrderData?.price : ""}
            required={state === "Edit" ? false : true}
            onChange={handleChange}
          />

          <Label>Advance</Label>
          <Input
            type="number"
            name="advance"
            value={formData.advance}
            onChange={handleChange}
            required={state === "Edit" ? false : true}
            placeholder={state === "Edit" ? OrderData?.advance : ""}
          />

          <Label>Balance</Label>
          <Input
            type="number"
            name="balance"
            required={state === "Edit" ? false : true}
            value={formData.balance}
            onChange={handleChange}
            placeholder={state === "Edit" ? OrderData?.balance : ""}
          />

          <Label>Room</Label>
          <Input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            required={state === "Edit" ? false : true}
            placeholder={state === "Edit" ? OrderData?.room : ""}
          />

          <Button type="submit">
            Submit {state === "Edit" ? "Update" : "Submit"}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EntryForm;
