// ApexChartComponent.js

import React from 'react';
import ReactDOM from 'react-dom';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import ReactApexChart from 'react-apexcharts';


const TopCinemaChart = ({ seriesArr, categoriesArr }) => {
    const series = seriesArr
    console.log("🚀 ~ TopCinemaChart ~ series:", series)
    const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

    const options = {
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                }
            }
        },
        colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: categoriesArr,
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px'
                }
            }
        },
        yaxis: [
            {
                title: {
                    text: 'Số tiền',
                },
                opposite: false,
            }
        ],
    }

    const exportToExcel = async () => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet1');

            // Thêm tiêu đề và thông tin bổ sung bắt đầu từ cột D
            const authorRow = worksheet.addRow(['Hệ thống chuỗi rạp phim TvN Cinema']);
            const dateRow = worksheet.addRow(['Ngày xuất: ' + new Date().toLocaleDateString()]);
            worksheet.addRow([]); // Dòng trống
            const titleRow = worksheet.addRow(['', '', '', 'THỐNG KÊ TOP DOANH THU THEO RẠP']);
            worksheet.addRow([]); // Dòng trống
            const headerRow = worksheet.addRow(['', '', '', 'STT', 'Rạp', 'Doanh thu']);

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
            })

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

            // Add data from the pie chart series and labels
            series[0].data.forEach((data, index) => {
                const rowNumber = index + 1; // Số thứ tự bắt đầu từ 1
                const rowData = ['', '', '', rowNumber, categoriesArr[index], data];
                const row = worksheet.addRow(rowData);
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

            // Set column widths and cell alignment
            worksheet.columns = [
                { width: 12 },  // Cột A (trống)
                { width: 10 },   // Cột B (trống)
                { width: 10 },   // Cột C (trống)
                { width: 8 },  // Cột D (STT)
                { width: 30 },   // Cột E (Tên phim)
                { width: 18 },   // Cột F (Số sao đánh giá)
            ];

            // Export Excel file
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'top_cinema.xlsx');
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
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default TopCinemaChart;
