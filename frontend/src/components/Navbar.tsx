import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import { context } from "@/Contexxt";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = ({ title, setS }: any) => {
  const value = useContext(context);
  return (
    <div className="flex items-center">
      <div className="flex gap-2 items-center">
        <h1
          className=" md:hidden"
          onClick={() => {
            setS(true);
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </h1>
        <h1 className="text-xl font-smeibold">{title}</h1>
      </div>
      <div className="flex-1 flex gap-3 justify-end items-center">
        <h1>
          <a href="">Docs</a>
        </h1>
        <Link to="/vechile/add">Add</Link>
        <div className="flex ">
          {value?.data.isloggedIn ? (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                  Profile
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>{value.data.name}</MenubarItem>
                  <MenubarItem>
                    <MenubarShortcut>{value.data.email}</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Button
                      variant={"destructive"}
                      onClick={async (e) => {
                        toast("logging out the user");
                        e.preventDefault();
                        try {
                          const res = await axios.get(
                            "http://localhost:5173/api/ele/logout",
                            { withCredentials: true }
                          );
                          console.log("logged out", res.data);
                          toast.success("logged out successfully!");
                        } catch (err) {
                          toast.error("something went wrong!");
                        }
                      }}
                    >
                      Logout
                    </Button>
                  </MenubarItem>
                  <MenubarItem>
                    <MenubarShortcut>Made with ❤️</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Button className="flex gap-2" variant={"ghost"}>
              <Link to="/login">Login</Link>/
              <Link to="/register">Register</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
