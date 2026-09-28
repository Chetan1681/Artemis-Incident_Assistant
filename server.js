import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const client = new MongoClient(process.env.MONGO_URI);

let employeeCollection;

async function connectDB() {
  try {
    await client.connect();

    const db = client.db(process.env.DB_NAME);

    employeeCollection = db.collection(process.env.COLLECTION_NAME);

    console.log("Connected to MongoDB Atlas successfully");
  } catch (err) {
    console.error(err);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Employee API running",
  });
});

app.get("/employees", async (req, res) => {
  const employees = await employeeCollection.find({}).toArray();
  res.json(employees);
});

app.get("/employees/:employeeId", async (req, res) => {
  const employee = await employeeCollection.findOne({
    employee_id: req.params.employeeId,
  });

  res.json(employee);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
