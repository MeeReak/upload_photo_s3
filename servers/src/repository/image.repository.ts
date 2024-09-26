import imageModel from "@/models/image.model";
import { ICreateImage } from "@/types/image";
import { Document } from "mongoose";

export class ImageRepository {
  private _model: typeof imageModel;

  constructor() {
    this._model = imageModel;
  }

  // Create an image
  public async create(data: ICreateImage): Promise<Document | null> {
    try {
      const response = await this._model.create(data);
      return response;
    } catch (error: unknown) {
      console.error("Error creating image:", error);
      return null;
    }
  }

  // Read (find) a single image by ID
  public async findById(id: string): Promise<Document | null> {
    try {
      const response = await this._model.findById(id).exec();
      return response;
    } catch (error: unknown) {
      console.error("Error finding image by ID:", error);
      return null;
    }
  }

  // Read (find) all images
  public async findAll(): Promise<Document[] | null> {
    try {
      const response = await this._model.find().exec();
      return response;
    } catch (error: unknown) {
      console.error("Error finding all images:", error);
      return null;
    }
  }

  // Update an image by ID
  public async update(
    id: string,
    data: Partial<ICreateImage>
  ): Promise<Document | null> {
    try {
      const response = await this._model
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return response;
    } catch (error: unknown) {
      console.error("Error updating image:", error);
      return null;
    }
  }

  // Delete an image by ID
  public async delete(id: string): Promise<Document | null> {
    try {
      const response = await this._model.findByIdAndDelete(id).exec();
      return response;
    } catch (error: unknown) {
      console.error("Error deleting image:", error);
      return null;
    }
  }
}
