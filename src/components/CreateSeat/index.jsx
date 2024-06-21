import { format, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';
import UserService from '../../service/UserService';

const CreateSeat = (rows, seatsPerRow, listSeatBooked) => {

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
            } else if (row == rows) {
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

export default CreateSeat;
