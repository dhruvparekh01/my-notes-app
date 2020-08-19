export function dateHelper(strDate) {
    if (!strDate) {
      return null
    }

    const date = new Date(strDate)

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return day + ' ' + month + ' ' + year
}