import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['director', 'employee'], required: true },
    password: { type: String, required: true },
    permissions: { type: [String], default: [] },
    refreshToken: { type: String }, // To store the refresh token
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Method to validate password
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
UserSchema.methods.generateAccessToken = function () {
  const payload = { _id: this._id, email: this.email };
  
  // Ensure environment variables are available
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

// Method to generate a refresh token
UserSchema.methods.generateRefreshToken = function () {
  const payload = { _id: this._id, email: this.email };
  
  // Ensure environment variables are available
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

// Create the User model
const User = mongoose.model('User', UserSchema);

export default User;

// Export the find function
export const find = async (query = {}) => {
  return await User.find(query);
};
