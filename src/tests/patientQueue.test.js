import { ERQueue, Patient } from "../models/patientModel.js";


describe("ERQueue Management Tests", () => {
  let queue;

  beforeEach(() => {
     // Har test ke liye naya queue
    queue = new ERQueue();
  });

  test("Patients should be sorted by priority", () => {
    queue.addPatient(new Patient(1, "Alice", 3));
    queue.addPatient(new Patient(2, "Bob", 1));  // High priority
    queue.addPatient(new Patient(3, "Charlie", 2));

    const sortedQueue = queue.getQueue();
    expect(sortedQueue.map(p => p.name)).toEqual(["Bob", "Charlie", "Alice"]);
  });

  test("Patients with the same priority should maintain order (FIFO)", () => {
    queue.addPatient(new Patient(1, "Alice", 2));
    queue.addPatient(new Patient(2, "Bob", 2));
    queue.addPatient(new Patient(3, "Charlie", 1));

    const sortedQueue = queue.getQueue();
    expect(sortedQueue.map(p => p.name)).toEqual(["Charlie", "Alice", "Bob"]);
  });

//   test("Treating a patient should update their status", () => {
//     queue.addPatient(new Patient(1, "Alice", 2));
//     const treatedPatient = queue.treatPatient();

//     expect(treatedPatient.status).toBe("being treated");
//   });

  test("Treating a patient should update their status", () => {
    const queue = new ERQueue();
    queue.addPatient(new Patient(1, "Alice", 2)); // Ensure patient exists
    queue.getQueue()[0].status = "waiting"; // Ensure correct status

    const treatedPatient = queue.treatPatient();

    expect(treatedPatient.status).toBe("being treated");
});


  test("Discharging a patient should remove them from the queue", () => {
    queue.addPatient(new Patient(1, "Alice", 2));
    queue.dischargePatient(1);

    expect(queue.getQueue().length).toBe(0);
  });

  test("Discharge should not remove non-existing patients", () => {
    queue.addPatient(new Patient(1, "Alice", 2));
    const result = queue.dischargePatient(999);

    expect(result).toBe(null);
    expect(queue.getQueue().length).toBe(1);
  });

  test("Empty queue should return an empty array", () => {
    expect(queue.getQueue()).toEqual([]);
  });
});
