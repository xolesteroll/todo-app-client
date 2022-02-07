const formatDateForInputValue = (date) => {
    const dateArr = date.split("/").map(s => {
        if(s.length === 1) {
            return `0${s}`
        }
        return s
    })
    return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
}

export default formatDateForInputValue
