import React, { useState, useEffect } from "react";
import { FiCamera, FiLock } from "react-icons/fi";
import { takePhoto } from "../../api/multimedia/takePhoto";
import { authorize } from "../../api/permissions/authorize";
import { useApiCall } from "../../hooks/useApiCall";
import { StatusMessage } from "../../components/common/StatusMessage";

export const CameraComponent: React.FC = () => {
  const [photoResult, setPhotoResult] = useState("");
  const { run, feedback, showFeedback, loading } = useApiCall();

  useEffect(() => {
    const handlePhotoUploadSuccess = (e: any) => {
      showFeedback("success", `Photo uploaded: ${JSON.stringify(e.param)}`);
    };

    const handlePhotoUploadFailed = (e: any) => {
      showFeedback("error", `Photo upload failed: ${JSON.stringify(e.param)}`);
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
  }, [showFeedback]);

  const handlePermissionError = async (scope: "camera" | "album") => {
    showFeedback(
      "error",
      `Permission denied. Please grant ${scope} permission in device settings.`
    );
    try {
      await authorize(scope);
    } catch (err) {
      // Permission request failed or denied
    }
  };

  const handleTakePhoto = async (mode: "camera" | "photo" | "both") => {
    setPhotoResult("");
    try {
      const result = await run(
        () => takePhoto({ mode }),
        {
          successMessage: "Photo taken successfully",
          errorMessage: () => "",
        }
      );
      if (!result) {
        return;
      }
      setPhotoResult(
        `Photo URL: ${result.url}\nLocal path: ${result.localPath}`
      );
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
        showFeedback("error", errorMsg);
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
          disabled={loading}
          className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          Take Photo
        </button>
        <button
          onClick={() => handleTakePhoto("photo")}
          disabled={loading}
          className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          Choose from Album
        </button>
        <button
          onClick={() => handleTakePhoto("both")}
          disabled={loading}
          className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
          }`}
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

      {feedback && (
        <div className="mt-4">
          <StatusMessage type={feedback.type} message={feedback.message} />
        </div>
      )}
    </div>
  );
};
