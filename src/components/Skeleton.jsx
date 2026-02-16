const Skeleton = ({ width = "100%", height = "20px", className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
