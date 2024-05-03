import React from 'react'

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



export default function RevenueStatistics({chartConfig}) {
    console.log("🚀 ~ file: Statistical.jsx:19 ~ Statistical ~ chartConfig:", chartConfig)
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
                        Thống kê doanh thu rạp
                    </Typography>
                    {/* <Typography
                        variant="small"
                        color="gray"
                        className="max-w-sm font-normal"
                    >
                        Visualize your data in a simple way using the
                        @material-tailwind/react chart plugin.
                    </Typography> */}
                </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
                <Chart
                    {...chartConfig}
                />
            </CardBody>
        </Card>
    );
}