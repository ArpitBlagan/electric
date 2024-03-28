import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-hot-toast";
import DatePicker from "@/components/DatePicker";
import Table from "@/components/Table";
import { useState, useEffect } from "react";
const report = ["Total Miles Driven", "Cost Analysis", "Energy Consumption"];
const frequency = ["Daily", "Weekly", "Monthly", "Time Frame"];
const Report = () => {
  const [loading, setL] = useState(false);
  const [data, setD] = useState<any[] | null>(null);
  const [from, setFrom] = useState<Date>(new Date("2000-03-23"));
  const [to, setTo] = useState<Date>(new Date());
  const [change, setC] = useState(false);
  const [seleR, setSr] = useState("");
  const [seleF, setFr] = useState("");
  useEffect(() => {
    const getData = async () => {
      setL(true);
      try {
        const res = await axios.get(
          `https://electric-tay5.onrender.com/api/ele/vechile?from=${from.toLocaleString()}&to=${to.toLocaleString()}`,
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
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <Select
          value={seleR}
          onValueChange={(e: any) => {
            setSr(e.target.value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Report" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Report</SelectLabel>
              {report.map((ele, index) => {
                return (
                  <SelectItem key={index} value={ele}>
                    {ele}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={seleF}
          onValueChange={(e: any) => {
            setFr(e.target.value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frequency</SelectLabel>
              {frequency.map((ele, index) => {
                return (
                  <SelectItem key={index} value={ele}>
                    {ele}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex-1 flex items-center justify-end gap-2">
          <DatePicker title="From" date={from} setDate={setFrom} />
          <DatePicker title="To" date={to} setDate={setTo} />
          <Button
            variant={"destructive"}
            onClick={(e) => {
              e.preventDefault();
              setC(!change);
            }}
          >
            Generate Report
          </Button>
        </div>
      </div>
      <div>{loading && <h1 className="text-center">Fetching Data</h1>}</div>
      <div className="my-2">{data && <Table data={data} />}</div>
    </div>
  );
};
export default Report;
