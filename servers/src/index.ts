import express, { Response, Request } from "express";
import { connectDB } from "./config/db";
require("dotenv").config();
import router from "@/routes/image.routes";
import cors from "cors";

const app = express();
app.use(cors());

connectDB();

app.use("/image", router);

app.use("/", (req: Request, res: Response) => {
  res.status(404).json({ health: "Good Ov" });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
