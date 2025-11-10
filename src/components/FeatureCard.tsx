import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import { FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  features: string[];
  demoPath?: string;
  color?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  demoPath,
  color = "blue",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    green:
      "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    purple:
      "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
    orange:
      "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
    pink: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
    indigo:
      "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${
          colorClasses[color as keyof typeof colorClasses] || colorClasses.blue
        } text-white p-6`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm text-white/90 mt-1">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Feature count badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {features.length} feature{features.length !== 1 ? "s" : ""}{" "}
            available
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            {isExpanded ? (
              <>
                Hide <FiChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show Details <FiChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Expandable features list */}
        {isExpanded && (
          <div className="mb-4 animate-fadeIn">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action button */}
        {demoPath && (
          <Link
            to={demoPath}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-all group"
          >
            View Demo
            <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};
