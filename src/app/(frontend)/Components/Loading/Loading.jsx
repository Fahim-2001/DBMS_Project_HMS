import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <span className="fixed left-[50%] top-[35%] loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;
