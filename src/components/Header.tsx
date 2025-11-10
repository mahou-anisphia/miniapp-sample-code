import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { BiChip } from "react-icons/bi";

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
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
              <h1 className="text-xl font-bold">MiniApp Essentials</h1>
              <p className="text-xs text-blue-100">Feature Showcase</p>
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
            <NavLink
              to="/authentication/sso"
              className={({ isActive }) =>
                `hover:text-blue-100 transition-colors ${
                  isActive
                    ? "text-white underline decoration-white/60"
                    : "text-blue-100"
                }`
              }
            >
              SSO Demo
            </NavLink>
          </nav>

          {/* Menu Toggle Button */}
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
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
      </div>
    </header>
  );
};
