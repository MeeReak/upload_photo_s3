import { Router } from "express";
import { ImageController } from "@/controllers/image.controller";
import upload from "@/config/upload";
import checkFileCount from "@/middleware/fileCheck";

// Configure multer for file uploads
const router = Router();
const imageController = new ImageController();

router.post("/", checkFileCount, upload.single("images"), (req, res) =>
  imageController.createImage(req, res)
);

router.get("/:id", (req, res) => imageController.getImageById(req, res));

router.get("/", (req, res) => imageController.getAllImages(req, res));

router.put("/:id", upload.single("images"), (req, res) =>
  imageController.updateImage(req, res)
);

router.delete("/:id", (req, res) => imageController.deleteImage(req, res));

export default router;
