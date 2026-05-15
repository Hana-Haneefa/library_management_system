import express from "express";
import cors from "cors";
import userRoute from "./src/routes/userRoute.js";
import bookRoute from "./src/routes/bookRoute.js";
import headUserRoute from "./src/routes/headUserRoute.js";
import borrowRoute from "./src/routes/borrowRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //allow cookies and tokens when sent
  }), //vite default port
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/head-users", headUserRoute);
app.use("/api/borrows", borrowRoute);

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
