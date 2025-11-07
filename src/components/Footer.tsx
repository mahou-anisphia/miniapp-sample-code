import React from 'react';
import { FiGithub, FiBook, FiMail } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold mb-3">MiniApp Essentials</h3>
            <p className="text-sm text-gray-400">
              A comprehensive showcase of MiniApp features, APIs, and best practices for developers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FiBook className="w-4 h-4" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FiGithub className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FiMail className="w-4 h-4" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>WindVane APIs</li>
              <li>React + TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Modern Best Practices</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} MiniApp Essentials. Built for Viettel MiniApp Platform.</p>
        </div>
      </div>
    </footer>
  );
};