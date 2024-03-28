import { Coruseel } from "@/components/Coruseel";
const Land = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="p-3 border border-gray-300 rounded-xl">
        <div className="flex flex-col justify-center items-center mt-3">
          <span className="text-[40px] font-semibold">
            Welcome to the{" "}
            <span className="text-red-400 underline">ElectrifyIt</span> Reports
            Dashboard.
          </span>
          <br />
          <span className="text-center text-xl">
            Your central hub for monitoring electric vehicle (EV) data. As the
            world transitions towards sustainable transportation solutions,
            understanding and analyzing EV-related information becomes
            increasingly vital.
          </span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Coruseel />
        </div>
      </div>
    </div>
  );
};

export default Land;
