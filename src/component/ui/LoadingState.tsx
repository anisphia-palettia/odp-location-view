import React from "react";

export default function LoadingState({
  message = "Memuat data...",
  variant = "spinner",
  size = "lg",
}: {
  message?: string;
  variant?: "spinner" | "dots" | "ring" | "bars" | "infinity";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <span
        className={`loading loading-${variant} loading-${size} text-primary`}
      ></span>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
