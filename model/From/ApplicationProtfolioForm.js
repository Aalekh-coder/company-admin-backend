import { Schema, model } from "mongoose";

// Define the Form schema
const applicationprotfolioformSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  category: {
    type: [String], // Array of strings
    required: [true, "Category is required"],
    default: [],
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Form model   
const Form = model("Form",applicationprotfolioformSchema);

export default Form;
