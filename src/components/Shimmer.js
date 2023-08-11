export const Shimmer = () => {
  return (
    <>
      <div className="RestaurantCards">
        {Array(16)
          .fill("")
          .map((e, index) => (
            <div key={index} className="shimmerCard"></div>
          ))}
      </div>
    </>
  );
};
