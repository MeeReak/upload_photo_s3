import { Request, Response } from "express";
import { ImageService } from "@/services/image.service";
import { ICreateImage } from "@/types/image";

interface S3MulterFile extends Express.Multer.File {
  location: string;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  size: number;
  etag: string;
}

export class ImageController {
  private imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

  // Create a new image
  public async createImage(req: Request, res: Response) {
    try {
      const file = req.file as S3MulterFile;
      const data = {
        title: req.body.title,
        url: file.location,
        key: file.key,
      };
      const result = await this.imageService.createImage(data);
      if (result) {
        return res.status(201).json(result);
      } else {
        return res.status(400).json({ message: "Failed to create image" });
      }
    } catch (error: unknown) {
      console.error("Error creating image:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get a single image by ID
  public async getImageById(req: Request, res: Response): Promise<Response> {
    try {
      const id: string = req.params.id;
      const result = await this.imageService.getImageById(id);
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ message: "Image not found" });
      }
    } catch (error: unknown) {
      console.error("Error fetching image:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get all images
  public async getAllImages(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.imageService.getAllImages();
      return res.status(200).json(result);
    } catch (error: unknown) {
      console.error("Error fetching images:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update an image by ID
  public async updateImage(req: Request, res: Response): Promise<Response> {
    try {
      const id: string = req.params.id;
      const file = req.file as S3MulterFile;
      const data = {
        title: req.body.title,
        url: file.location,
        key: file.key,
      };
      const result = await this.imageService.updateImage(id, data);
      if (result) {
        return res.status(200).json(result);
      } else {
        return res
          .status(404)
          .json({ message: "Image not found or update failed" });
      }
    } catch (error: unknown) {
      console.error("Error updating image:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete an image by ID
  public async deleteImage(req: Request, res: Response): Promise<Response> {
    try {
      const id: string = req.params.id;
      const result = await this.imageService.deleteImage(id);
      if (result) {
        return res.status(200).json({ message: "Image deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ message: "Image not found or delete failed" });
      }
    } catch (error: unknown) {
      console.error("Error deleting image:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
