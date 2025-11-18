import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { authorize, PermissionScope } from "../permissions/device/authorize";
import { ImageComponent } from "./ImageComponent";
import { VideoComponent } from "./VideoComponent";
import { AudioComponent } from "./AudioComponent";
import { CameraComponent } from "./CameraComponent";
import { StorageComponent } from "./StorageComponent";

export const MultimediaPage: React.FC = () => {
  const [permissionError, setPermissionError] = useState("");
  const [permissionSuccess, setPermissionSuccess] = useState("");
  const [requestingPermission, setRequestingPermission] = useState(false);

  const handleRequestPermission = async (scope: PermissionScope) => {
    setPermissionError("");
    setPermissionSuccess("");
    setRequestingPermission(true);

    try {
      const result = await authorize(scope);
      if (result.successScope && result.successScope[scope]) {
        setPermissionSuccess(`${scope} permission granted successfully`);
      } else {
        setPermissionError(result.msg || `Permission denied for ${scope}`);
      }
    } catch (err) {
      setPermissionError(
        err instanceof Error
          ? err.message
          : `Failed to request ${scope} permission`
      );
    } finally {
      setRequestingPermission(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Back to home
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Multimedia</h1>
        <p className="text-gray-600">
          Image, video, audio, camera, and local storage operations
        </p>
      </div>

      {/* Request Permissions Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
          <FiLock className="mr-2 text-yellow-600" />
          Request Device Permissions
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Multimedia features require device permissions. Request them here
          before using the APIs below.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleRequestPermission("camera")}
            disabled={requestingPermission}
            className={`py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              requestingPermission
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            Camera
          </button>
          <button
            onClick={() => handleRequestPermission("album")}
            disabled={requestingPermission}
            className={`py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              requestingPermission
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            Album
          </button>
          <button
            onClick={() => handleRequestPermission("file")}
            disabled={requestingPermission}
            className={`py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              requestingPermission
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            File
          </button>
          <button
            onClick={() => handleRequestPermission("microphone")}
            disabled={requestingPermission}
            className={`py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              requestingPermission
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            Microphone
          </button>
        </div>

        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> Camera permission is needed for taking
            photos/videos. Album permission is needed for choosing photos/videos
            from gallery. File permission is needed for saving images/videos to
            device storage. Microphone permission may be needed for video
            recording with audio.
          </p>
        </div>

        {/* Permission Success/Error */}
        {permissionSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-green-800">{permissionSuccess}</p>
          </div>
        )}
        {permissionError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <FiAlertCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-800">{permissionError}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <ImageComponent />
        <VideoComponent />
        <AudioComponent />
        <CameraComponent />
        <StorageComponent />
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          About Multimedia APIs
        </h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVImage.saveImage
            </code>{" "}
            - Save images to device album (requires File permission)
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVVideo.chooseVideo
            </code>{" "}
            - Record or choose videos (requires Camera/Album permission)
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVVideo.saveVideoToPhotosAlbum
            </code>{" "}
            - Save videos to album (requires File permission)
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVAudio.playSystemSound
            </code>{" "}
            - Play system sounds (iOS only, no permission required)
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVCamera.takePhoto
            </code>{" "}
            - Take photos or choose from album (requires Camera/Album
            permission)
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVStorage.setItem/getItem/removeItem
            </code>{" "}
            - Local key-value storage (no permission required)
          </li>
        </ul>
      </div>
    </div>
  );
};
