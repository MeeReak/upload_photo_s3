import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // change type to string if your uploading just one image
    url: {
      type: String,
      required: true,
    },
    key: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      versionKey: false, // Excludes __v from the JSON response
    },
    toObject: {
      versionKey: false, // Excludes __v when using toObject()
    },
  }
);

export default mongoose.model("Image", imageSchema);
