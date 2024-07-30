module.exports = {
    format_date: (date) => {
      if (typeof date === 'number') {
        return date.toString(); // If it's just a year, return it as a string
      }
      return date.toLocaleDateString(); // If it's a date object, format it
    }
  };