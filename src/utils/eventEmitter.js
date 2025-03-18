import EventEmitter from "events";

export const eventEmitter = new EventEmitter();

eventEmitter.on("criticalPatient", (patient) => {
  console.log(`🚨 ALERT: Critical patient ${patient.name} added!`);
});
