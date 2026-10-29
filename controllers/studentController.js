
import Student from "../models/Student.js";

// 1. Add a new student

export const createStudent = async (req, res, next) => {
  try {
    const { name, email, phone, city, category } = req.body;

    const student = await Student.create({
      name,
      email,
      phone,
      city,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: student,
    });
  } catch (err) {
    next(err);
  }
};

// 2. Get all students

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      message: "Students fetched successfully.",
      totalStudents: students.length,
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

// 3. Get student by ID

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student fetched successfully.",
      data: student,
    });
  } catch (err) {
    next(err);
  }
};

// 4. Update student details

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, city, category } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        city,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: student,
    });
  } catch (err) {
    next(err);
  }
};

// 5. Delete student

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// 6. Search students by name or email

export const searchStudents = async (req, res, next) => {
  try {
    const { search } = req.query;

    if (!search || !search.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search value.",
      });
    }

    const escapedSearch = search.trim().replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const students = await Student.find({
      $or: [
        { name: { $regex: escapedSearch, $options: "i" } },
        { email: { $regex: escapedSearch, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Student search completed successfully.",
      totalStudents: students.length,
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

// 7. Filter students by city or category

export const filterStudents = async (req, res, next) => {
  try {
    const { city, category } = req.query;
    const filter = {};

    if (city) {
      filter.city = city;
    }

    if (category) {
      filter.category = category;
    }

    const students = await Student.find(filter);

    res.status(200).json({
      success: true,
      message: "Students filtered successfully.",
      totalStudents: students.length,
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

// 8. Sort students A-Z or Z-A

export const sortStudents = async (req, res, next) => {
  try {
    const { order = "asc" } = req.query;

    const sortOrder = order === "desc" ? -1 : 1;

    const students = await Student.find().sort({
      name: sortOrder,
    });

    res.status(200).json({
      success: true,
      message: "Students sorted successfully.",
      order: order === "desc" ? "Z-A" : "A-Z",
      totalStudents: students.length,
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

// 9. Paginate student records

export const paginateStudents = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);

    const requestedLimit = parseInt(req.query.limit, 10) || 5;
    const limit = [5, 10].includes(requestedLimit)
      ? requestedLimit
      : 5;

    const totalStudents = await Student.countDocuments();

    const students = await Student.find()
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Students fetched successfully.",
      totalStudents,
      currentPage: page,
      totalPages: Math.ceil(totalStudents / limit),
      limit,
      data: students,
    });
  } catch (err) {
    next(err);
  }
};
