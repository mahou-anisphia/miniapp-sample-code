import React, { useState } from "react";
import {
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiLock,
} from "react-icons/fi";
import { chooseFiles, getDataByFilePath } from "./file/fileApi";
import { authorize } from "../permissions/device/authorize";

export const FileChooseComponent: React.FC = () => {
  const [chosenFiles, setChosenFiles] = useState<Array<{ path: string }>>([]);
  const [filePathForData, setFilePathForData] = useState("");
  const [base64Data, setBase64Data] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePermissionError = async () => {
    setError(
      "Permission denied. Please grant file permission in device settings."
    );
    try {
      await authorize("file");
    } catch (err) {
      // Permission request failed or denied
    }
  };

  const handleChooseFiles = async () => {
    setError("");
    setSuccess("");
    setChosenFiles([]);
    try {
      const result = await chooseFiles();
      setChosenFiles(result.files);
      setSuccess(`${result.files.length} file(s) selected`);
      // Auto-populate the first file path for getData
      if (result.files.length > 0) {
        setFilePathForData(result.files[0].path);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to choose files";
      if (
        errorMsg.includes("NO_PERMISSION") ||
        errorMsg.includes("permission")
      ) {
        await handlePermissionError();
      } else {
        setError(errorMsg);
      }
    }
  };

  const handleGetFileData = async () => {
    setError("");
    setSuccess("");
    setBase64Data("");
    if (!filePathForData.trim()) {
      setError("Please enter a file path");
      return;
    }
    try {
      const result = await getDataByFilePath({ path: filePathForData });
      setBase64Data(result.base64Data);
      setSuccess("File data retrieved successfully");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to get file data";
      if (
        errorMsg.includes("NO_PERMISSION") ||
        errorMsg.includes("permission")
      ) {
        await handlePermissionError();
      } else {
        setError(errorMsg);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
        <FiFileText className="mr-2 text-indigo-600" />
        Choose Files & Get Data
      </h2>

      {/* Permission Notice */}
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
        <FiLock className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-xs text-yellow-800">
          <strong>Required Permission:</strong> File access for choosing and
          reading local files.
        </p>
      </div>

      {/* Choose Files Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Choose Files</h3>
        <button
          onClick={handleChooseFiles}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          Choose Files from Device
        </button>
        {chosenFiles.length > 0 && (
          <div className="mt-3 p-3 bg-indigo-50 rounded-lg">
            <p className="text-xs font-medium text-indigo-900 mb-2">
              Selected Files:
            </p>
            <ul className="space-y-1">
              {chosenFiles.map((file, index) => (
                <li key={index} className="text-xs text-indigo-800 break-all">
                  {index + 1}. {file.path}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Get File Data Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Get File Data as Base64
        </h3>
        <input
          type="text"
          value={filePathForData}
          onChange={(e) => setFilePathForData(e.target.value)}
          placeholder="Local file path (e.g., /download/dingding/0/1.png)"
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
        <button
          onClick={handleGetFileData}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          Get File Data
        </button>
        {base64Data && (
          <div className="mt-3 p-3 bg-indigo-50 rounded-lg">
            <p className="text-xs font-medium text-indigo-900 mb-1">
              Base64 Data:
            </p>
            <code className="text-xs text-indigo-800 break-all block max-h-32 overflow-y-auto">
              {base64Data.substring(0, 200)}...
            </code>
            <p className="text-xs text-indigo-700 mt-2">
              Length: {base64Data.length} characters (showing first 200)
            </p>
          </div>
        )}
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
