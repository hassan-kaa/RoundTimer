const RestCard = ({ time }: { time: string }) => {
  return (
    <div
      className={`w-3/4 flex flex-col items-center justify-center rounded-lg p-8  bg-red-500 `}
    >
      <h1 className="text-lg">Rest</h1>
      <h1 className="text-xl font-bold">{time}</h1>
    </div>
  );
};
export default RestCard;
