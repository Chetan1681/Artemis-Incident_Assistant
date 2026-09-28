app.get("/employees", async (req, res) => {
  try {
    const employees = await employeeCollection.find({}).toArray();

    res.json(employees);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
