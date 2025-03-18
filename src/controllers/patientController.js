import { Patient, ERQueue } from "../models/patientModel.js";
import { eventEmitter } from "../utils/eventEmitter.js";

const queue = new ERQueue();
let patientIdCounter = 1;

export const addPatient = (req, res) => {
    const { name, triageLevel } = req.body;

    if (!name || triageLevel < 1 || triageLevel > 5) {
        return res.status(400).json({ message: "Invalid patient data" });
    }

    const patient = new Patient(patientIdCounter++, name, triageLevel);
    queue.addPatient(patient);
    //  Notify all clients
    req.io.emit("patientAdded", patient);

    if (triageLevel === 1) {
        eventEmitter.emit("criticalPatient", patient);
    }

    res.status(201).json({ message: "Patient added", patient });
};

export const getQueue = (req, res) => {
    res.json(queue.getQueue());
};

export const treatPatient = (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(`Treating patient ID: ${id}`);

    const patient = queue.treatPatient(id);

    if (!patient) {
        return res.status(404).json({ error: "Patient not found or not waiting" });
    }

    req.io.emit("patientTreated", patient);

    res.json({ message: "Patient being treated", patient });
};

export const dischargePatient = (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(`Discharging patient ID: ${id}`);

    const removedPatient = queue.dischargePatient(id);

    if (!removedPatient) {
        return res.status(404).json({ message: "Patient not found" });
    }

    req.io.emit("patientDischarged", removedPatient);

    res.json({
        message: "Patient discharged",
        patient: removedPatient
    });
};

