class Patient {
  constructor(id, name, triageLevel, arrivalTime = Date.now()) {
    this.id = id;
    this.name = name;
    this.triageLevel = triageLevel;
    this.arrivalTime = arrivalTime;
    this.status = "waiting";
    // ["waiting", "being treated", "discharged"]
  }
}

class ERQueue {
  constructor() {
    this.queue = [];
  }

  addPatient(patient) {
    this.queue.push(patient);
    this.sortQueue();
  }

  sortQueue() {
    this.queue.sort((a, b) => {
      if (a.triageLevel !== b.triageLevel) {
        return a.triageLevel - b.triageLevel;
      }
      return a.arrivalTime - b.arrivalTime;
    });
  }

  getQueue() {
    return this.queue.filter(p => p.status === "waiting");
  }

  treatPatient(id) {
    const patient = this.queue.find(p => p.id === id && p.status === "waiting");
   // Agar patient nahi mila ya status waiting nahi hai toh null return karo
    if (!patient) {
        return null; 
    }

    patient.status = "being treated";
    return patient;
}

  dischargePatient(id) {
    const index = this.queue.findIndex(p => p.id === id);
  
    if (index === -1) {
        return null; 
    }
  
    // Pehle status update karo
    this.queue[index].status = "discharged";
  
    // Remove and return the patient
    return this.queue.splice(index, 1)[0];
  }
  
}


export { Patient, ERQueue };
