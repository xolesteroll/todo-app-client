const getDaysFormTimestamp = (timestamp) => {
    const daysRemainder = timestamp % (24 * 60 * 60 * 1000)
    const hoursRemainder = daysRemainder % (1000 * 60 * 60)

    const days = (timestamp - daysRemainder) / (24 * 60 * 60 * 1000)
    const hours = (daysRemainder - hoursRemainder) / (1000 * 60 * 60)

    return {
        days,
        hours
    }
}

export default getDaysFormTimestamp

