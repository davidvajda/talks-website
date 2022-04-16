export const getTime = (epoch) => {
    const date = new Date(epoch);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
        hours = "0" + hours.toString();
    } else { hours = hours.toString() }

    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    } else { minutes = minutes.toString() }

    return `${hours}:${minutes}`
}