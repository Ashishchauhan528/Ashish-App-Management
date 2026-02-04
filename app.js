import express from "express";
import userRouter from "./routes/users.routes.js";

const app = express();

//Body Parser
app.use(express.json());


//Base Routes
app.get("/", (req, res) => {
    res.send("User Management API is running");
});

//USER Routes
app.use("/api/users", userRouter);

export default app;