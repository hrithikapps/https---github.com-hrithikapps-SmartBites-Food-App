export const Shimmer = () => {
  return (
    <>
      <div className="flex flex-wrap justify-evenly gap-7  align-middle m-8 p-4 ">
        {Array(16)
          .fill("")
          .map((e, index) => (
            <div
              key={index}
              className="h-40 w-52 bg-slate-200 rounded-md mt-3"
            ></div>
          ))}
      </div>
    </>
  );
};
