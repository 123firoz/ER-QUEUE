import dotenv from "dotenv";
import express from "express";
import logger from "./src/middleware/logger.js"; 
import { Server } from "socket.io";
import { createServer } from "http";

import patientRoutes from "./src/routes/patientRoutes.js";

dotenv.config();
const app = express();
app.use(logger); 

 // Create HTTP server
const server = createServer(app); 
const io = new Server(server, {
// Allow all origins (can be restricted later)
  cors: { origin: "*" }, 
})

app.use(express.json());

// Pass `io` to routes so controllers can use it
app.use((req, res, next) => {
    req.io = io;
    next();
  });

app.use("/api/patients", patientRoutes);

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
  

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
