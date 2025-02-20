import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.Routes.js";
import directorRoutes from "./routes/director.Routes.js";
import customerRoutes from "./routes/crm.Routes.js";
import employeeRoutes from "./routes/employee.Routes.js";
import blogRoutes from "./routes/blog.Routes.js";
import seoRoutes from "./routes/dmroutes/Seo.Routes.js";
import formRoutes from "./routes/Form.Routes.js";
dotenv.config();
const app = express();
app.use(cors());
// setup to access the permission of the cors

// app.use((req, res, next) => {
//     console.log('Incoming request:', req.body, req.file);
//     next();
//   });

// configuration
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// To acess and set the user server cookies.
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/director", directorRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/crm", customerRoutes);
app.use("/api/blog", blogRoutes);
//digital marketing routes
app.use("/api/seo", seoRoutes);
//routes path define
//form api
app.use("/api/form", formRoutes);
export { app };
