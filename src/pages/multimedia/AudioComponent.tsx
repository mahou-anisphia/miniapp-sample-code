import React, { useState } from "react";
import { FiVolume2, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { playSystemSound } from "./audio/audioApi";

export const AudioComponent: React.FC = () => {
  const [soundId, setSoundId] = useState(1000);
  const [soundCount, setSoundCount] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePlaySound = async () => {
    setError("");
    setSuccess("");
    try {
      await playSystemSound({ sound: soundId, count: soundCount });
      setSuccess(`Playing system sound ${soundId} ${soundCount} time(s)`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to play sound");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
        <FiVolume2 className="mr-2 text-green-600" />
        System Sound (iOS only)
      </h2>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          This API only works on iOS devices. No permissions required.
        </p>
      </div>

      <input
        type="number"
        value={soundId}
        onChange={(e) => setSoundId(Number(e.target.value))}
        placeholder="Sound ID (e.g., 1000)"
        className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
      />
      <input
        type="number"
        value={soundCount}
        onChange={(e) => setSoundCount(Number(e.target.value))}
        placeholder="Play count"
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
      />
      <button
        onClick={handlePlaySound}
        className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
      >
        Play System Sound
      </button>

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
