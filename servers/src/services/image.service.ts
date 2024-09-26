import { deleteImage } from "@/middleware/deleteImage";
import { ImageRepository } from "@/repository/image.repository";
import { ICreateImage } from "@/types/image";
import { Document } from "mongoose";

export class ImageService {
  private imageRepository: ImageRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
  }

  // Create a new image
  public async createImage(data: ICreateImage): Promise<Document | null> {
    try {
      const response = await this.imageRepository.create(data);
      return response;
    } catch (error: unknown) {
      console.error("Error creating image:", error);
      return null;
    }
  }

  // Get an image by ID
  public async getImageById(id: string): Promise<Document | null> {
    try {
      const response = await this.imageRepository.findById(id);
      if (!response) {
        console.error(`Image with id ${id} not found`);
      }
      return response;
    } catch (error: unknown) {
      console.error("Error fetching image by ID:", error);
      return null;
    }
  }

  // Get all images
  public async getAllImages(): Promise<Document[] | null> {
    try {
      const response = await this.imageRepository.findAll();
      return response;
    } catch (error: unknown) {
      console.error("Error fetching all images:", error);
      return null;
    }
  }

  // Update an existing image by ID
  public async updateImage(
    id: string,
    data: Partial<ICreateImage>
  ): Promise<Document | null> {
    try {
      const existing = await this.imageRepository.findById(id);
      deleteImage(existing); //delete image in s3
      const response = await this.imageRepository.update(id, data);
      if (!response) {
        console.error(`Unable to update image with id ${id}`);
      }
      return response;
    } catch (error: unknown) {
      console.error("Error updating image:", error);
      return null;
    }
  }

  // Delete an image by ID
  public async deleteImage(id: string) {
    try {
      const existing = await this.imageRepository.findById(id);
      deleteImage(existing); //delete image in s3
      const response = await this.imageRepository.delete(id);
      if (!response) {
        console.error(`Unable to delete image with id ${id}`);
      }
      return response;
    } catch (error: unknown) {
      console.error("Error deleting image:", error);
      return null;
    }
  }
}
