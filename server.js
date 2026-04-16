import express from "express";
import cors from "cors";
import userRoute from "./src/routes/userRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
