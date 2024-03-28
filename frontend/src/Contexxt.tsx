import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface con {
  name: string;
  email: string;
  isloggedIn: boolean;
}

interface val {
  data: con;
  setD: Dispatch<
    SetStateAction<{ name: string; email: string; isloggedIn: boolean }>
  >;
}

export const context = createContext<null | val>(null);
const Contexxt: React.FC<any> = ({ children }) => {
  const [data, setD] = useState({ name: "", email: "", isloggedIn: false });
  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get(
          "https://electric-tay5.onrender.com/api/ele/isloggedin",
          { withCredentials: true }
        );
        console.log("conetxt res", res.data);
        setD({ email: res.data.email, name: res.data.name, isloggedIn: true });
      } catch (err) {
        console.log("context error", err);
      }
    };
    check();
  }, []);
  return <context.Provider value={{ data, setD }}>{children}</context.Provider>;
};

export default Contexxt;
