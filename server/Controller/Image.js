const Image = require("../Modules/Images");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "doqnh4mha",
  api_key: "387966323615637",
  api_secret: "JyO265GfPvkj1GNqlVoxs7tSioA",
});

const AddImage = async (req, res) => {
  try {
    cloudinary.uploader
      .upload_stream({ folder: "uploads" }, async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to upload image to Cloudinary." });
        }

        const imageUrl = result.secure_url;
        console.log(imageUrl);
        const newImage = new Image({ ImgURL: imageUrl });
        await newImage.save();
        res
          .status(201)
          .json({ message: "Image uploaded successfully!", url: imageUrl });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image." });
  }
};

const getAllImage = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed ro fetch Images. .. !" });
  }
};
const DeleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }

    const publicId = image.ImgURL.split("/").pop().split(".")[0]; // Extract public ID from the URL
    console.log(publicId);

    // Delete image from Cloudinary
    cloudinary.uploader.destroy(publicId, async (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Failed to delete image from Cloudinary." });
      }

      // Delete image from MongoDB
      await Image.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Image deleted successfully." });
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image." });
  }
};

module.exports = { getAllImage, AddImage, DeleteImage };
