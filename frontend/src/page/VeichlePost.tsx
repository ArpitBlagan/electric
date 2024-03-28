import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import welcome from "@/welcome.png";
import { vechileSchema, Vechile } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
const imageMimeType = /image\/(png|jpg|jpeg)/i;
const types = ["Car", "Bike", "Truck"];
const VeichlePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vechile>({
    resolver: zodResolver(vechileSchema),
  });
  const navigate = useNavigate();
  const [type, setT] = useState("");
  const [loading, setL] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState<string | null>(null);
  useEffect(() => {
    let fileReader: FileReader | undefined;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader;
        if (result && !isCancel) {
          setFileDataURL(result as string); // Assuming setFileDataURL is a function that sets state
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === FileReader.LOADING) {
        fileReader.abort();
      }
    };
  }, [file]);
  const changeHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  const submit: SubmitHandler<Vechile> = async (data) => {
    console.log(data);
    toast("adding vechile wait a sec!");
    setL(true);
    if (!file || !type) {
      toast.error("please fill all the field");
      setL(false);
      return;
    }
    try {
      // const body = {
      //   model: data.model,
      //   total_miles_driven: data.total_miles_driven,
      //   date_of_purchase: data.date_of_purchase,
      //   type: type,
      //   license_plate: data.license_plate,
      //   cost: data.cost,
      //   energy_consumption_per_hour: data.energy_consumption_per_hour,
      //   file,
      // };
      const formdata = new FormData();
      formdata.append("model", data.model);
      formdata.append("file", file);
      formdata.append("cost", data.cost);
      formdata.append("type", type);
      formdata.append("date", data.date_of_purchase);
      formdata.append("license_plate", data.license_plate);
      formdata.append("energy_consumptions", data.energy_consumption_per_hour);
      formdata.append("total_miles_driven", data.total_miles_driven);
      const res = await axios.post(
        "https://electric-tay5.onrender.com/api/ele/vechile/add",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success("added successfully navigating to vechile page!");
      setL(false);
      navigate("/");
    } catch (err: any) {
      console.log(err);
      if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("something went wrong!");
      }
      setL(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  mx-4">
      <div className="flex flex-col w-full  justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-2 w-full border border-gray-300 px-2 py-4 rounded-xl">
          <img src={welcome} width={300} height={300} />
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-xl underline">
              <Link to="/">Home</Link>
            </h1>
            <h1>Add Vechile</h1>
          </div>
          <form
            className="w-3/5 md:w-1/2 flex flex-col gap-3"
            onSubmit={handleSubmit(submit)}
          >
            <div>
              <Label>Model Name</Label>
              <Input
                placeholder="Tesla z99"
                type="text"
                {...register("model")}
              />
              <p className="text-red-500">{errors.model?.message}</p>
            </div>
            <div>
              <Label>License Plate</Label>
              <Input
                type=""
                placeholder="HP48-1449"
                {...register("license_plate")}
              />
              <p className="text-red-500">{errors.license_plate?.message}</p>
            </div>
            <div>
              <Label>Cost per/hour</Label>
              <Input type="" placeholder="1000 in INR" {...register("cost")} />
              <p className="text-red-500">{errors.cost?.message}</p>
            </div>
            <div className="flex items-center gap-3 md:flex-row flex-col w-full">
              <div>
                <Label>Purshcase Date</Label>
                <Input
                  type="datetime-local"
                  placeholder="Asse@!2"
                  {...register("date_of_purchase")}
                />
                <p className="text-red-500">
                  {errors.date_of_purchase?.message}
                </p>
              </div>
              <div className="flex-1">
                <Label>Total miles on</Label>
                <Input
                  type=""
                  placeholder="123"
                  {...register("total_miles_driven")}
                />
                <p className="text-red-500">
                  {errors.total_miles_driven?.message}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:flex-row flex- w-full">
              <div>
                <div className="flex gap-3">
                  <Label>Type</Label>
                  <select
                    value={type}
                    onChange={(event: any) => {
                      setT(event.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      Select an option
                    </option>
                    {types.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {type.length == 0 ? (
                  <p className="text-red-500">Required</p>
                ) : (
                  <p>{type}</p>
                )}
              </div>
              <div className="flex-1">
                <Label>Energy Consumption</Label>
                <Input
                  type=""
                  placeholder="3 khh"
                  {...register("energy_consumption_per_hour")}
                />
                <p className="text-red-500">
                  {errors.energy_consumption_per_hour?.message}
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="image"> Browse images </label>
              <Input
                type="file"
                id="image"
                accept=".png, .jpg, .jpeg"
                onChange={changeHandler}
              />
              <div className="flex flex-col items-center justify-center">
                <p className="img-preview-wrapper">Image preview</p>
                <div className="flex justify-center items-center">
                  <img
                    //@ts-ignore
                    src={fileDataURL}
                    width={300}
                    height={200}
                    className="object-cover"
                    alt="preview"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                variant={"default"}
                disabled={loading}
                className="w-1/2 font-semibold"
              >
                {loading ? "wait" : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VeichlePost;
