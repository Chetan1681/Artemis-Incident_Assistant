import express from "express";

const router = express.Router();

export default function networkServiceRoutes(collections) {
  // Get all Netwrok Services
  router.get("/", async (req, res) => {
    try {
      const networkServices = await collections.networkServices
        .find({})
        .toArray();

      res.json(networkServices);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  // Get Network Service By Service ID
  router.get("/:service_id", async (req, res) => {
    try {
      const networkService = await collections.networkServices
        .find({
          service_id: req.params.service_id,
        })
        .toArray();

      if (networkService.length === 0) {
        return res.status(404).json({
          message: "No Network Service Request found",
        });
      }

      res.json(networkService);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  // Get Network Service by name
  router.get("/servicename/:service", async (req, res) => {
    try {
      const networkService = await collections.networkServices.findOne({
        service: req.params.service,
      });

      if (!networkService) {
        return res.status(404).json({
          message: "Network Service not found",
        });
      }

      res.json(networkService);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });

  return router;
}
