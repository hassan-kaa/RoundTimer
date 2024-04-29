const CardStack = () => {
  return (
    <div className="relative font-semibold overflow-clip">
      <div className="rounded-t-[36px] p-4  h-1/3  bg-lime-200 text-black">
        <h1 className="text-sm">
          vice president
          <br />8 to 9
        </h1>
      </div>
      <div className="rounded-t-[36px] p-4 -translate-y-1/3 h-1/3  text-white bg-black">
        <h1 className="text-sm">
          vice president
          <br />8 to 9
        </h1>
      </div>
      <div className="rounded-t-[36px] p-4 -translate-y-2/3 h-1/3  bg-stone-400 text-black">
        <h1 className="text-sm">
          vice president
          <br />8 to 9
        </h1>
      </div>
      <div className="rounded-[36px] p-4 -translate-y-full h-1/3  bg-gray-300 text-black">
        <h1 className="text-sm">
          vice president
          <br />8 to 9
        </h1>
      </div>
    </div>
  );
};
export default CardStack;
