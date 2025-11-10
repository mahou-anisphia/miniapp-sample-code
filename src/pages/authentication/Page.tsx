import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuthCode } from "./sso/getAuthCode";
import { FiUser, FiKey, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export const SSOPage: React.FC = () => {
  const [appId, setAppId] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetAuthCode = async () => {
    if (!appId.trim()) {
      setError("Please enter App ID");
      return;
    }

    setLoading(true);
    setError("");
    setAuthCode("");

    try {
      const code = await getAuthCode(appId);
      setAuthCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get auth code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Back to home
        </Link>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          SSO Authentication
        </h1>
        <p className="text-gray-600">
          Get auth code using WindVane GetAuthCode API
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* App ID Input */}
        <div className="mb-6">
          <label
            htmlFor="appId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <FiUser className="inline mr-2" />
            App ID
          </label>
          <input
            id="appId"
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="Enter your App ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Get Auth Code Button */}
        <button
          onClick={handleGetAuthCode}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Getting Auth Code...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <FiKey className="mr-2" />
              Get Auth Code
            </span>
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <FiAlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message with Auth Code */}
        {authCode && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start mb-2">
              <FiCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">Success</p>
                <p className="text-sm text-green-600 mt-1">
                  Auth code retrieved successfully
                </p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white rounded border border-green-200">
              <p className="text-xs text-gray-500 mb-1">Auth Code:</p>
              <code className="text-sm font-mono text-gray-800 break-all">
                {authCode}
              </code>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          About SSO Authentication
        </h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            • This demo uses{" "}
            <code className="bg-blue-100 px-2 py-0.5 rounded">
              wv.getAuthCode
            </code>{" "}
            API
          </li>
          <li>
            • The App ID identifies your Mini App in the Viettel ecosystem
          </li>
          <li>• Auth code can be exchanged for user tokens on your backend</li>
          <li>• Auth codes are short-lived and should be used immediately</li>
        </ul>
      </div>
    </div>
  );
};
