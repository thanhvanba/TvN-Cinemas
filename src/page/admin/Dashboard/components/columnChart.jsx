import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
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
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Thêm tiêu đề và thông tin bổ sung bắt đầu từ cột D
    const authorRow = worksheet.addRow(['Hệ thống chuỗi rạp phim TvN Cinema']);
    const dateRow = worksheet.addRow(['Ngày xuất: ' + new Date().toLocaleDateString()]);
    worksheet.addRow([]); // Dòng trống
    const titleRow = worksheet.addRow(['', '', '', 'BÁO CÁO THỐNG KÊ TOP NGƯỜI DÙNG DOANH SỐ CAO NHẤT']);
    worksheet.addRow([]); // Dòng trống
    const headerRow = worksheet.addRow(['', '', '', 'STT', 'Tên người dùng', 'Tổng doanh số', 'Tổng số vé']);

    // Định dạng các hàng tiêu đề
    [authorRow, dateRow].forEach(row => {
      if (row.actualCellCount > 0) { // Chỉ merge khi có dữ liệu trong hàng
        worksheet.mergeCells(`A${row.number}:C${row.number}`);
        row.font = { bold: true };
      }
    });
    [titleRow].forEach(row => {
      if (row.actualCellCount > 0) { // Chỉ merge khi có dữ liệu trong hàng
        worksheet.mergeCells(`D${row.number}:G${row.number}`);
        row.getCell(4).alignment = { horizontal: 'center' };
        row.getCell(4).font = { bold: true, size: 16 };
      }
    });

    // Định dạng tiêu đề và các ô dữ liệu
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };
    headerRow.eachCell((cell, colNumber) => {
      if (colNumber >= 4) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFF00' }  // Màu nền vàng
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      }
    });

    // Thêm dữ liệu biểu đồ
    categoriesArr.forEach((value, index) => {
      const rowNumber = index + 1;
      const rowData = [
        rowNumber,
        value,
        series[0].data[index],
        series[1].data[index],
      ];
      const row = worksheet.addRow(['', '', '',...rowData]);

      // Thêm viền khung cho các ô dữ liệu
      row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
        if (colNumber >= 4) { // Chỉ áp dụng định dạng cho các cột từ D trở đi
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          cell.alignment = { horizontal: 'center' };
        }
      });
    });

    // Định dạng chiều rộng cho từng cột
    worksheet.columns = [
      { width: 12 },  // Cột A (trống)
      { width: 10 },   // Cột B (trống)
      { width: 10 },   // Cột C (trống)
      { width: 8 },  // Cột D (STT)
      { width: 45 },   // Cột E (Tên phim)
      { width: 20 },   // Cột F (Số sao đánh giá)
      { width: 20 },   // Cột F (Số sao đánh giá)
    ];

    // Xuất file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'top_user_chart.xlsx');
  };
  return (
    <div>
      <div className='text-end'>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ColumnChart;
