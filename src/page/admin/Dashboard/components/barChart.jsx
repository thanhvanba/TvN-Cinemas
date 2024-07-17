import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const BarChart = ({ seriesData, categories }) => {
console.log("🚀 ~ BarChart ~ seriesData:", seriesData)

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

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Thêm tiêu đề và thông tin bổ sung bắt đầu từ cột D
        const authorRow = worksheet.addRow(['Hệ thống chuỗi rạp phim TvN Cinema']);
        const dateRow = worksheet.addRow(['Ngày xuất: ' + new Date().toLocaleDateString()]);
        worksheet.addRow([]); // Dòng trống
        const titleRow = worksheet.addRow(['', '', '', 'BÁO CÁO THỐNG KÊ TOP PHIM ĐÁNH GIÁ CAO NHẤT']);
        worksheet.addRow([]); // Dòng trống
        const headerRow = worksheet.addRow(['', '', '', 'STT', 'Tên phim', 'Số sao đánh giá']);

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
                row.getCell(4).font = { bold: true , size: 16};
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
        seriesData[0].data.forEach((value, index) => {
            const rowNumber = index + 1; // Số thứ tự bắt đầu từ 1
            const row = worksheet.addRow(['', '', '', rowNumber, categories[index], value]);

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
        ];

        // Xuất file Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'top_movie_chart.xlsx');
    };


    return (
        <div>
            <div className='text-end'>
                <button onClick={exportToExcel}>Export to Excel</button>
            </div>
            <div id="chart">
                <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default BarChart;
