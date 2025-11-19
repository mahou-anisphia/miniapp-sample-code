import React, { useState, useEffect } from "react";
import {
  FiDownload,
  FiUpload,
  FiCheckCircle,
  FiAlertCircle,
  FiLock,
} from "react-icons/fi";
import { downloadFile, uploadFile } from "./file/fileApi";
import { authorize } from "../permissions/device/authorize";

export const FileTransferComponent: React.FC = () => {
  const [downloadUrl, setDownloadUrl] = useState(
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  );
  const [downloadName, setDownloadName] = useState("test.pdf");
  const [downloadedPath, setDownloadedPath] = useState("");

  const [uploadUrl, setUploadUrl] = useState("http://your-server.com/upload");
  const [uploadFilePath, setUploadFilePath] = useState("");
  const [uploadTimeout, setUploadTimeout] = useState(8000);
  const [uploadResult, setUploadResult] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Listen for download events
    const handleDownloadSuccess = (e: any) => {
      if (e.param) {
        setDownloadedPath(e.param.filePath);
        setSuccess("Download completed successfully");
      }
    };

    const handleDownloadFailed = (e: any) => {
      setError(`Download failed: ${e.param?.msg || "Unknown error"}`);
    };

    // Listen for upload events
    const handleUploadSuccess = (e: any) => {
      if (e.param) {
        setUploadResult(`Upload completed: ${JSON.stringify(e.param)}`);
        setSuccess("Upload completed successfully");
      }
    };

    const handleUploadFailed = (e: any) => {
      setError(`Upload failed: ${e.param?.msg || "Unknown error"}`);
    };

    document.addEventListener(
      "WVFile.Event.downloadFileSuccess",
      handleDownloadSuccess
    );
    document.addEventListener(
      "WVFile.Event.downloadFileFailed",
      handleDownloadFailed
    );
    document.addEventListener(
      "WVFile.Event.uploadFileSuccess",
      handleUploadSuccess
    );
    document.addEventListener(
      "WVFile.Event.uploadFileFailed",
      handleUploadFailed
    );

    return () => {
      document.removeEventListener(
        "WVFile.Event.downloadFileSuccess",
        handleDownloadSuccess
      );
      document.removeEventListener(
        "WVFile.Event.downloadFileFailed",
        handleDownloadFailed
      );
      document.removeEventListener(
        "WVFile.Event.uploadFileSuccess",
        handleUploadSuccess
      );
      document.removeEventListener(
        "WVFile.Event.uploadFileFailed",
        handleUploadFailed
      );
    };
  }, []);

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

  const handleDownload = async () => {
    setError("");
    setSuccess("");
    setDownloadedPath("");
    try {
      const result = await downloadFile({
        url: downloadUrl,
        name: downloadName,
      });
      setDownloadedPath(result.filePath);
      setSuccess("Download initiated successfully");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to download file";
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

  const handleUpload = async () => {
    setError("");
    setSuccess("");
    setUploadResult("");
    if (!uploadFilePath.trim()) {
      setError("Please enter a file path");
      return;
    }
    try {
      const result = await uploadFile({
        url: uploadUrl,
        filePath: uploadFilePath,
        timeout: uploadTimeout,
        headers: { "Content-Type": "application/octet-stream" },
      });
      setUploadResult(JSON.stringify(result));
      setSuccess("Upload initiated successfully");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to upload file";
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
        <FiDownload className="mr-2 text-green-600" />
        Download / Upload Files
      </h2>

      {/* Permission Notice */}
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
        <FiLock className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-xs text-yellow-800">
          <strong>Required Permission:</strong> File access for downloading and
          uploading files.
        </p>
      </div>

      {/* Download Section */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
          <FiDownload className="mr-2" />
          Download File
        </h3>
        <input
          type="text"
          value={downloadUrl}
          onChange={(e) => setDownloadUrl(e.target.value)}
          placeholder="Download URL"
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
        />
        <input
          type="text"
          value={downloadName}
          onChange={(e) => setDownloadName(e.target.value)}
          placeholder="File name (optional)"
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
        />
        <button
          onClick={handleDownload}
          className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          Download File
        </button>
        {downloadedPath && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg">
            <p className="text-xs font-medium text-green-900 mb-1">
              Downloaded to:
            </p>
            <code className="text-xs text-green-800 break-all">
              {downloadedPath}
            </code>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
          <FiUpload className="mr-2" />
          Upload File
        </h3>
        <input
          type="text"
          value={uploadUrl}
          onChange={(e) => setUploadUrl(e.target.value)}
          placeholder="Upload URL"
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <input
          type="text"
          value={uploadFilePath}
          onChange={(e) => setUploadFilePath(e.target.value)}
          placeholder="Local file path (e.g., /storage/test.txt)"
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <input
          type="number"
          value={uploadTimeout}
          onChange={(e) => setUploadTimeout(Number(e.target.value))}
          placeholder="Timeout (ms)"
          className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          onClick={handleUpload}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Upload File
        </button>
        {uploadResult && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-medium text-blue-900 mb-1">
              Upload Result:
            </p>
            <pre className="text-xs text-blue-800 whitespace-pre-wrap">
              {uploadResult}
            </pre>
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
