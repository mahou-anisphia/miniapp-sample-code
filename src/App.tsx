import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { SSOPage } from "./pages/authentication/Page";
import { DevicePermissionsPage } from "./pages/permissions/Page";
import { InteractionPage } from "./pages/interaction/Page";
import { BaseAPIsPage } from "./pages/base/Page";
import { MultimediaPage } from "./pages/multimedia/Page";
import { FilePage } from "./pages/file/Page";
import { CookiePage } from "./pages/cookie/Page";
import { DevicePage } from "./pages/device/Page";
import { LocationPage } from "./pages/location/Page";
import { MotionPage } from "./pages/motion/Page";
import { ScreenPage } from "./pages/screen/Page";
import { NetworkPage } from "./pages/network/Page";
import { CallPage } from "./pages/call/Page";
import { ContactsPage } from "./pages/contacts/Page";
import { AppInfoPage } from "./pages/app/Page";
import { SoundPage } from "./pages/sound/Page";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Authentication & Permissions */}
            <Route path="/authentication/sso" element={<SSOPage />} />
            <Route
              path="/permissions/device"
              element={<DevicePermissionsPage />}
            />

            {/* Interaction */}
            <Route path="/interaction/*" element={<InteractionPage />} />

            {/* Multimedia */}
            <Route path="/multimedia/*" element={<MultimediaPage />} />

            {/* Base API */}
            <Route path="/base/*" element={<BaseAPIsPage />} />

            {/* File API */}
            <Route path="/file/*" element={<FilePage />} />

            {/* Location API */}
            <Route path="/location/*" element={<LocationPage />} />

            {/* Cookie API */}
            <Route path="/cookie/*" element={<CookiePage />} />

            {/* Device API */}
            <Route path="/device/*" element={<DevicePage />} />

            {/* Network API */}
            <Route path="/network/*" element={<NetworkPage />} />

            {/* Screen API */}
            <Route path="/screen/*" element={<ScreenPage />} />

            {/* Motion API */}
            <Route path="/motion/*" element={<MotionPage />} />

            {/* Sound API */}
            <Route path="/sound/*" element={<SoundPage />} />

            {/* Call API */}
            <Route path="/call/*" element={<CallPage />} />

            {/* App Information API */}
            <Route path="/app/*" element={<AppInfoPage />} />

            {/* Contacts API */}
            <Route path="/contacts/*" element={<ContactsPage />} />

            {/* Placeholder routes for other categories */}

            <Route
              path="/navigation/*"
              element={<ComingSoonPage category="Navigation" />}
            />

            <Route
              path="/scan/*"
              element={<ComingSoonPage category="Scan" />}
            />
            <Route
              path="/battery/*"
              element={<ComingSoonPage category="Battery" />}
            />
            <Route
              path="/bluetooth/*"
              element={<ComingSoonPage category="Bluetooth" />}
            />
            <Route
              path="/events/*"
              element={<ComingSoonPage category="Events" />}
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// Placeholder component for coming soon pages
const ComingSoonPage: React.FC<{ category: string }> = ({ category }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{category}</h1>
      <p className="text-xl text-gray-600 mb-8">Demo coming soon...</p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        ← Back to Home
      </a>
    </div>
  );
};

export default App;
