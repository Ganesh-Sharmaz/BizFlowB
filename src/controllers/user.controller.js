import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

const registerUser = asyncHandler( async (req, res) => {

    const {fullname, email, username, password, number, bio} = req.body
    if(
        [fullname, email, username, password, number].some((feild) => feild?.trim() === "")
    ) {
        throw new ApiError(400, "all feilds are required")
    }
    const existed = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existed) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file path is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is also required");
    }

    const token = generateToken()

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        username: username.toLowerCase(),
        email,
        password,
        number,
        bio,
        token
    })
    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})

export { registerUser }

