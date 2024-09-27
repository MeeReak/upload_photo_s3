import React from "react";
import Image from "next/image";

// Define Image interface
interface ImageData {
  _id: string;
  title: string;
  url: string;
}

interface ListPartProps {
  images: ImageData[]; // Receive the images as props
}

export const ListPart: React.FC<ListPartProps> = ({ images }) => {
  return (
    <div className=" w-full">
      <h1 className="text-white text-2xl">List Of Image</h1>
      {images.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4 flex items-center">
          {images.map((item) => (
            <li key={item._id} className=" p-4 rounded shadow">
              <Image
                src={item.url}
                alt={item.title}
                // className="w-full h-auto"
                width={100}
                height={100}
              />
              <h2 className="text-lg font-bold">{item.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
