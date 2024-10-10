"use client";
import React, { useState, useEffect } from "react";

interface ImageDetails {
  file: File;
  width: number;
  height: number;
}

const combineFileLists = (
  fileList1: FileList | null,
  fileList2: FileList | null
): FileList | null => {
  if (fileList1 === null && fileList2 === null) {
    return null;
  }

  const mergedFileList = new DataTransfer();

  const addFileToMergedList = (file: File) => {
    mergedFileList.items.add(file);
  };

  if (fileList1) {
    Array.from(fileList1).forEach(addFileToMergedList);
  }

  if (fileList2) {
    Array.from(fileList2).forEach(addFileToMergedList);
  }

  return mergedFileList.files;
};
const ImageUpload: React.FC = () => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [images, setImages] = useState<ImageDetails[]>([]);

  // Handle file upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFileList((prev) => combineFileLists(prev, files)); // Set FileList state
    }
    // event.target.value = ""; // Reset input value to allow re-upload of the same file
  };

  // Calculate image dimensions when the file list changes
  useEffect(() => {
    if (!fileList) return;

    const imageArray: ImageDetails[] = [];
    Array.from(fileList).forEach((file, index) => {
      const img = new Image();
      const reader = new FileReader();

      const clonedFile = new Blob([file], { type: file.type });

      reader.onload = (e) => {
        console.log("onload", file.name, index);
        if (e.target?.result) {
          img.src = e.target.result.toString();
        }
      };

      img.onload = () => {
        imageArray.push({ file, width: img.width, height: img.height });

        // After all files are processed, update the state
        if (imageArray.length === fileList.length) {
          setImages((prevImages) => [...prevImages, ...imageArray]);
        }
      };

      reader.readAsDataURL(clonedFile);

      reader.onerror = () => {
        console.error(
          `${index}Unable to load file: ${file.name}. Please check if the file was renamed.`
        );
      };
    });
  }, [fileList]); // Effect depends on fileList

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(image.file)}
              alt={`image-${index}`}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
            <p>
              Dimensions: {image.width} x {image.height}px
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
