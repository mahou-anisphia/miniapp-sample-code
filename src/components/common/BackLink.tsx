import React from "react";
import { Link } from "react-router-dom";

interface BackLinkProps {
  to?: string;
  label?: string;
  className?: string;
}

export const BackLink: React.FC<BackLinkProps> = ({
  to = "/",
  label = "← Back to home",
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <Link
        to={to}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        {label}
      </Link>
    </div>
  );
};

