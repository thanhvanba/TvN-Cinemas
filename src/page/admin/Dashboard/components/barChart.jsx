import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ seriesData, categories }) => {
    console.log("🚀 ~ BarChart ~ categories:", categories)
    console.log("🚀 ~ BarChart ~ seriesData:", seriesData)
    // const seriesData = [{
    //     name: 'Đánh giá(sao)',
    //     data: [5, 4.3, 3, 3.6, 4.0, 4.7]
    // }]
    // const categories = ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'Germany'];

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: categories,
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default BarChart;
