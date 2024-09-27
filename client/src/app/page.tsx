"use client"

import { useState, useEffect } from "react";
import { InputPart } from "@/components/inputPart";
import { ListPart } from "@/components/listPart";
import axios from "axios";

// Image type for consistency
interface Image {
  _id: string;
  title: string;
  url: string;
}

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);

  // Fetch existing images from the backend (MongoDB or S3)
  const fetchImages = async () => {
    try {
      const response = await axios.get<Image[]>("http://localhost:4000/image"); // Adjust endpoint if needed
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  // Fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="flex">
      {/* Pass fetchImages and images to InputPart */}
      <InputPart fetchImages={fetchImages} />
      {/* Pass the images as props to ListPart */}
      <ListPart images={images} />
    </div>
  );
}
