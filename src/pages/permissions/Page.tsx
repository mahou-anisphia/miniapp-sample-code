import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getSetting, AuthSetting } from "./device/getSetting";
import { authorize, PermissionScope } from "./device/authorize";
import { 
  FiLock, 
  FiCamera, 
  FiMapPin, 
  FiMic, 
  FiAlertCircle, 
  FiShield,
  FiBluetooth,
  FiImage,
  FiUsers,
  FiFile,
  FiPhone,
  FiActivity,
  FiMonitor
} from "react-icons/fi";

export const DevicePermissionsPage: React.FC = () => {
  const [permissionStatus, setPermissionStatus] = useState<AuthSetting>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedPermission, setSelectedPermission] = useState<PermissionScope>("camera");

  const handleGetSetting = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await getSetting();
      setPermissionStatus(result.authSetting || {});
      setSuccess("Permission status retrieved successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get settings");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = async (scope: PermissionScope) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await authorize(scope);
      
      // Check if authorization was successful
      if (result.successScope && result.successScope[scope]) {
        setPermissionStatus(prev => ({ ...prev, [scope]: true }));
        setSuccess(`${scope} permission granted successfully`);
      } else {
        setError(result.msg || `Permission denied for ${scope}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to authorize ${scope}`);
    } finally {
      setLoading(false);
    }
  };

  const permissions = [
    { id: "camera" as PermissionScope, label: "Camera", icon: FiCamera, color: "blue" },
    { id: "location" as PermissionScope, label: "Location", icon: FiMapPin, color: "green" },
    { id: "microphone" as PermissionScope, label: "Microphone", icon: FiMic, color: "purple" },
    { id: "bluetooth" as PermissionScope, label: "Bluetooth", icon: FiBluetooth, color: "indigo" },
    { id: "album" as PermissionScope, label: "Album", icon: FiImage, color: "pink" },
    { id: "contacts" as PermissionScope, label: "Contacts", icon: FiUsers, color: "teal" },
    { id: "file" as PermissionScope, label: "File", icon: FiFile, color: "yellow" },
    { id: "call" as PermissionScope, label: "Call", icon: FiPhone, color: "red" },
    { id: "vibrate" as PermissionScope, label: "Vibrate", icon: FiActivity, color: "orange" },
    { id: "screen" as PermissionScope, label: "Screen", icon: FiMonitor, color: "cyan" },
  ];

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

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Device Permissions
        </h1>
        <p className="text-gray-600">
          Get and request device permissions using wv.getSetting and wv.authorize
        </p>
      </div>

      {/* Get Settings Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FiShield className="mr-2 text-blue-600" />
          Check Permission Status
        </h2>
        
        <button
          onClick={handleGetSetting}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Checking..." : "Get All Permissions Status"}
        </button>

        {/* Permission Status Display */}
        {Object.keys(permissionStatus).length > 0 && (
          <div className="mt-4 space-y-2">
            {Object.entries(permissionStatus).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700 capitalize">{key}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  value === true
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {value === true ? "Authorized" : "Denied"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Permission Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FiLock className="mr-2 text-purple-600" />
          Request Permission
        </h2>

        {/* Permission Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          {permissions.map((perm) => (
            <button
              key={perm.id}
              onClick={() => setSelectedPermission(perm.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedPermission === perm.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <perm.icon className={`w-5 h-5 mx-auto mb-1 ${
                selectedPermission === perm.id ? "text-blue-600" : "text-gray-600"
              }`} />
              <p className="text-xs font-medium text-gray-700">{perm.label}</p>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleAuthorize(selectedPermission)}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Requesting..." : `Request ${permissions.find(p => p.id === selectedPermission)?.label} Permission`}
        </button>

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <FiShield className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Success</p>
              <p className="text-sm text-green-600 mt-1">{success}</p>
            </div>
          </div>
        )}

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
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          About Device Permissions
        </h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            • <code className="bg-blue-100 px-2 py-0.5 rounded">wv.getSetting</code> - Returns boolean values for each permission scope
          </li>
          <li>
            • <code className="bg-blue-100 px-2 py-0.5 rounded">wv.authorize</code> - Request specific device permissions
          </li>
          <li>
            • <strong>10 available scopes:</strong> location, camera, bluetooth, album, contacts, microphone, file, call, vibrate, screen
          </li>
          <li>
            • Users can grant or deny permissions through native dialogs
          </li>
          <li>
            • Permission states: <code>true</code> (granted), <code>false</code> (denied/not determined)
          </li>
        </ul>
      </div>
    </div>
  );
};