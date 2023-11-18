import React from 'react';
import { format } from 'date-fns';

const FormatDataTime = (originalDateTimeString) => {
  // Định dạng ngày giờ và trả về chuỗi
  return format(new Date(originalDateTimeString), 'MMMM dd, yyyy HH:mm:ss');
};

export default FormatDataTime;
