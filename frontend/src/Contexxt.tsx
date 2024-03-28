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
  setC: Dispatch<SetStateAction<boolean>>;
  change: boolean;
  setD: Dispatch<
    SetStateAction<{ name: string; email: string; isloggedIn: boolean }>
  >;
}

export const context = createContext<null | val>(null);
const Contexxt: React.FC<any> = ({ children }) => {
  const [change, setC] = useState(false);
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
  }, [change]);
  return (
    <context.Provider value={{ data, setD, setC, change }}>
      {children}
    </context.Provider>
  );
};

export default Contexxt;
