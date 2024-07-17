import React, { useContext, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { LoginContext } from '../../../../context/LoginContext';

function ApexChart({ revenueByYear, categoriesArr }) {
    const { user } = useContext(LoginContext);

    let chartData = (user.role === "ADMIN") ?
        {
            type: "line",
            series: revenueByYear ? revenueByYear : []
        } :
        {
            type: "area",
            series: revenueByYear ? revenueByYear : []
        };

    console.log("🚀 ~ ApexChart ~ chartData:", chartData)
    const [options] = useState({
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
    console.log("🚀 ~ ApexChart ~ series:", series)

    const exportToExcel = async () => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Revenue Data');

            // Thêm tiêu đề và thông tin bổ sung bắt đầu từ cột D
            const authorRow = worksheet.addRow(['Hệ thống chuỗi rạp phim TvN Cinema']);
            const dateRow = worksheet.addRow(['Ngày xuất: ' + new Date().toLocaleDateString()]);
            worksheet.addRow([]); // Dòng trống
            const titleRow = worksheet.addRow(['', '', '', 'BẢNG THỐNG KÊ DOANH THU CỦA CÁC RẠP PHIM']);
            worksheet.addRow([]); // Dòng trống
            const headerRow = worksheet.addRow(['', '', '', '', ...categoriesArr]);

            // Định dạng các hàng tiêu đề
            [authorRow, dateRow].forEach(row => {
                if (row.actualCellCount > 0) { // Chỉ merge khi có dữ liệu trong hàng
                    worksheet.mergeCells(`A${row.number}:C${row.number}`);
                    row.font = { bold: true };
                }
            });
            [titleRow].forEach(row => {
                if (row.actualCellCount > 0) { // Chỉ merge khi có dữ liệu trong hàng
                    worksheet.mergeCells(`D${row.number}:P${row.number}`);
                    row.getCell(4).alignment = { horizontal: 'center' };
                    row.getCell(4).font = { bold: true, size: 16 };
                }
            })
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


            // Add data rows for each cinema location
            series.forEach((cinema, index) => {
                const rowData = [cinema.name, ...cinema.data];
                const row = worksheet.addRow(['', '', '', ...rowData]);

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
            // Set column widths and styles
            worksheet.columns.forEach((column, index) => {
                if (index === 0 || index === 1 || index === 2) {
                    column.width = 10;
                } if (index === 3) {
                    column.width = 30;
                } else {
                    column.width = 15; // Các cột còn lại có chiều rộng là 15
                }
                column.alignment = { vertical: 'middle', horizontal: 'center' }; // Canh giữa đối với cả chiều dọc và chiều ngang
            });


            // Generate buffer and save as Excel file
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'revenue_data.xlsx');
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
                <ReactApexChart options={options} series={series || []} type={chartData.type} height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default ApexChart;
