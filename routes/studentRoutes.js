
import express from "express";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
  filterStudents,
  sortStudents,
  paginateStudents,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/search", searchStudents);
router.get("/filter", filterStudents);
router.get("/sort", sortStudents);
router.get("/pagination", paginateStudents);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
