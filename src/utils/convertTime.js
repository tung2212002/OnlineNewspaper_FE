const convertTime = (time) => {
    const timeDate = new Date(time);

    const day = timeDate.getUTCDate();
    const month = timeDate.getUTCMonth() + 1;
    const year = timeDate.getUTCFullYear();
    const hours = timeDate.getUTCHours();
    const minutes = timeDate.getUTCMinutes();

    const outputDateString = `${day}/${month}/${year} ${hours}:${minutes} GMT+7`;

    return outputDateString;
};

export default convertTime;
