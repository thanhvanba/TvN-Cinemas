import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = ({ seriesArr, categoriesArr }) => {
  const series = seriesArr;

  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 0
    },
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2']
      }
    },
    xaxis: {
      labels: {
        rotate: -45
      },
      categories: categoriesArr,
      tickPlacement: 'on'
    },
    yaxis: [
      {
        title: {
          text: 'Số tiền',
        },
        opposite: false,
      },
      {
        title: {
          text: 'Số vé',
        },
        opposite: true,
      }
    ],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      },
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ColumnChart;
