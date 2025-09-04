import React from "react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <span className="loading loading-infinity loading-lg text-primary"></span>
        <p className="text-lg font-medium text-base-content/70 ">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
