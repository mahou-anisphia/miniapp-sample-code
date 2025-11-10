import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { getSetting, AuthSetting } from './getSetting';

const PERMISSION_LABELS: Record<keyof AuthSetting, string> = {
  location: 'Location',
  camera: 'Camera',
  bluetooth: 'Bluetooth',
  album: 'Album',
  contacts: 'Contacts',
  microphone: 'Microphone',
  file: 'File',
  call: 'Phone Call',
  vibrate: 'Vibration',
  screen: 'Screenshot'
};

export const GetSettingComponent: React.FC = () => {
  const [authSetting, setAuthSetting] = useState<AuthSetting | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetSetting = async () => {
    setLoading(true);
    setError('');
    setAuthSetting(null);

    try {
      const result = await getSetting();
      setAuthSetting(result.authSetting);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <button
        onClick={handleGetSetting}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors flex items-center justify-center ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Checking Permissions...' : 'Check Permission Settings'}
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

      {authSetting && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Permission Status</h3>
          <div className="space-y-2">
            {Object.entries(PERMISSION_LABELS).map(([key, label]) => {
              const granted = authSetting[key as keyof AuthSetting] === true;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <div className="flex items-center">
                    {granted ? (
                      <>
                        <FiCheckCircle className="text-green-500 mr-2" />
                        <span className="text-xs font-medium text-green-700">Granted</span>
                      </>
                    ) : (
                      <>
                        <FiXCircle className="text-red-500 mr-2" />
                        <span className="text-xs font-medium text-red-700">Not Granted</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">About wv.getSetting</h3>
        <ul className="space-y-1 text-xs text-blue-800">
          <li>• Retrieves current permission status for the MiniApp</li>
          <li>• Shows which permissions have been granted or denied</li>
          <li>• Use this before requesting permissions to avoid redundant prompts</li>
        </ul>
      </div>
    </div>
  );
};