import React, { useState, useEffect } from "react";
import { FiCamera, FiCheckCircle, FiAlertCircle, FiLock } from "react-icons/fi";
import { takePhoto } from "./camera/cameraApi";
import { authorize } from "../permissions/device/authorize";

export const CameraComponent: React.FC = () => {
  const [photoResult, setPhotoResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const handlePhotoUploadSuccess = (e: any) => {
      setSuccess(`Photo uploaded: ${JSON.stringify(e.param)}`);
    };

    const handlePhotoUploadFailed = (e: any) => {
      setError(`Photo upload failed: ${JSON.stringify(e.param)}`);
    };

    document.addEventListener(
      "WVPhoto.Event.uploadPhotoSuccess",
      handlePhotoUploadSuccess
    );
    document.addEventListener(
      "WVPhoto.Event.uploadPhotoFailed",
      handlePhotoUploadFailed
    );

    return () => {
      document.removeEventListener(
        "WVPhoto.Event.uploadPhotoSuccess",
        handlePhotoUploadSuccess
      );
      document.removeEventListener(
        "WVPhoto.Event.uploadPhotoFailed",
        handlePhotoUploadFailed
      );
    };
  }, []);

  const handlePermissionError = async (scope: "camera" | "album") => {
    setError(
      `Permission denied. Please grant ${scope} permission in device settings.`
    );
    try {
      await authorize(scope);
    } catch (err) {
      // Permission request failed or denied
    }
  };

  const handleTakePhoto = async (mode: "camera" | "photo" | "both") => {
    setError("");
    setSuccess("");
    setPhotoResult("");
    try {
      const result = await takePhoto({ mode });
      setPhotoResult(
        `Photo URL: ${result.url}\nLocal path: ${result.localPath}`
      );
      setSuccess("Photo taken successfully");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to take photo";
      if (
        errorMsg.includes("NO_PERMISSION") ||
        errorMsg.includes("permission")
      ) {
        const scope = mode === "photo" ? "album" : "camera";
        await handlePermissionError(scope);
      } else {
        setError(errorMsg);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
        <FiCamera className="mr-2 text-orange-600" />
        Camera
      </h2>

      {/* Permission Notice */}
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
        <FiLock className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-xs text-yellow-800">
          <strong>Required Permissions:</strong> Camera (for taking photos) and
          Album (for choosing photos).
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <button
          onClick={() => handleTakePhoto("camera")}
          className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
        >
          Take Photo
        </button>
        <button
          onClick={() => handleTakePhoto("photo")}
          className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
        >
          Choose from Album
        </button>
        <button
          onClick={() => handleTakePhoto("both")}
          className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
        >
          Take or Choose (Both)
        </button>
      </div>

      {photoResult && (
        <div className="p-3 bg-orange-50 rounded-lg mb-4">
          <p className="text-xs font-medium text-orange-900 mb-1">
            Photo Result:
          </p>
          <pre className="text-xs text-orange-800 whitespace-pre-wrap">
            {photoResult}
          </pre>
        </div>
      )}

      {/* Success/Error */}
      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <FiAlertCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};
