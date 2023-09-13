function convertTime(inputDatetime) {
    const inputDate = new Date(inputDatetime);
    
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const year = inputDate.getFullYear();
    
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }


export default convertTime;
