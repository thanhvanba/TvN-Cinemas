import { format, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import UserService from '../../service/UserService';

const CreateSeat = (rows, seatsPerRow, showtimeId, dateTime) => {
    console.log("🚀 ~ CreateSeat ~ seatsPerRow:", seatsPerRow)
    console.log("🚀 ~ CreateSeat ~ rows:", rows)
    const [listSeatBooked, setListSeatBooked] = useState([]);
    const { getSeatBookedApi } = UserService();

    const handleGetSeatBooked = async () => {
        const params = {
            showtimeId: showtimeId,
            scheduleId: dateTime.scheduleId
        };
        let resSeat = await getSeatBookedApi(params);
        if (resSeat && resSeat.data && resSeat.data.result) {
            setListSeatBooked(resSeat.data.result);
        }
    };

    useEffect(() => {
        handleGetSeatBooked();
    }, [dateTime]); // Theo dõi sự thay đổi của showtimeId và dateTime

    const generateSeatData = () => {
        const seatData = [];
        for (let row = 1; row <= rows; row++) {
            console.log("🚀 ~ generateSeatData ~ row:", row)
            for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                const seatLabel = String.fromCharCode(65 + row - 1) + seatNum;
                let type;
                const isSeatBooked = listSeatBooked.find(
                    item => parseInt(item.row) === row && parseInt(item.column) === seatNum
                );
                if (row == rows) {
                    console.log("🚀 ~ generateSeatData ~ rows:", rows)
                    console.log("🚀 ~ generateSeatData ~ row:", row)
                    type = "COUPLE";
                } else if (isSeatBooked) {
                    type = "booked";
                } else if (row < 4 || seatNum < 4 || seatNum > seatsPerRow - 3) {
                    console.log("🚀 ~ generateSeatData ~ row:", row)
                    type = "NORMAL";
                } else {
                    type = "VIP";
                }
                seatData.push({ id: seatLabel, label: seatLabel, type: type });
            }
        }
        return seatData;
    };

    return generateSeatData;
};

export default CreateSeat;
