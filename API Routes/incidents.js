import express from "express";

const router = express.Router();

export default function incidentRoutes(collections) {
  // Get all incidents
  router.get("/", async (req, res) => {
    try {
      const incidents = await collections.incidents.find({}).toArray();

      res.json(incidents);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  // Get incident by ID
  router.get("/:incidentId", async (req, res) => {
    try {
      const incident = await collections.incidents.findOne({
        incident_id: req.params.incidentId,
      });

      if (!incident) {
        return res.status(404).json({
          message: "Incident not found",
        });
      }

      res.json(incident);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  return router;
}
