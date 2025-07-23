import React from "react";

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-box border  border-base-content/5  bg-base-100 shadow-xl">
      <table className="table">{children}</table>
    </div>
  );
}
