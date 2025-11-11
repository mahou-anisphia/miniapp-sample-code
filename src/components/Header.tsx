import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { BiChip } from "react-icons/bi";

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const apiCategories = [
    { name: "Device Permissions", path: "/permissions/device" },
    { name: "SSO Authentication", path: "/authentication/sso" },
    { name: "Base APIs", path: "/base/clipboard" },
    { name: "Navigation", path: "/navigation/pop" },
    { name: "Interaction", path: "/interaction/loading" },
    { name: "Multimedia", path: "/multimedia/image" },
    { name: "File Operations", path: "/file/read-write" },
    { name: "Location", path: "/location/get" },
    { name: "Device Info", path: "/device/system-info" },
    { name: "Network", path: "/network/type" },
    { name: "Screen", path: "/screen/orientation" },
    { name: "Motion", path: "/motion/gestures" },
    { name: "Bluetooth", path: "/bluetooth/scan" },
    { name: "Scan QR/Barcode", path: "/scan/qr" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
              <BiChip className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">WindVane APIs</h1>
              <p className="text-xs text-blue-100">MiniApp Platform</p>
            </div>
          </Link>

          {/* Primary Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `hover:text-blue-100 transition-colors ${
                  isActive
                    ? "text-white underline decoration-white/60"
                    : "text-blue-100"
                }`
              }
            >
              Home
            </NavLink>

            {/* API Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 hover:text-blue-100 transition-colors text-blue-100"
              >
                API Demos
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />

                  {/* Menu */}
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-20 max-h-96 overflow-y-auto">
                    {apiCategories.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <nav className="space-y-2">
              <NavLink
                to="/"
                end
                onClick={onMenuToggle}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-blue-100 hover:bg-white/10"
                  }`
                }
              >
                Home
              </NavLink>

              <div className="px-4 py-2 text-xs font-semibold text-blue-200 uppercase">
                API Demos
              </div>

              {apiCategories.map((category) => (
                <NavLink
                  key={category.path}
                  to={category.path}
                  onClick={onMenuToggle}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-blue-100 hover:bg-white/10"
                    }`
                  }
                >
                  {category.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
