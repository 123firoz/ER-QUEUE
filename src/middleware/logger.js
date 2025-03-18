import fs from "fs";
import path from "path";
import os from "os";

//file path
const logFilePath = path.join(process.cwd(), "logs.txt");

const logger = (req, res, next) => {
  // Client IP
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  //get  System platform (Windows, Linux, etc.)
  const platform = os.platform();
  //get  Server port 
  const port = process.env.PORT;

  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} | IP: ${clientIp} | Platform: ${platform} | Port: ${port}\n`;

  console.log(logMessage);

  // Log ko file me append kiya
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Log file me likhne me error aaya:", err);
    }
  });

  next();
};

export default logger;
