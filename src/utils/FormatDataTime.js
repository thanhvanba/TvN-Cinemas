import React from 'react';
import { format, isValid, parseISO } from 'date-fns';

const FormatDataTime = (originalDateTimeString) => {
  if (!originalDateTimeString) {
    return { date: null, time: null };
  }

  // Chuyển đổi thành đối tượng Date
  const dateObject = parseISO(originalDateTimeString);

  // Kiểm tra nếu giá trị Date là hợp lệ
  if (!isValid(dateObject)) {
    return { date: null, time: null };
  }

  // Định dạng ngày và giờ
  const formattedDate = format(dateObject, 'dd/MM/yyyy');
  const formattedDay = format(dateObject, 'dd/MM')
  const formattedTime = format(dateObject, 'HH:mm');

  // Xác định ngày thứ mấy
  const dayOfWeek = dateObject.getDay();

  // Trả về đối tượng chứa giá trị ngày, giờ và ngày thứ mấy
  return { day: formattedDay, date: formattedDate, time: formattedTime, dayOfWeek };
};

export default FormatDataTime;
