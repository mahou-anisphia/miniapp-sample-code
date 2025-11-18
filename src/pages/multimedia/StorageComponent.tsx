import React, { useState } from "react";
import {
  FiDatabase,
  FiCheckCircle,
  FiAlertCircle,
  FiSave,
  FiTrash2,
} from "react-icons/fi";
import {
  setItem,
  getItem,
  removeItem,
  clearStorage,
} from "./storage/storageApi";

export const StorageComponent: React.FC = () => {
  const [storageKey, setStorageKey] = useState("test_key");
  const [storageValue, setStorageValue] = useState("test_value");
  const [retrievedValue, setRetrievedValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSetStorage = async () => {
    setError("");
    setSuccess("");
    try {
      await setItem(storageKey, storageValue);
      setSuccess(`Stored: ${storageKey} = ${storageValue}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set storage");
    }
  };

  const handleGetStorage = async () => {
    setError("");
    setSuccess("");
    setRetrievedValue("");
    try {
      const value = await getItem(storageKey);
      setRetrievedValue(value);
      setSuccess("Value retrieved successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get storage");
    }
  };

  const handleRemoveStorage = async () => {
    setError("");
    setSuccess("");
    try {
      await removeItem(storageKey);
      setSuccess(`Removed key: ${storageKey}`);
      setRetrievedValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item");
    }
  };

  const handleClearStorage = async () => {
    setError("");
    setSuccess("");
    try {
      await clearStorage();
      setSuccess("Storage cleared successfully");
      setRetrievedValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear storage");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
        <FiDatabase className="mr-2 text-indigo-600" />
        Local Storage
      </h2>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          No permissions required. Data is stored locally in the app cache.
        </p>
      </div>

      <input
        type="text"
        value={storageKey}
        onChange={(e) => setStorageKey(e.target.value)}
        placeholder="Storage key"
        className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
      <input
        type="text"
        value={storageValue}
        onChange={(e) => setStorageValue(e.target.value)}
        placeholder="Storage value"
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={handleSetStorage}
          className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          <FiSave className="mr-2" />
          Set Item
        </button>
        <button
          onClick={handleGetStorage}
          className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          Get Item
        </button>
        <button
          onClick={handleRemoveStorage}
          className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          <FiTrash2 className="mr-2" />
          Remove
        </button>
        <button
          onClick={handleClearStorage}
          className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          Clear All
        </button>
      </div>

      {retrievedValue && (
        <div className="p-3 bg-indigo-50 rounded-lg mb-4">
          <p className="text-sm font-medium text-indigo-900 mb-1">
            Retrieved Value:
          </p>
          <code className="text-sm text-indigo-800 break-all">
            {retrievedValue}
          </code>
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
