import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

const TimeAgo = (bookingTime) => {
    // Tính thời gian đã trôi qua từ thời điểm đặt vé đến hiện tại
    return formatDistanceToNow(new Date(bookingTime), { addSuffix: true, locale: viLocale });
};

export default TimeAgo;
