import { format, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import UserService from '../../service/UserService';

const CreateSeat = (rows, seatsPerRow, showtimeId, dateTime) => {
    const [listSeatBooked, setListSeatBooked] = useState([]);
    const { getSeatBookedApi } = UserService();

    const handleGetSeatBooked = async () => {
        const data = {
            showtimeId: showtimeId,
            timeShow: dateTime
                ? format(
                    parse(`${dateTime.date} ${dateTime.time}`, 'dd/MM/yyyy HH:mm:ss', new Date()),
                    "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
                )
                : null,
        };
        let resSeat = await getSeatBookedApi(data);
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
            for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                const seatLabel = String.fromCharCode(65 + row - 1) + seatNum;
                let type;
                const isSeatBooked = listSeatBooked.find(
                    item => parseInt(item.row) === row && parseInt(item.column) === seatNum
                );
                if (isSeatBooked) {
                    type = "booked";
                } else if (row === rows) {
                    type = "COUPLE";
                } else if (row < 4 || seatNum < 4 || seatNum > seatsPerRow - 3) {
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
