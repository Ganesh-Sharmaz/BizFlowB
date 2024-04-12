import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";


const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {refreshToken, accessToken}
        
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access token and refresh token", error);
        
    }
}

// const token = generateToken(User._id)


const registerUser = asyncHandler( async (req, res) => {

    const {fullname, email, username, password, number, bio} = req.body
    console.log(fullname, email, username, password, number, bio)
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

    // const token = generateToken(user._id)

    // res.cookie("token", token), {
    //     path: "/",
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 1000 * 86400),
    //     sameSite: "none",
    //     secure: true                                                                            
    // }


    const user = await User.create({
        fullname,
        avatar: avatar.url,
        username: username.toLowerCase(),
        email,
        password,
        number,
        bio,
        
    })

    // if (user) {
    //     const { _id, name, email, photo, phone, bio } = user;
    //     res.status(201).json({
    //       _id,
    //       name,
    //       email,
    //       photo,
    //       phone,
    //       bio,
    //       token,
    //     });
    //   } else {
    //     res.status(400);
    //     throw new Error("Invalid user data");
    //   }

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

const loginUser = asyncHandler( async (req, res) => {

    // req body -> data
    // usename or email
    // find the user
    // access and refresh token
    // send cookies
    // login user
    console.log(req.body);
    const { email, username, password} = req.body
    

    if (!email && !username) {
        throw new ApiError(400, 'username or email is required');
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(404, "invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    console.log("working")
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            
            },
            "user logged in successfully"
            
        )

    )


    

})

export { registerUser, loginUser }



