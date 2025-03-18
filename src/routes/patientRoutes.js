import express from "express";
import {
  addPatient,
  getQueue,
  treatPatient,
  dischargePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/add", addPatient);
router.get("/", getQueue);
router.put("/treat/:id", treatPatient);
router.delete("/discharge/:id", dischargePatient);

export default router;
