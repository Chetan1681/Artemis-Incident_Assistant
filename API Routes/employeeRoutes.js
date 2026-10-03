import express from "express";

const router = express.Router();

export default function employeeRoutes(collections) {
  // Get all employees
  router.get("/", async (req, res) => {
    try {
      const employees = await collections.employees.find({}).toArray();

      res.json(employees);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  // Get employee by ID
  router.get("/:employeeId", async (req, res) => {
    try {
      const employee = await collections.employees.findOne({
        employee_id: req.params.employeeId,
      });

      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      res.json(employee);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  return router;
}
