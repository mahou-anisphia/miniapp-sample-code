import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { authorize, PermissionScope } from "../permissions/device/authorize";
import { FileReadWriteComponent } from "./FileReadWriteComponent";
import { FileInfoComponent } from "./FileInfoComponent";
import { FileTransferComponent } from "./FileTransferComponent";
import { FileChooseComponent } from "./FileChooseComponent";

export const FilePage: React.FC = () => {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          File Operations
        </h1>
        <p className="text-gray-600">
          Read, write, download, upload, and manage files on the device
        </p>
      </div>

      {/* Request Permissions Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
          <FiLock className="mr-2 text-yellow-600" />
          Request File Permission
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          File operations require device permissions. Request them here before
          using the APIs below.
        </p>

        <button
          onClick={() => handleRequestPermission("file")}
          disabled={requestingPermission}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
            requestingPermission
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-600 hover:bg-yellow-700"
          }`}
        >
          Request File Permission
        </button>

        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> File permission is needed for reading,
            writing, downloading, uploading, and accessing local files. Files
            are stored in WindVanecachedfiles/ directory.
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
        <FileReadWriteComponent />
        <FileInfoComponent />
        <FileTransferComponent />
        <FileChooseComponent />
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          About File APIs
        </h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVFile.write
            </code>{" "}
            - Write content to files (write/append/overwrite modes)
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">WVFile.read</code>{" "}
            - Read file content from device
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVFile.getFileInfo
            </code>{" "}
            - Get file size and information (WindVane Android 1.0.X.X or iOS
            2.1.4+)
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVFile.downloadFile
            </code>{" "}
            - Download files from URLs to device storage
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVFile.uploadFile
            </code>{" "}
            - Upload local files to remote servers
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVFile.chooseFiles
            </code>{" "}
            - Choose files from device storage
          </li>
          <li>
            •{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              WVFile.getDataByFilePath
            </code>{" "}
            - Get file data as Base64 string
          </li>
        </ul>
      </div>
    </div>
  );
};
