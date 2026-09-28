app.get("/employees/:employeeId", async (req, res) => {
  try {
    const employee = await employeeCollection.findOne({
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
