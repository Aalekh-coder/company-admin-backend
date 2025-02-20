
import  User  from "../model/user.Model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from 'bcrypt';

import { asyncHandler } from "../utils/asyncHandler.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefereshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);  // Log the exact error
      throw new ApiError(
        500,
        "Something went wrong while generating refresh and access token"
      );
    }
  };
  
// get users details from frontend
// validation --- is empty
// check if user alredy exists : by username and email
// check for images , check for avatar
// upload them  to cloudinary, avatar
// create user objects -- create entry in db
// remove password and request token from field'
// check for user creation
// return result

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, username, password, role ,permissions} = req.body;
  
    // Validate input fields
    if (![name, email, username, password, role,permissions].every(field => field?.trim())) {
      throw new ApiError(400, "All fields are required");
    }
  
    // Check if the user already exists by email or username
    const existingUser = await User.findOne({
      $or: [{ email }, { username: username.toLowerCase() }],
    });
  
    if (existingUser) {
      throw new ApiError(409, "User with the provided email or username already exists");
    }
  
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      permissions,
      username: username.toLowerCase(),
    });
  
    // Retrieve the newly created user without sensitive fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
  
    if (!createdUser) {
      throw new ApiError(500, "Error occurred while registering the user");
    }
  
    // Respond with success and the user details
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  });
  
//  for login

const loginUser = asyncHandler(async (req, res) => {
  

    const { email, username, password } = req.body;
    console.log(email);
  
    if (!username && !email) {
      throw new ApiError(400, "username or email is required");
    }
  
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
  
    // }
  
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );
  
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      );
  });
  

const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Fetch the user first
    console.log(user)
  if (!user) {
      return res.status(404).json({ message: 'User not found' });
  }

  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1, // this removes the refreshToken field from the document
          },
      },
      {
          new: true,
      }
  );

  const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set this only in production environment
  };

  return res
      .status(200)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json(new ApiResponse(200, {}, 'User logged Out'));
});

// 3 ----------------------------------------------------------------------------------------------------------
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// 4. change the old apssword ---------------------------------------------------------------------
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// 5.) get current user -----------------------------------------------------------------------------------------
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

// 6> updateaccount details -----------------------------------------------------------------------------------
const updateAccountDetails = asyncHandler(async (req, res) => {
  const {name, email } = req.body;

  if (!name || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        name,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});





// export segments--------------------------------------------------------------------------------------------
export {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails
  
};