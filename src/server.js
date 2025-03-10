import express from "express";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import linkRouter from "./routes/links.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);

app.get("/api/v1", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Welcome to my link sharing api...",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/links", linkRouter);

app.listen(PORT, async () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  connectDB();
});
