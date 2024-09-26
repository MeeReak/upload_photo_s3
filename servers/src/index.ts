import express, { Response, Request } from "express";
import { connectDB } from "./config/db";
require("dotenv").config();
import router from "@/routes/image.routes";

const app = express();

connectDB();

app.use("/image", router);

app.use("/", (req: Request, res: Response) => {
  res.status(404).json({ health: "Good Ov" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
