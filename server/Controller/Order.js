const Order = require("../Modules/Orders");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "doqnh4mha",
  api_key: "387966323615637",
  api_secret: "JyO265GfPvkj1GNqlVoxs7tSioA",
});

const AddOrder = async (req, res) => {
  const {
    name,
    contactNo,
    additionalDetails,
    billNo,
    ganpatiModule,
    price,
    advance,
    balance,
    room,
  } = req.body;

  if (
    !contactNo &&
    !additionalDetails &&
    !billNo &&
    !ganpatiModule &&
    !price &&
    !advance &&
    !balance &&
    !room
  ) {
    res.json({ Error: "Some Field is Missing ..." });
  }
  try {
    cloudinary.uploader
      .upload_stream({ folder: "orders" }, async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to upload image to Cloudinary." });
        }

        const imageUrl = result.secure_url;

        const newOrder = new Order({
          name,
          contactNo,
          additionalDetails,
          imageUrl,
          billNo,
          ganpatiModule,
          price,
          advance,
          balance,
          room,
        });
        await newOrder.save();
        res
          .status(201)
          .json({ message: "Image uploaded successfully!", url: imageUrl });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};

const getSingleInvice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    console.log(order);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Order not found." });
  }
};

const UpdateOrder = async (req, res) => {
  const orderId = req.params.id;
  const {
    name,
    contactNo,
    additionalDetails,

    ganpatiModule,
    price,
    advance,
    balance,
    room,
  } = req.body;
  console.log(req.body);
  const data = {};
  for (const key in req.body) {
    if (req.body[key] !== "" && req.body[key] !== "null") {
      data[key] = req.body[key];
    }
  }

  try {
    // Check if there's a file to upload
    if (!req.file) {
      // If no new image, update without changing the image
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        data,

        { new: true }
      );

      res.status(200).json({
        message: "Order updated successfully!",
        order: updatedOrder,
      });
      return;
    }

    // If there's a new image, upload it to Cloudinary
    cloudinary.uploader
      .upload_stream({ folder: "orders" }, async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to upload image to Cloudinary." });
        }

        const imageUrl = result.secure_url;
        console.log(imageUrl);

        // Update order with new image URL
        const updatedOrder = await Order.findByIdAndUpdate(orderId, data, {
          new: true,
        });

        res.status(200).json({
          message: "Order updated successfully!",
          order: updatedOrder,
        });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order." });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const OrderData = await Order.findById(req.params.id);
    if (!OrderData) {
      return res.status(404).json({ error: "Image not found." });
    }

    const publicId = OrderData.imageUrl.split("/").pop().split(".")[0]; // Extract public ID from the URL
    // console.log(publicId);

    // Delete image from Cloudinary
    cloudinary.uploader.destroy(publicId, async (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Failed to delete image from Cloudinary." });
      }

      // Delete image from MongoDB
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Image deleted successfully." });
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image." });
  }
};
module.exports = {
  AddOrder,
  getAllOrder,
  getSingleInvice,
  deleteOrder,
  UpdateOrder,
};
