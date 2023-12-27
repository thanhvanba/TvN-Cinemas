import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
  import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
   
  export default function PieChart({configPieChart}) {
    console.log("🚀 ~ file: PieChart.jsx:11 ~ PieChart ~ configPieChart:", configPieChart)
    return (
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography className='text-3xl' variant="h6" color="blue-gray">
              Thống kế vé bán 
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mt-4 grid place-items-center px-2">
          <Chart {...configPieChart} />
        </CardBody>
      </Card>
    );
  }