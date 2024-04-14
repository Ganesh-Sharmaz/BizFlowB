
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import multer from "multer";

// Create Prouct


const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description, } = req.body;
console.log(req.body)
  //   Validation
  if (!name || !category || !quantity || !price || !description ) {
    res.status(400);
    throw new ApiError( 400,  "Please fill in all fields");
  }
console.log(req.files?.image[0]?.path)
  const imageLocalPath = req.files?.image[0]?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "image file path is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
        throw new ApiError(400, "Avatar file is also required");
    }
    console.log("working")
    console.log(image.url)
    console.log(req.user);
    console.log(req.user.id);
  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: image.url,
  });

  res.status(201).json(
    new ApiResponse(200, product, "product created successfully")
  );
});



export { createProduct,
       }