import React, { useState } from 'react';
import { FiShield, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { authorize, PermissionScope } from './authorize';

const AVAILABLE_PERMISSIONS: { value: PermissionScope; label: string; description: string }[] = [
  { value: 'location', label: 'Location', description: 'Access geographic location' },
  { value: 'camera', label: 'Camera', description: 'Access device camera' },
  { value: 'bluetooth', label: 'Bluetooth', description: 'Access Bluetooth' },
  { value: 'album', label: 'Album', description: 'Access photo album' },
  { value: 'contacts', label: 'Contacts', description: 'Access contacts list' },
  { value: 'microphone', label: 'Microphone', description: 'Access microphone' },
  { value: 'file', label: 'File', description: 'Access file system' },
  { value: 'call', label: 'Phone Call', description: 'Make phone calls' },
  { value: 'vibrate', label: 'Vibration', description: 'Vibrate device' },
  { value: 'screen', label: 'Screenshot', description: 'Capture screenshots' }
];

export const AuthorizeComponent: React.FC = () => {
  const [selectedScope, setSelectedScope] = useState<PermissionScope>('location');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ scope: string; granted: boolean } | null>(null);

  const handleAuthorize = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const authResult = await authorize(selectedScope);
      const granted = authResult.successScope[selectedScope] === true;
      setResult({ scope: selectedScope, granted });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authorize');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FiShield className="inline mr-2" />
          Select Permission to Request
        </label>
        <select
          value={selectedScope}
          onChange={(e) => setSelectedScope(e.target.value as PermissionScope)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {AVAILABLE_PERMISSIONS.map(perm => (
            <option key={perm.value} value={perm.value}>
              {perm.label} - {perm.description}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAuthorize}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Requesting Permission...' : 'Request Permission'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <FiAlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">Error</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      {result && (
        <div className={`mt-4 p-4 ${result.granted ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg`}>
          <div className="flex items-start">
            {result.granted ? (
              <>
                <FiCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">Permission Granted</p>
                  <p className="text-xs text-green-600 mt-1">
                    User granted <strong>{result.scope}</strong> permission
                  </p>
                </div>
              </>
            ) : (
              <>
                <FiAlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">Permission Denied</p>
                  <p className="text-xs text-red-600 mt-1">
                    User denied <strong>{result.scope}</strong> permission
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">About wv.authorize</h3>
        <ul className="space-y-1 text-xs text-blue-800">
          <li>• Request device permissions from the user</li>
          <li>• Shows native permission dialog to the user</li>
          <li>• Check <code className="bg-blue-100 px-1 py-0.5 rounded">wv.getSetting</code> first to avoid redundant requests</li>
          <li>• Handle both granted and denied cases in your app</li>
        </ul>
      </div>
    </div>
  );
};
