const ComponentSoal = ({ input }) => {
  const Data = input;

  return (
    <div>
      <div
        className={`p-1 mb-1 hover:scale-105 text-center hover:drop-shadow-xl font-semibold rounded-lg hover:bg-yellow-600 cursor-pointer ${
          Data.select ? "bg-red-600 text-white" : ""
        }`}
      >
        {Data.select ? Data.select : Data.no_soal}
      </div>
    </div>
  );
};
export default ComponentSoal;
