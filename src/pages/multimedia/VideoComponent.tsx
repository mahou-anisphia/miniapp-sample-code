import React, { useState, useEffect } from "react";
import { FiVideo, FiCheckCircle, FiAlertCircle, FiLock } from "react-icons/fi";
import { chooseVideo, saveVideoToPhotosAlbum } from "./video/videoApi";
import { authorize } from "../permissions/device/authorize";

export const VideoComponent: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const handleVideoSuccess = (e: any) => {
      if (e.param) {
        setVideoInfo(`Video selected: ${JSON.stringify(e.param)}`);
      }
    };

    const handleVideoFailed = (e: any) => {
      if (e.param) {
        setError(`Video error: ${e.param.msg || JSON.stringify(e.param)}`);
      }
    };

    const handleVideoSaved = () => {
      setSuccess("Video saved to album successfully");
    };

    const handleVideoSaveFailed = (e: any) => {
      setError(`Video save failed: ${e.param?.msg || "Unknown error"}`);
    };

    document.addEventListener(
      "WVVideo.Event.chooseVideoSuccess",
      handleVideoSuccess
    );
    document.addEventListener(
      "WVVideo.Event.chooseVideoFailed",
      handleVideoFailed
    );
    document.addEventListener(
      "WVVideo.Event.saveVideoSuccess",
      handleVideoSaved
    );
    document.addEventListener(
      "WVVideo.Event.saveVideoFailed",
      handleVideoSaveFailed
    );

    return () => {
      document.removeEventListener(
        "WVVideo.Event.chooseVideoSuccess",
        handleVideoSuccess
      );
      document.removeEventListener(
        "WVVideo.Event.chooseVideoFailed",
        handleVideoFailed
      );
      document.removeEventListener(
        "WVVideo.Event.saveVideoSuccess",
        handleVideoSaved
      );
      document.removeEventListener(
        "WVVideo.Event.saveVideoFailed",
        handleVideoSaveFailed
      );
    };
  }, []);

  const handlePermissionError = async (scope: "camera" | "album" | "file") => {
    setError(
      `Permission denied. Please grant ${scope} permission in device settings.`
    );
    try {
      await authorize(scope);
    } catch (err) {
      // Permission request failed or denied
    }
  };

  const handleChooseVideo = async (mode: "camera" | "video" | "both") => {
    setError("");
    setSuccess("");
    setVideoInfo("");
    try {
      const result = await chooseVideo({ mode });
      setVideoInfo(
        `Path: ${result.path}\nSize: ${result.fileSize}\nDuration: ${result.duration}s\nDimensions: ${result.width}x${result.height}`
      );
      setSuccess("Video selected successfully");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to choose video";
      if (
        errorMsg.includes("NO_PERMISSION") ||
        errorMsg.includes("permission")
      ) {
        const scope = mode === "video" ? "album" : "camera";
        await handlePermissionError(scope);
      } else {
        setError(errorMsg);
      }
    }
  };

  const handleSaveVideo = async () => {
    setError("");
    setSuccess("");
    if (!videoUrl.trim()) {
      setError("Please enter a video URL");
      return;
    }
    try {
      await saveVideoToPhotosAlbum(videoUrl);
      setSuccess("Video save initiated");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to save video";
      if (
        errorMsg.includes("NO_PERMISSION") ||
        errorMsg.includes("permission")
      ) {
        await handlePermissionError("file");
      } else {
        setError(errorMsg);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
        <FiVideo className="mr-2 text-purple-600" />
        Video Operations
      </h2>

      {/* Permission Notice */}
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
        <FiLock className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-xs text-yellow-800">
          <strong>Required Permissions:</strong> Camera (for recording), Album
          (for choosing), and File (for saving videos).
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <button
          onClick={() => handleChooseVideo("camera")}
          className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
        >
          Record Video
        </button>
        <button
          onClick={() => handleChooseVideo("video")}
          className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
        >
          Choose from Album
        </button>
        <button
          onClick={() => handleChooseVideo("both")}
          className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
        >
          Record or Choose (Both)
        </button>
      </div>

      {videoInfo && (
        <div className="p-3 bg-purple-50 rounded-lg mb-4">
          <p className="text-xs font-medium text-purple-900 mb-1">
            Video Info:
          </p>
          <pre className="text-xs text-purple-800 whitespace-pre-wrap">
            {videoInfo}
          </pre>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Save Video to Album
        </p>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Video URL (HTTP/HTTPS)"
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
        />
        <button
          onClick={handleSaveVideo}
          className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
        >
          Save Video to Album
        </button>
      </div>

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
