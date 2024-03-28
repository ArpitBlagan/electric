import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const arr = [
  "Tech used is MERN + TS + AWS S3 (imgae uploading) + Zod + Prisma (ORM) + JWT (for authentication) + shadcn/ui (components) + tailwind CSS",
  "User need to register/login after that they can see the vechiles reports and add vechile",
  "Report section is kind of filter and fetch data on generate Report and you can download CSV and PDF",
];
export function Coruseel() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {arr.map((ele, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className=" font-semibold">
                    {index + 1}. {ele}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
