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
 * Converts **JS date object** to needed doc ID 
 * @param {*} date 
 */
 module.exports.date_to_weekJS = (date) => {
    const start = new Date(start_date);
    const current = new Date(date);
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

module.exports.date_to_stringUS = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return String(mm + '/' + dd + '/' + yyyy);
}

module.exports.date_to_string = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return String(dd + '/' + mm + '/' + yyyy);
}

/**
 * returns an array of doc ids for the needed range
 * @param {*} start date string in US format
 * @param {*} end date string in US format
 * @returns 
 */
module.exports.date_rangeUS = (start, end) => {
    let start_split = String(this.date_to_weekUS(start)).split('/');
    let end_split = String(this.date_to_weekUS(end)).split('/');
    var start_range = new Date(start_split[2], parseInt(start_split[1]) - 1, start_split[0]);
    var end_range = new Date(end_split[2], parseInt(end_split[1]) - 1, end_split[0]);
    let emergency_break = 1;
    var list = []
    while (start_range <= end_range && emergency_break < 1000) {
        list.push(this.date_to_weekUS(start_range))
        start_range.setDate(start_range.getDate() + 7);
        emergency_break += 1;
    }
    return list;
}

/**
 * Simple helper to turn our 'hh-dd/mm/yyyy' formated date strings
 * into date objects
 * 
 * @param {*} string 
 * @returns 
 */
 module.exports.str_to_date = (string) => {
    let split = string.split('-');
    var hh = parseInt(split[0]);
    var date_str = split[1];
    var date_split = date_str.split('/');
    var dd = parseInt(date_split[0]);
    var mm = parseInt(date_split[1] - 1);
    var yyyy = parseInt(date_split[2]);
    return new Date(yyyy, mm, dd, hh)
}