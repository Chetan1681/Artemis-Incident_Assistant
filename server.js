import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

import employeeRoutes from "./API Routes/employees.js";
import incidentRoutes from "./API Routes/incidents.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

const collections = {};

async function connectDB() {
  try {
    await client.connect();

    const db = client.db(process.env.DB_NAME);

    collections.employees = db.collection("Employees");
    collections.incidents = db.collection("Incidents");

    console.log("Connected to MongoDB Atlas successfully");
  } catch (err) {
    console.error(err);
  }
}

await connectDB();

app.use("/employees", employeeRoutes(collections));
app.use("/incidents", incidentRoutes(collections));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API running",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
