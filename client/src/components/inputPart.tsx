"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Image from "next/image";

// Define Image interface
// interface ImageData {
//   _id: string;
//   title: string;
//   url: string;
// }

interface InputPartProps {
  fetchImages: () => void; // Pass the fetchImages function from the parent
}

export const InputPart: React.FC<InputPartProps> = ({ fetchImages }) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  // Handle title input change
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Handle form submission to upload image and title
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image || !title) {
      alert("Both image and title are required");
      return;
    }

    const formData = new FormData();
    formData.append("images", image); // Append the image
    formData.append("title", title); // Append the title

    try {
      setLoading(true);
      // Make API request to upload the image and title
      const response = await axios.post(
        "http://localhost:4000/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Image and title uploaded successfully!");
        setImage(null);
        setTitle(""); // Clear the title input
        fetchImages(); // Trigger fetchImages to update the list
      }
    } catch (error) {
      console.error("Error uploading image and title", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      {/* Image Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-lg mb-8 w-full max-w-md flex flex-col items-center"
      >
        {/* Preview the uploaded image */}
        {image && (
          <div className="mb-4">
            <Image
              src={URL.createObjectURL(image)} // Preview the selected image
              alt="Selected image"
              width={250}
              height={250}
              className="rounded-lg"
            />
          </div>
        )}

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter image title"
          value={title}
          onChange={handleTitleChange}
          className="mb-4 p-2 border-2 border-green-300 rounded-lg w-full"
        />

        {/* Image Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 p-2 border-2 border-green-300 rounded-lg w-full"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-green-300" : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};
