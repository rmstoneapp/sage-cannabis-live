"use client";

import { UploadButton } from "lib/uploadthing";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: Error) => void;
}

export function FileUpload({ onUploadComplete, onUploadError }: FileUploadProps) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res?.[0]) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(error) => {
        console.error("Upload error:", error);
        if (onUploadError) {
          onUploadError(error);
        }
      }}
    />
  );
}