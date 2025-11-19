import React from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

type StatusType = "success" | "error" | "info";

interface StatusMessageProps {
  type: StatusType;
  message: string;
  className?: string;
}

const iconMap: Record<StatusType, React.ReactNode> = {
  success: <FiCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />,
  error: <FiXCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />,
  info: <FiInfo className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />,
};

const containerMap: Record<StatusType, string> = {
  success: "bg-green-50 border border-green-200",
  error: "bg-red-50 border border-red-200",
  info: "bg-blue-50 border border-blue-200",
};

const textColorMap: Record<StatusType, string> = {
  success: "text-green-800",
  error: "text-red-800",
  info: "text-blue-800",
};

export const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
  className = "",
}) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`p-4 rounded-lg flex items-start ${containerMap[type]} ${className}`}
    >
      {iconMap[type]}
      <p className={`text-sm ${textColorMap[type]}`}>{message}</p>
      {type === "error" && (
        <FiAlertCircle className="ml-auto text-red-400" aria-hidden />
      )}
    </div>
  );
};

