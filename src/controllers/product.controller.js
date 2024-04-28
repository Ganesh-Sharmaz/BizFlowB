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
    const { name, sku, category, quantity, price, description } = req.body;
    console.log(req.body);
    //   Validation
    if (!name || !category || !quantity || !price || !description) {
        res.status(400);
        throw new ApiError(400, "Please fill in all fields");
    }
    // console.log(req.files?.image[0]?.path);
    const imageLocalPath = req.files?.image[0]?.path;
    console.log(imageLocalPath)
    if (!imageLocalPath) {
        throw new ApiError(400, "image file path is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
        throw new ApiError(400, "Avatar file is also required");
    }
    console.log("working");
    console.log(image.url);
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

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort(
        "-createdAt"
    );
    console.log(req.user.id);
    res.status(200).json(products);
    for (const product of products){
        console.log(product)
    }
});

const getProduct = asyncHandler(async (req, res) => {   
    const product = await Product.findById(req.params.id);

    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new ApiError("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new ApiError("User not authorized");
    }
    console.log(product);
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted." });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, category, quantity, price, description } = req.body;
    const { id } = req.params;
    console.log(req.body);

    const product = await Product.findById(id);

    // if product doesnt exist
    if (!product) {
        res.status(404);
        throw new ApiError("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new ApiError("User not authorized");
    }

    // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            name,
            category,
            quantity,
            price,
            description,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json(updatedProduct);
});

const updateImage = asyncHandler(async (req, res) => {
    const ImageLocalPath = req.file?.path;
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    // Match product to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    console.log(req.file?.path);
    if (!ImageLocalPath) {
        throw new ApiError(400, "image file is missing");
    }

    const image = await uploadOnCloudinary(ImageLocalPath);

    if (!image) {
        throw new ApiError(400, "Error while uploading the avatar");
    }
    console.log("working");
    console.log(image);
    console.log(image.url);
    console.log(req.user);
    console.log(req.user.id);

    const updatedImage = await Product.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                image: image.url,
            },
        },
        { new: true }
    );
    return res
        .status(200)
        .json(new ApiResponse(200, product, "image updated successfully"));
});

export {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    updateImage,
};
