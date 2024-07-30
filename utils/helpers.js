module.exports = {
  format_date: (date) => {
    if (!date) {
      return ''; // Return an empty string if date is undefined or null
    }
    if (typeof date === 'number') {
      return date.toString(); // If it's just a year, return it as a string
    }
    if (date instanceof Date) {
      return date.toLocaleDateString(); // If it's a date object, format it
    }
    return ''; // Return an empty string if date is not a valid date object
  }
};