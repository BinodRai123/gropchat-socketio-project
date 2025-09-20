import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/crop";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function ProfileImageUpload() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Please select an image file only!");
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      setLoading(true);

      const cropped = await getCroppedImg(image, croppedAreaPixels);

      // Convert base64 -> Blob
      const response = await fetch(cropped);
      const blob = await response.blob();

      // FormData
      const formData = new FormData();
      formData.append("img", blob, "profile.jpg");

      // Upload
      const { data } = await axios.post("/api/uploadImage", formData);

      setCroppedImage(cropped);
      navigate("/chat")
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [image, croppedAreaPixels]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-900 text-white min-h-screen">
      {/* Upload Button */}
      <label className="px-4 py-2 bg-blue-600 rounded cursor-pointer hover:bg-blue-700">
        Choose Profile Picture
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Cropper */}
      {image && !croppedImage && (
        <div className="relative w-72 h-72 bg-black rounded overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {/* Zoom slider */}
      {image && !croppedImage && (
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-64"
        />
      )}

      {/* Confirm Crop */}
      {image && !croppedImage && (
        <button
          onClick={showCroppedImage}
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Saving..." : "Save Profile Picture"}
        </button>
      )}

      {/* Final Preview */}
      {croppedImage && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={croppedImage}
            alt="Cropped"
            className="w-32 h-32 rounded-full object-cover border-2 border-white"
          />
          <button
            onClick={() => {
              setCroppedImage(null);
              setImage(null);
            }}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Change Picture
          </button>
        </div>
      )}
    </div>
  );
}
