// routes/formRoutes.js
import express from "express";
import {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controller/formcontroller/Form.Controller.js";

const router = express.Router();

// Routes for forms
router
  .route("/")
  .get(getForms) // GET all forms
  .post(createForm); // POST a new form

router
  .route("/:id")
  .get(getFormById) // GET a single form by ID
  .put(updateForm) // PUT (update) a form
  .delete(deleteForm); // DELETE a form

export default router;
