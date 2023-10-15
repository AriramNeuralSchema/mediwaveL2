const express = require("express");
const router = express.Router();
const CribsModel = require("../model/Cribs");

router.get("/cribs", async (req, res) => {
  const cribsList = await CribsModel.getCribesList();
  return res.status(200).send(cribsList);
});

router.post("/cribs", async (req, res) => {
  const result = await CribsModel.addCribHound(req.body);
  return res.status(200).send(result);
});

router.put("/cribs/:id", async (req, res) => {
  const result = await CribsModel.updateCribHound(req.params.id, req.body);
  return res.status(200).send(result);
});

router.delete("/cribs/:id", async (req, res) => {
  const result = await CribsModel.deleteCribHound(req.params.id);
  return res.status(200).send(result);
});

router.get("/cribs/:id", async (req, res) => {
  const result = await CribsModel.getCribsInfo(req.params.id);
  return res.status(200).send(result);
});

module.exports = router;
