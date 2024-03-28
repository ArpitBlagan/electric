import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { context } from "../Contexxt";
const Vechile = () => {
  const [data, setD] = useState<any[] | null>(null);
  const [change, setC] = useState(true);
  const [loading, setL] = useState(false);
  const value = useContext(context);
  useEffect(() => {
    const getData = async () => {
      setL(true);
      try {
        const res = await axios.get(
          "https://electric-tay5.onrender.com/api/ele/vechileall",
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        setD(res.data);
        setL(false);
      } catch (err) {
        toast.error("Enable to fetch vechiles something went wrong!");
        setL(false);
      }
    };
    getData();
  }, [change]);
  return (
    <div className="grid  gap-3  mt-2 ">
      {loading && <h1 className="text-center">Fetching data wait!</h1>}
      {data &&
        data.map((ele, index) => {
          return (
            <div
              className="p-3 w-full flex flex-row gap-3 items-center border border-gray-300 rounded-xl"
              key={index}
            >
              <div>
                <img
                  src={ele.image}
                  alt="vechile"
                  width={200}
                  height={100}
                  className="object-fit"
                />
              </div>
              <div className="flex flex-col items-center flex-1 border border-gray-300 py-2 rounded-lg">
                <h1 className="text-xl">Model: {ele.model}</h1>
                <ul className="flex flex-col">
                  <li>cost :{ele.cost} </li>
                  <li>
                    energy_consumption_per_hour :
                    {ele.energy_consumption_per_hour}{" "}
                  </li>
                  <li>license_plate {ele.license_plate}</li>
                  <li>model : {ele.model}</li>
                  <li>type : {ele.type}</li>
                </ul>
              </div>
              {value && (
                <div
                  className="cursor-pointer"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (value && value.data.email == ele.user.email) {
                      toast(`trying to delete the vechile ${ele.model}`);
                      try {
                        const res = await axios.delete(
                          `https://electric-tay5.onrender.com/api/ele/vechile${ele.id}`,
                          { withCredentials: true }
                        );
                        console.log(res.data);
                        toast("deleted successfully!");
                        setC(!change);
                      } catch (err) {
                        console.log(err);
                        toast.error("Not able to delete entry!");
                      }
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      <h1 className="text-center">That's It No Record</h1>
    </div>
  );
};

export default Vechile;
