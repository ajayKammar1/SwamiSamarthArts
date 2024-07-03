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

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const Role = localStorage.getItem("role");

  const handleAddImage = async () => {
    const formData = new FormData();
    formData.append("image", newImage);
    console.log(newImage);

    try {
      await axios.post("http://localhost:4000/Images/Upload", formData);
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
  useEffect(() => {
    axios
      .get("http://localhost:4000/Images/")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ backgroundColor: "#f3f4f5f2" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <img src={BG} alt="#" width={500} />
      </div>
      {Role === "Admin" ? (
        <AddItem>
          <Input
            type="file"
            placeholder="Select Image"
            // value={newImage}
            onChange={(e) => {
              setNewImage(e.target.files[0]);
            }}
          />
          <Button onClick={handleAddImage}>Add Image</Button>
        </AddItem>
      ) : (
        ""
      )}
      <GalleryContainer>
        {images &&
          images.map((img, index) => (
            <Image
              key={index}
              src={img.ImgURL}
              alt={`Gallery ${index}`}
              onClick={() => handleImageClick(img.ImgURL)}
            />
          ))}
      </GalleryContainer>
      <Modal isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalImage src={selectedImage} alt="Selected" />
      </Modal>
    </div>
  );
};

export default Gallery;
