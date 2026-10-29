# Student Data Table API

A REST API for managing student records, built with **Node.js, Express.js, MongoDB, and Mongoose**. It supports CRUD operations, searching, filtering, sorting, and pagination.

## Features

- Create a student record
- Retrieve all students or one student by ID
- Update student information
- Delete a student record
- Search students by name or email
- Filter students by city and/or category
- Sort student names from A–Z or Z–A
- Paginate results using page sizes of 5 or 10
- Configure the app using environment variables
- Check server and database status using a health endpoint

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — REST API framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **dotenv** — Loads environment variables from `.env`
- **nodemon** — Restarts the development server when files change

## Project Structure

```text
Student-table-data/
├── controllers/
│   └── studentController.js
├── models/
│   └── Student.js
├── routes/
│   └── studentRoutes.js
├── .env                 # Create locally; do not commit secrets
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Prerequisites

Install these tools before running the project:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- MongoDB running locally, or a MongoDB connection URI
- Git (optional, for cloning the repository)

## Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/akshat018k/Student-table-data.git
cd Student-table-data
```

Install dependencies:

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root of the project:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student_data_db
```

If you use MongoDB Atlas or another MongoDB server, replace the local URI with your own connection string. Keep credentials private and never commit the real `.env` file.

## Run the Project

Start the development server with nodemon:

```bash
npm run dev
```

Or start it normally:

```bash
npm start
```

By default, the API runs at:

```text
http://localhost:5000
```

Useful endpoints:

- `GET /` — confirms that the API is running
- `GET /health` — reports server status and database connection state
- `/api/students` — student management API

## API Reference

Base URL: `http://localhost:5000/api/students`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student by MongoDB ID |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/api/students/search?search=rahul` | Search by name or email |
| GET | `/api/students/filter?city=Surat` | Filter by city |
| GET | `/api/students/filter?category=Science` | Filter by category |
| GET | `/api/students/filter?city=Surat&category=Science` | Filter by city and category |
| GET | `/api/students/sort?order=asc` | Sort names A–Z |
| GET | `/api/students/sort?order=desc` | Sort names Z–A |
| GET | `/api/students/pagination?page=1&limit=5` | Get a page of 5 records |
| GET | `/api/students/pagination?page=1&limit=10` | Get a page of 10 records |

### Student Data Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Student's name |
| `email` | String | Yes | Unique email address; stored lowercase |
| `phone` | String | Yes | Contact phone number |
| `city` | String | Yes | Student's city |
| `category` | String | Yes | Student category, such as Science or Commerce |

Mongoose also provides `_id`, `createdAt`, and `updatedAt` fields.

## Example Requests

You can run these requests in a terminal using `curl`, or send them with Postman.

### 1. Create a Student

```bash
curl -i -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Shah",
    "email": "priya.shah@example.com",
    "phone": "9876543210",
    "city": "Surat",
    "category": "Science"
  }'
```

A successful create returns `201 Created`. Use a unique email for each new student.

### 2. Get All Students

```bash
curl -i http://localhost:5000/api/students
```

### 3. Get One Student

Replace `STUDENT_ID` with the actual `_id` returned by the API:

```bash
curl -i http://localhost:5000/api/students/STUDENT_ID
```

### 4. Update a Student

This example changes the student's city:

```bash
curl -i -X PUT http://localhost:5000/api/students/STUDENT_ID \
  -H "Content-Type: application/json" \
  -d '{"city":"Ahmedabad"}'
```

### 5. Delete a Student

**This permanently deletes the selected record from the database.** Replace the ID carefully:

```bash
curl -i -X DELETE http://localhost:5000/api/students/STUDENT_ID
```

### 6. Search, Filter, Sort, and Paginate

```bash
# Search by name or email
curl "http://localhost:5000/api/students/search?search=Priya"

# Filter by city
curl "http://localhost:5000/api/students/filter?city=Surat"

# Filter by category
curl "http://localhost:5000/api/students/filter?category=Science"

# Filter by both city and category
curl "http://localhost:5000/api/students/filter?city=Surat&category=Science"

# Sort names A–Z
curl "http://localhost:5000/api/students/sort?order=asc"

# Sort names Z–A
curl "http://localhost:5000/api/students/sort?order=desc"

# Get page 2, with 5 records per page
curl "http://localhost:5000/api/students/pagination?page=2&limit=5"
```

## Testing

1. Make sure MongoDB is running.
2. Start the API using `npm run dev`.
3. Open `http://localhost:5000/health` and confirm the database is connected.
4. Test the endpoints using Postman or `curl`.
5. Try valid and invalid IDs, duplicate email addresses, empty search values, and different pagination values.

## Response Format

Successful responses generally include `success: true`, a message, and relevant data. Error responses include `success: false` and a message. Typical HTTP status codes include `200 OK`, `201 Created`, `400 Bad Request`, and `404 Not Found`.

## Notes

- Start MongoDB before starting the API.
- Student IDs must be actual MongoDB IDs returned by the API.
- Email addresses are unique, so do not reuse an existing email when creating a student.
- Pagination supports page sizes of 5 and 10; unsupported values default to 5.
- This repository currently contains the **backend REST API**. A separate frontend is needed for a visual student table interface.
- Never commit `.env`, database passwords, API keys, or other credentials.

## Future Improvements

- Add automated tests
- Improve input validation and duplicate-email error handling
- Validate MongoDB IDs and return client-friendly status codes for invalid IDs
- Add authentication and authorization if the API will be used by multiple users
- Build a frontend with a data table, forms, search controls, filters, sorting, and pagination

## Author

**Akshat Kumbhani**

- GitHub: [@akshat018k](https://github.com/akshat018k)
- Repository: [Student-table-data](https://github.com/akshat018k/Student-table-data)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
