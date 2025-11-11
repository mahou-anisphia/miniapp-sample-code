import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { SSOPage } from "./pages/authentication/Page";
import { DevicePermissionsPage } from "./pages/permissions/Page";

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
            <Route path="/permissions/device" element={<DevicePermissionsPage />} />
            
            {/* Placeholder routes for other categories */}
            <Route path="/base/*" element={<ComingSoonPage category="Base APIs" />} />
            <Route path="/navigation/*" element={<ComingSoonPage category="Navigation" />} />
            <Route path="/interaction/*" element={<ComingSoonPage category="Interaction" />} />
            <Route path="/multimedia/*" element={<ComingSoonPage category="Multimedia" />} />
            <Route path="/file/*" element={<ComingSoonPage category="File Operations" />} />
            <Route path="/location/*" element={<ComingSoonPage category="Location" />} />
            <Route path="/cookie/*" element={<ComingSoonPage category="Cookie" />} />
            <Route path="/device/*" element={<ComingSoonPage category="Device Info" />} />
            <Route path="/network/*" element={<ComingSoonPage category="Network" />} />
            <Route path="/screen/*" element={<ComingSoonPage category="Screen" />} />
            <Route path="/motion/*" element={<ComingSoonPage category="Motion Detection" />} />
            <Route path="/sound/*" element={<ComingSoonPage category="Sound" />} />
            <Route path="/call/*" element={<ComingSoonPage category="Call" />} />
            <Route path="/app/*" element={<ComingSoonPage category="App Information" />} />
            <Route path="/contacts/*" element={<ComingSoonPage category="Contacts" />} />
            <Route path="/scan/*" element={<ComingSoonPage category="Scan" />} />
            <Route path="/battery/*" element={<ComingSoonPage category="Battery" />} />
            <Route path="/bluetooth/*" element={<ComingSoonPage category="Bluetooth" />} />
            <Route path="/events/*" element={<ComingSoonPage category="Events" />} />
            
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