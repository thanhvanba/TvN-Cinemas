import { getDaysInMonth } from "date-fns";

export const ListDayOfMonth = (year, month) => {
    // console.log("🚀 ~ ListDayOfMonth ~ month:", month)
    // console.log("🚀 ~ ListDayOfMonth ~ year:", year)
    // const result = getDaysInMonth(new Date(year, month))
    // console.log("🚀 ~ ListDayOfMonth ~ result:", result)
    const daysOfMonth = Array.from({ length: 31 }, (_, index) => index + 1);
    console.log("🚀 ~ ListDayOfMonth ~ daysOfMonth:", daysOfMonth)
    return daysOfMonth;
}