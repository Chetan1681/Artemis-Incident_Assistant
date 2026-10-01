import express from "express";

const router = express.Router();

export default function applicationRoutes(collections) {
  // Get all applications
  router.get("/", async (req, res) => {
    try {
      const applications = await collections.applications.find({}).toArray();

      res.json(applications);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  // Get application by name
  router.get("/:applicationName", async (req, res) => {
    try {
      const application = await collections.applications.findOne({
        application: req.params.applicationName,
      });

      if (!application) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      res.json(application);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  return router;
}
