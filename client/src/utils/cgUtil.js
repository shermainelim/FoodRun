export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function getNumberOfDays(start) {
const date1 = new Date(start);
const date2 = new Date();

// One day in milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// Calculating the time difference between two dates
const diffInTime = date2.getTime() - date1.getTime();

// Calculating the no. of days between two dates
const diffInDays = Math.round(diffInTime / oneDay);

return diffInDays;
}


export function getFormatedStringFromDays(numberOfDays) {
var years = Math.floor(numberOfDays / 365);
var months = Math.floor((numberOfDays % 365) / 30);
var days = Math.floor((numberOfDays % 365) % 30);

var yearsDisplay =
  years > 0 ? years + (years == 1 ? " Year, " : " Years, ") : "";
var monthsDisplay =
  months > 0 ? months + (months == 1 ? " Month, " : " Months, ") : "";
var daysDisplay = days > 0 ? days + (days == 1 ? " Day" : " Days") : "";
return yearsDisplay + monthsDisplay + daysDisplay;
}
