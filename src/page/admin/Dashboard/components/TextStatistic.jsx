import React, { useContext, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { LoginContext } from '../../../../context/LoginContext';

function ApexChart({ revenueByYear, categoriesArr }) {
    const { user } = useContext(LoginContext);
   
    let chartData = (user.role === "ADMIN") ?
        {
            type: "line",
            series: revenueByYear || []
        } :
        {
            type: "area",
            series: [
                {
                    name: revenueByYear.name,
                    data: revenueByYear.data,
                },
            ] || [],
        };

   
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: chartData.type,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            lineCap: "round",
            curve: "straight",
        },
        title: {
            text: 'Thống kê doanh thu',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: categoriesArr,
        }
    });

    const [series] = useState(chartData.series);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series || []} type={chartData.type} height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default ApexChart;
