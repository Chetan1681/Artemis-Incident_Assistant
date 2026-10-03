import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

import employeeRoutes from "./API Routes/employeeRoutes.js";
import incidentRoutes from "./API Routes/incidentRoutes.js";
import applicationRoutes from "./API Routes/applicationRoutes.js";
import networkServiceRoutes from "./API Routes/networkServiceRoutes.js";

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
    collections.applications = db.collection("Applications");
    collections.networkServices = db.collection("NetworkServices");

    console.log("Connected to MongoDB Atlas successfully");
  } catch (err) {
    console.error(err);
  }
}

await connectDB();

app.use("/employees", employeeRoutes(collections));
app.use("/incidents", incidentRoutes(collections));
app.use("/applications", applicationRoutes(collections));
app.use("/networkServices", networkServiceRoutes(collections));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API running",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
