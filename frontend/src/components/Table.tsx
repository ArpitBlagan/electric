import {
  Table as TT,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
export default function Table({ data }: any) {
  const tableRef = useRef(null);
  const downloadPdf = () => {
    const input = tableRef.current;
    console.log(input);
    if (input) {
      toast("Downloading PDF");
      html2canvas(input, { scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "landscape", // Adjust orientation if needed
            unit: "pt", // Units: 'mm', 'cm', 'in', 'px'
            //@ts-ignore
            format: [input.offsetWidth, input.offsetHeight], // Use table dimensions
          });
          //@ts-ignore
          pdf.addImage(imgData, "PNG", 0, 0);
          pdf.save("table.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          toast.error("something went wrong!");
        });
    }
  };

  const downloadCsv = () => {
    const input = tableRef.current;
    console.log(input);
    if (input) {
      toast("Downloading CSV");
      //@ts-ignore
      const rows = input?.querySelectorAll("tr");
      const csvContent = Array.from(rows)
        .map((row: any) =>
          Array.from(row.children)
            .map((cell: any) => cell.textContent)
            .join(",")
        )
        .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "table.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Downloaded PDF");
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 flex-row items-center justify-end">
        <Button
          onClick={(e) => {
            e.preventDefault();
            downloadCsv();
          }}
        >
          Generate CSV
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            downloadPdf();
          }}
        >
          Generate PDF
        </Button>
      </div>
      <TT ref={tableRef}>
        <TableCaption>Report.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Model</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>License Plate</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Electricity Consumption</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Miles Driven</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ele: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{ele.model}</TableCell>
                <TableCell>{ele.cost} INR/Hour</TableCell>
                <TableCell>{ele.license_plate}</TableCell>
                <TableCell>{ele.type}</TableCell>
                <TableCell>{ele.energy_consumption_per_hour} KWH</TableCell>
                <TableCell>{ele.date_of_purchase}</TableCell>
                <TableCell className="text-right">
                  {ele.total_miles_driven} miles
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TT>
    </div>
  );
}
