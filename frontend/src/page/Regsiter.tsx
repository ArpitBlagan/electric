import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import welcome from "@/welcome.png";
import { userSchema, Register } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
const Regsiter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(userSchema),
  });
  const navigate = useNavigate();
  const [loading, setL] = useState(false);
  const submit: SubmitHandler<Register> = async (data) => {
    console.log(data);
    toast("registering user wait a sec!");
    setL(true);
    try {
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await axios.post(
        "https://electric-tay5.onrender.com/api/ele/register",
        body,
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success("register successfully navigating to login form!");
      setL(false);
      navigate("/login");
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
          <div>
            <h1 className="text-center text-xl underline">
              <Link to="/">Home</Link>
            </h1>
          </div>
          <form
            className="w-3/5 md:w-1/2 flex flex-col gap-3"
            onSubmit={handleSubmit(submit)}
          >
            <div>
              <Label>Name</Label>
              <Input placeholder="Arpit" type="text" {...register("name")} />
              <p className="text-red-500">{errors.name?.message}</p>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="arpit@gmail.com"
                {...register("email")}
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Asse@!2"
                {...register("password")}
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                variant={"default"}
                disabled={false}
                className="w-1/2 font-semibold"
              >
                {loading ? "wait" : "Register"}
              </Button>
            </div>
          </form>
          <p className="text-gray-500">
            Already have an Account{" "}
            <Link to="/login" className="underline font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Regsiter;
