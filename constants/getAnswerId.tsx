const startDate: Date = new Date("2023-12-11");

// Get the current date as a Date object
let currentDate: Date = new Date();

// Calculate the difference in milliseconds
const diffTime: number = Math.abs(currentDate.getTime() - startDate.getTime());

// Convert milliseconds to days
export const getAnswerId: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
