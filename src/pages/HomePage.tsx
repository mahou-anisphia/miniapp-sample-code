import React, { useState } from "react";
import { FeatureCard } from "../components/FeatureCard";
import {
  FiLock,
  FiSmartphone,
  FiNavigation,
  FiImage,
  FiDatabase,
  FiMapPin,
  FiWifi,
  FiCpu,
  FiLayout,
  FiGitBranch,
} from "react-icons/fi";

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featureCategories = [
    {
      icon: FiLock,
      title: "Authentication & Permissions",
      description: "SSO, OAuth, and device permissions",
      color: "blue",
      features: [
        "SSO with wv.getAuthCode",
        "Device permission handling",
        "Authorization flows",
        "User data access",
        "Token management",
      ],
      demoPath: "/authentication",
    },
    {
      icon: FiSmartphone,
      title: "Device & System",
      description: "Access device features and system info",
      color: "green",
      features: [
        "Device information",
        "Clipboard operations",
        "App install checks",
        "Lifecycle events (background/active)",
        "System notifications",
      ],
      demoPath: "/features/device",
    },
    {
      icon: FiNavigation,
      title: "Navigation & Routing",
      description: "Page navigation and deep linking",
      color: "purple",
      features: [
        "Stack navigation",
        "Tab navigation",
        "Deep linking",
        "Route parameters",
        "Navigation guards",
      ],
      demoPath: "/features/navigation",
    },
    {
      icon: FiImage,
      title: "Media & Files",
      description: "Camera, images, and file handling",
      color: "orange",
      features: [
        "Image picker",
        "Camera access",
        "File upload/download",
        "Image manipulation",
        "Video player integration",
      ],
      demoPath: "/features/media",
    },
    {
      icon: FiDatabase,
      title: "Storage & Cache",
      description: "Local and secure storage solutions",
      color: "pink",
      features: [
        "LocalStorage wrapper",
        "Secure storage",
        "Cache management",
        "Offline data sync",
        "Storage quota handling",
      ],
      demoPath: "/features/storage",
    },
    {
      icon: FiMapPin,
      title: "Location Services",
      description: "GPS and location-based features",
      color: "indigo",
      features: [
        "Get current location",
        "Map integration",
        "Geofencing",
        "Location tracking",
        "Distance calculations",
      ],
      demoPath: "/features/location",
    },
    {
      icon: FiWifi,
      title: "Network & API",
      description: "HTTP requests and real-time communication",
      color: "blue",
      features: [
        "Axios configuration",
        "Interceptors setup",
        "WebSocket demos",
        "Error handling",
        "Retry logic",
      ],
      demoPath: "/features/network",
    },
    {
      icon: FiCpu,
      title: "Native Features",
      description: "Platform-specific integrations",
      color: "green",
      features: [
        "QR/Barcode scanner",
        "Payment integration",
        "Push notifications",
        "Bluetooth (BLE)",
        "Share functionality",
      ],
      demoPath: "/features/native",
    },
    {
      icon: FiLayout,
      title: "UI Components",
      description: "Reusable UI elements and patterns",
      color: "purple",
      features: [
        "Button variants",
        "Form elements",
        "Modals & dialogs",
        "Toast notifications",
        "Loading states",
      ],
      demoPath: "/features/ui",
    },
    {
      icon: FiGitBranch,
      title: "State Management",
      description: "Global state and data flow",
      color: "orange",
      features: [
        "Zustand store examples",
        "Context API patterns",
        "Persist middleware",
        "Async state handling",
        "Devtools integration",
      ],
      demoPath: "/features/state",
    },
  ];

  const filteredFeatures = featureCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.features.some((feature) =>
        feature.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              MiniApp Essentials Pack
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore comprehensive demos of WindVane APIs, common libraries,
              and best practices for MiniApp development
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search features... (e.g., 'camera', 'storage', 'auth')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-sm text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Feature Categories
          </h2>
          <p className="text-gray-600">
            {filteredFeatures.length} categor
            {filteredFeatures.length !== 1 ? "ies" : "y"} available
          </p>
        </div>

        {filteredFeatures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((category, index) => (
              <FeatureCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                features={category.features}
                demoPath={category.demoPath}
                color={category.color}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No features found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Feature Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Code Examples</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-gray-600">TypeScript</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                Modern
              </div>
              <div className="text-gray-600">Best Practices</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
