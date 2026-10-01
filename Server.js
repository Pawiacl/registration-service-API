const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const registrationRoutes =
  require("./Routes/registrationRoutes");

app.use(
  "/api/registration",
  registrationRoutes
);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Registration Service is running",
  });
});

const connectDB = require("./Config/db");

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `Registration Service running on port ${PORT}`
  );
});