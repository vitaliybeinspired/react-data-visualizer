const start_date = "12/27/2016"

/**
 * Converts **en-US mm/dd/yyyy** date to needed doc ID 
 * @param {*} date_str 
 */
module.exports.date_to_weekUS = (date_str) => {
    const start = new Date(start_date);
    const current = new Date(date_str);
    const diffTime = Math.abs(current - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) % 7; 
    current.setDate(current.getDate() - diffDays);
    var year = Intl.DateTimeFormat('en', {year: 'numeric'}).format(current);
    var month = Intl.DateTimeFormat('en', {month: '2-digit'}).format(current);
    var day = Intl.DateTimeFormat('en', {day: '2-digit'}).format(current);
    return `${day}/${month}/${year}`
}

/**
 * Converts **dd/mm/yyyy** date to needed doc ID 
 * @param {*} date_str 
 */
module.exports.date_to_week = (date_str) => {
    const start = new Date(start_date);
    const dateParts = date_str.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    const current = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    const diffTime = Math.abs(current - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) % 7; 
    current.setDate(current.getDate() - diffDays);
    var year = Intl.DateTimeFormat('en', {year: 'numeric'}).format(current);
    var month = Intl.DateTimeFormat('en', {month: '2-digit'}).format(current);
    var day = Intl.DateTimeFormat('en', {day: '2-digit'}).format(current);
    return `${day}/${month}/${year}`
}
