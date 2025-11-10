import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiShield, FiCheckSquare } from 'react-icons/fi';
import { SSOComponent } from './sso/SSOComponent';
import { GetSettingComponent } from './getSetting/GetSettingComponent';
import { AuthorizeComponent } from './authorize/AuthorizeComponent';

type Tab = 'sso' | 'getSetting' | 'authorize';

export const AuthenticationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sso');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
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
          Authentication & Permissions
        </h1>
        <p className="text-gray-600">
          SSO authentication and device permission management
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('sso')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
              activeTab === 'sso'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FiLock className="mr-2" />
            SSO Authentication
          </button>
          <button
            onClick={() => setActiveTab('getSetting')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
              activeTab === 'getSetting'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FiCheckSquare className="mr-2" />
            Get Settings
          </button>
          <button
            onClick={() => setActiveTab('authorize')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
              activeTab === 'authorize'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FiShield className="mr-2" />
            Authorize
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'sso' && (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                SSO Authentication (wv.getAuthCode)
              </h2>
              <p className="text-sm text-gray-600">
                Get authentication code with customizable scopes for user data access
              </p>
            </div>
            <SSOComponent />
          </div>
        )}

        {activeTab === 'getSetting' && (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Get Permission Settings (wv.getSetting)
              </h2>
              <p className="text-sm text-gray-600">
                Check which device permissions have been granted to your MiniApp
              </p>
            </div>
            <GetSettingComponent />
          </div>
        )}

        {activeTab === 'authorize' && (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Request Permission (wv.authorize)
              </h2>
              <p className="text-sm text-gray-600">
                Request device permissions from the user with native dialogs
              </p>
            </div>
            <AuthorizeComponent />
          </div>
        )}
      </div>

      {/* General Info */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          About Authentication & Permissions
        </h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>SSO (wv.getAuthCode):</strong> Authenticates users and retrieves an auth code 
            that can be exchanged for user information on your backend.
          </p>
          <p>
            <strong>Get Settings (wv.getSetting):</strong> Checks the current permission status 
            to know which device features your app can access.
          </p>
          <p>
            <strong>Authorize (wv.authorize):</strong> Requests specific device permissions from 
            the user through native permission dialogs.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            💡 Best practice: Always check settings before requesting authorization to avoid 
            showing redundant permission prompts to users.
          </p>
        </div>
      </div>
    </div>
  );
};