import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import BG from "./1.jfif";

const GalleryContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const AddItem = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const Role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get("/Images/")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, [newImage]);

  const handleAddImage = async () => {
    const formData = new FormData();
    formData.append("image", newImage);

    try {
      await axios.post("/Images/Upload", formData);
      // Refresh images after upload
      axios
        .get("/Images/")
        .then((res) => setImages(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleDeleteImage = async (imgId) => {
    try {
      await axios.delete(`/Images/${imgId}`);
      // Filter out the deleted image from the state
      setImages(images.filter((img) => img._id !== imgId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#f3f4f5f2" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={BG} alt="#" width={500} />
      </div>
      {Role === "Admin" && (
        <AddItem>
          <Input
            type="file"
            placeholder="Select Image"
            onChange={(e) => {
              setNewImage(e.target.files[0]);
            }}
          />
          <Button onClick={handleAddImage}>Add Image</Button>
        </AddItem>
      )}
      <GalleryContainer>
        {images.map((img, index) => (
          <div key={index} style={{ position: "relative" }}>
            <Image
              src={img.ImgURL}
              alt={`Gallery ${index}`}
              onClick={() => handleImageClick(img.ImgURL)}
            />
            {Role === "Admin" && (
              <DeleteButton onClick={() => handleDeleteImage(img._id)}>
                X
              </DeleteButton>
            )}
          </div>
        ))}
      </GalleryContainer>
      <Modal isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalImage src={selectedImage} alt="Selected" />
      </Modal>
    </div>
  );
};

export default Gallery;
