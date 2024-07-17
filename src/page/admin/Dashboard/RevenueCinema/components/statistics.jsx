import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import ReactApexChart from 'react-apexcharts';

const Statistics = ({ financeCinema }) => {
  const categoriesArr = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
  const series = [
    {
      name: "Thu",
      data: financeCinema?.revenue
    },
    {
      name: "Chi",
      data: financeCinema?.expense
    }
  ];
  console.log("🚀 ~ Statistics ~ series:", series)

  const options = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Thống kê thu chi của rạp',
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: categoriesArr,
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Temperature'
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };
  const exportToExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet1');

      // Thêm tiêu đề và thông tin bổ sung bắt đầu từ cột D
      const authorRow = worksheet.addRow(['Hệ thống chuỗi rạp phim TvN Cinema']);
      const dateRow = worksheet.addRow(['Ngày xuất: ' + new Date().toLocaleDateString()]);
      worksheet.addRow([]); // Dòng trống
      const titleRow = worksheet.addRow(['', '', '', 'BÁO CÁO THỐNG KẾ THU CHI CỦA RẠP']);
      worksheet.addRow([]); // Dòng trống
      const headerRow = worksheet.addRow(['', '', '', 'Tháng', 'Doanh thu', 'Chi phí']);

      // Định dạng các hàng tiêu đề
      [authorRow, dateRow].forEach(row => {
        if (row.actualCellCount > 0) { // Chỉ merge khi có dữ liệu trong hàng
          worksheet.mergeCells(`A${row.number}:C${row.number}`);
          row.font = { bold: true };
        }
      });
      [titleRow].forEach(row => {
        if (row.actualCellCount > 0) { // Chỉ merge khi có dữ liệu trong hàng
          worksheet.mergeCells(`D${row.number}:F${row.number}`);
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
      categoriesArr.forEach((month, index) => {
        const revenue = series[0].data[index];
        const expense = series[1].data[index];
        const row = worksheet.addRow(['', '', '', month, revenue, expense]);

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
        { width: 20 },  // Cột D (STT)
        { width: 20 },  // Cột D (STT)
        { width: 20 },  // Cột D (STT)
      ];  

      // Generate Excel file and download
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'thong_ke_thu_chi.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  return (
    <div>
      <div className='text-end mb-3'>
        <button className='btn btn-primary' onClick={exportToExcel}>Export to Excel</button>
      </div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default Statistics;
