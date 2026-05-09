const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize SQLite Database
const dbPath = path.join(__dirname, "employees.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
});

// Initialize Database Tables
function initializeDatabase() {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      department TEXT NOT NULL,
      location TEXT NOT NULL,
      employmentType TEXT NOT NULL,
      salary INTEGER NOT NULL,
      doj TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err);
      } else {
        console.log("Employees table initialized");
        insertSampleData();
      }
    },
  );
}

// Insert Sample Data
function insertSampleData() {
  db.get("SELECT COUNT(*) as count FROM employees", (err, row) => {
    if (err) {
      console.error("Error checking employee count:", err);
      return;
    }

    if (row.count === 0) {
      const sampleData = [
        {
          name: "Alice Johnson",
          email: "alice@example.com",
          department: "Engineering",
          location: "Bangalore",
          employmentType: "Full Time",
          salary: 95000,
          doj: "15-01-2023",
          status: "active",
        },
        {
          name: "Bob Smith",
          email: "bob@example.com",
          department: "Marketing",
          location: "Hyderabad",
          employmentType: "Contract",
          salary: 75000,
          doj: "20-03-2023",
          status: "active",
        },
        {
          name: "Carol Williams",
          email: "carol@example.com",
          department: "Sales",
          location: "Pune",
          employmentType: "Part Time",
          salary: 85000,
          doj: "10-11-2022",
          status: "active",
        },
      ];

      sampleData.forEach((emp) => {
        db.run(
          `
          INSERT INTO employees (
            name,
            email,
            department,
            location,
            employmentType,
            salary,
            doj,
            status
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
          [
            emp.name,
            emp.email,
            emp.department,
            emp.location,
            emp.employmentType,
            emp.salary,
            emp.doj,
            emp.status,
          ],
          (err) => {
            if (err) {
              console.error("Error inserting sample data:", err);
            }
          },
        );
      });
    }
  });
}

// ============ CRUD ENDPOINTS ============

// CREATE - Add a new employee
app.post("/api/employees", (req, res) => {
  const {
    name,
    email,
    department,
    location,
    employmentType,
    salary,
    doj,
    status,
  } = req.body;

  // Validation
  if (
    !name ||
    !email ||
    !department ||
    !location ||
    !employmentType ||
    !salary ||
    !doj
  ) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  const query = `
    INSERT INTO employees (
      name,
      email,
      department,
      location,
      employmentType,
      salary,
      doj,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      name,
      email,
      department,
      location,
      employmentType,
      salary,
      doj,
      status || "active",
    ],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({
            error: "Email already exists",
          });
        }

        return res.status(500).json({
          error: err.message,
        });
      }

      res.status(201).json({
        id: this.lastID,
        name,
        email,
        department,
        location,
        employmentType,
        salary,
        doj,
        status: status || "active",
      });
    },
  );
});

// READ - Get all employees
app.get("/api/employees", (req, res) => {
  const query = "SELECT * FROM employees ORDER BY id DESC";

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(rows);
  });
});

// READ - Get single employee by ID
app.get("/api/employees/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM employees WHERE id = ?";

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    if (!row) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    res.json(row);
  });
});

// UPDATE - Update employee
app.put("/api/employees/:id", (req, res) => {
  const { id } = req.params;

  const {
    name,
    email,
    department,
    location,
    employmentType,
    salary,
    doj,
    status,
  } = req.body;

  // Validation
  if (
    !name ||
    !email ||
    !department ||
    !location ||
    !employmentType ||
    !salary ||
    !doj
  ) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  const query = `
    UPDATE employees
    SET
      name = ?,
      email = ?,
      department = ?,
      location = ?,
      employmentType = ?,
      salary = ?,
      doj = ?,
      status = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(
    query,
    [
      name,
      email,
      department,
      location,
      employmentType,
      salary,
      doj,
      status,
      id,
    ],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({
            error: "Email already exists",
          });
        }

        return res.status(500).json({
          error: err.message,
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Employee not found",
        });
      }

      res.json({
        id: parseInt(id),
        name,
        email,
        department,
        location,
        employmentType,
        salary,
        doj,
        status,
      });
    },
  );
});

// DELETE - Delete employee
app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM employees WHERE id = ?";

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    res.json({
      message: "Employee deleted successfully",
    });
  });
});

// SEARCH - Search employees
app.get("/api/employees/search/:query", (req, res) => {
  const { query } = req.params;

  const searchQuery = `
    SELECT *
    FROM employees
    WHERE
      name LIKE ?
      OR department LIKE ?
      OR email LIKE ?
      OR location LIKE ?
      OR employmentType LIKE ?
    ORDER BY id DESC
  `;

  db.all(
    searchQuery,
    [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(rows);
    },
  );
});

// FILTER - Get employees by status
app.get("/api/employees/filter/status/:status", (req, res) => {
  const { status } = req.params;

  const query = "SELECT * FROM employees WHERE status = ? ORDER BY id DESC";

  db.all(query, [status], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(rows);
  });
});

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "API is running",
    timestamp: new Date(),
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Something went wrong",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: ${dbPath}`);
});
