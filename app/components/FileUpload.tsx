"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (response: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    // Validate file type
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      return false;
    }

    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return false;
    }

    // 100 MB limit
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB.");
      return false;
    }

    return true;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      // Get ImageKit authentication from backend
      const authRes = await fetch("/api/imagekit-auth");

      if (!authRes.ok) {
        throw new Error("Failed to authenticate ImageKit upload");
      }

      const auth = await authRes.json();

      const { token, signature, expire, publicKey } = auth;

      // Upload to ImageKit
      const uploadResponse = await upload({
        file,
        fileName: file.name,
        expire,
        token,
        signature,

        publicKey: publicKey || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,

        useUniqueFileName: true,

        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;

            onProgress(Math.round(percent));
          }
        },
      });

      onSuccess(uploadResponse);
    } catch (error) {
      console.error("File Upload Error:", error);

      if (error instanceof ImageKitAbortError) {
        setError("Upload was cancelled.");
      } else if (error instanceof ImageKitInvalidRequestError) {
        setError("Invalid upload request.");
      } else if (error instanceof ImageKitUploadNetworkError) {
        setError("Network error. Please try again.");
      } else if (error instanceof ImageKitServerError) {
        setError("ImageKit server error. Please try again.");
      } else {
        setError("File upload failed. Please try again.");
      }
    } finally {
      setUploading(false);

      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <label
        className={`flex cursor-pointer items-center justify-center rounded-lg border border-dashed px-4 py-3 text-sm transition ${
          uploading
            ? "cursor-not-allowed border-slate-700 bg-slate-900 text-slate-500"
            : "border-slate-700 bg-slate-900 text-slate-300 hover:border-blue-500 hover:bg-slate-800"
        }`}
      >
        {uploading ? "Uploading..." : "Choose File"}

        <input
          ref={fileInputRef}
          type="file"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default FileUpload;
